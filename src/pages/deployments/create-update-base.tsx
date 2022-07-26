import {
    TextField,
    Select,
    MenuItem,
    SelectChangeEvent,
    InputLabel,
    FormControl,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio,
    Slider,
    LinearProgress,
} from '@mui/material';
import { pipe } from 'fp-ts/lib/function';
import { useAtom } from 'jotai';
import { ReactNode, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createDeploymentOrPut } from '../../api/deployments';

import { snackbarAtom } from '../../atoms/snackbar';
import ActionCard from '../../components/action-card';
import OverViewTab from '../../components/detail/overview-tab';
import { useDeploymentsData } from '../../hooks/data/useDeploymentsData';
import { useDeploymentStrategiesData } from '../../hooks/data/useDeploymentStrategiesData';
import { useModelMetadata } from '../../hooks/data/useModelMetadata';
import { useModelsData } from '../../hooks/data/useModelsData';
import { useResourcesData } from '../../hooks/data/useResourcesData';
import { ICreateUpdateBaseParams } from '../../interfaces';
import { IResourceFind } from '../../interfaces/pages/resources';
import { IScalingBase } from '../../interfaces/pages/deployments';
import { ScalingToggleMode, Standard } from '../../types/pages';

const CreateUpdateDeploymentBase: React.FC<ICreateUpdateBaseParams> = ({
    type,
}: ICreateUpdateBaseParams) => {
    const [resources] = useResourcesData();
    const [resource, setResource] = useState<IResourceFind | null>(null);
    const [models] = useModelsData();
    const [modelMetadata, modelMetadataRefresh] = useModelMetadata();
    const [deployments] = useDeploymentsData();
    const [deploymentStrategies] = useDeploymentStrategiesData();

    const params = useParams();
    const { deploymentName } = params;
    const [, setSnackbarDatum] = useAtom(snackbarAtom);
    const navigate = useNavigate();

    const deploymentNameRef = useRef<HTMLInputElement>(null);
    const modelRef = useRef<HTMLInputElement>(null);
    const modelVersionRef = useRef<HTMLInputElement>(null);
    const deploymentStrategyRef = useRef<HTMLInputElement>(null);
    const resourceRef = useRef<HTMLInputElement>(null);
    const standardRef = useRef<HTMLInputElement>(null);
    const standardValueRef = useRef<HTMLInputElement>(null);
    const [replicaRange, setReplicaRange] = useState<number[]>([1, 4]);
    const [radioValue, setRadioValue] = useState<ScalingToggleMode>('REPLICAS');
    const [isUploading, setIsUploading] = useState(false);

    const handleChangeModel = (
        event: SelectChangeEvent<number>,
        child?: ReactNode
    ) => {
        const modelId = event.target.value;
        modelMetadataRefresh(modelId);
    };

    const handleChangeResource = (
        event: SelectChangeEvent<string>,
        child?: ReactNode
    ) => {
        const resourceId = +event.target.value;
        setResource(resources.find((e) => e.id === resourceId) ?? null);
    };

    const setError = (message: string) => {
        setSnackbarDatum({
            severity: 'error',
            message,
        });
    };

    const submit = async () => {
        const items = {
            'Deployment Name': deploymentNameRef,
            'Model Name': modelRef,
            'Model Version': modelVersionRef,
            'Deployment Strategy': deploymentStrategyRef,
            Resource: resourceRef,
            'Scaling Standard': standardRef,
            'Scaling Standard Value': standardValueRef,
        };

        const itemsWithValues = pipe(
            items,
            Object.entries,
            (arr) => arr.map(([k, v]) => [k, v.current?.value || v]),
            Object.fromEntries
        ) as { [k in keyof typeof items]: string | number };

        const isCorrect = pipe(
            itemsWithValues,
            Object.entries,

            (arr) =>
                arr.every(([name, value]) => {
                    if (value !== 0 && !value) {
                        setError(`${name}이(가) 주어지지 않았습니다.`);
                        return false;
                    }
                    return true;
                })
        );

        if (!isCorrect) {
            return;
        }

        if (!resource) {
            return;
        }

        const submitMode = type === 'create' ? 'post' : 'put';

        const scaleData: IScalingBase = {
            standard:
                radioValue === 'REPLICAS'
                    ? 'REPLICAS'
                    : (itemsWithValues['Scaling Standard'] as Standard),
            standardValue: itemsWithValues['Scaling Standard Value'] as number,
            minReplicas: replicaRange[0],
            maxReplicas: replicaRange[1],
        };

        setIsUploading(true);

        const data = await createDeploymentOrPut(
            {
                name: itemsWithValues['Deployment Name'] as string,
                modelMetadataId: itemsWithValues['Model Version'] as number,
                strategy: itemsWithValues['Deployment Strategy'] as string,
                resourceId: resource.id,
                scale: scaleData,
            },
            submitMode
        );

        setSnackbarDatum({
            severity: 'success',
            message: JSON.stringify(data, null, 4),
        });

        navigate('/deployments');
    };

    const deployment = deployments.find(
        (deployment) => deployment.deploymentName === deploymentName
    );

    const handleSliderChange = (
        event: Event,
        newValue: number | number[],
        activeThumb: number
    ) => {
        if (!Array.isArray(newValue)) {
            return;
        }

        if (activeThumb === 0) {
            setReplicaRange([
                Math.min(newValue[0], replicaRange[1] - 1),
                replicaRange[1],
            ]);
        } else {
            setReplicaRange([
                replicaRange[0],
                Math.max(newValue[1], replicaRange[0] + 1),
            ]);
        }
    };
    const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRadioValue(
            (event.target as HTMLInputElement).value as ScalingToggleMode
        );
    };

    useEffect(() => {
        if (deployment) {
            const modelId = models.find(
                (model) => model.name === deployment.modelName
            )?.id;
            if (modelId !== undefined) {
                modelMetadataRefresh(modelId);
            }
        }
    }, [deployment]);

    if (
        type === 'update' &&
        deployments.length &&
        models.length &&
        !deployment
    ) {
        setSnackbarDatum({
            severity: 'error',
            message: '일치하는 Deployment 데이터가 없습니다.',
        });
        navigate('/deployments', { replace: true });

        return <></>;
    }

    return (
        <ActionCard
            title={`${type === 'create' ? 'Create New' : 'Update'} Deployment`}
            mode={type === 'create' ? 'CREATE' : 'UPDATE'}
            onClick={submit}
        >
            <div className="flex flex-col space-y-10 my-10 mx-auto">
                <TextField
                    label={`Deployment Name${
                        type === 'create' ? '' : ' (Disabled)'
                    }`}
                    defaultValue={deployment ? deployment?.deploymentName : ''}
                    type="text"
                    disabled={type === 'update'}
                    placeholder={
                        deployment ? deployment?.deploymentName : 'Titanic'
                    }
                    inputRef={deploymentNameRef}
                />
                <FormControl fullWidth>
                    <InputLabel id="model">Model</InputLabel>
                    <Select
                        labelId="model"
                        label="Model"
                        defaultValue={
                            deployment
                                ? models.find(
                                      (model) =>
                                          model.name === deployment.modelName
                                  )?.id ?? models[0]?.id
                                : models[0]?.id
                        }
                        inputRef={modelRef}
                        onChange={handleChangeModel}
                    >
                        {models.map((model) => (
                            <MenuItem key={model.id} value={model.id}>
                                {model.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl fullWidth>
                    <InputLabel id="model-version">Model Version</InputLabel>
                    <Select
                        labelId="model-version"
                        label="Model Version"
                        defaultValue={
                            deployment
                                ? modelMetadata.find(
                                      (metadata) =>
                                          metadata.version ===
                                          deployment.modelVersion
                                  )?.id ?? modelMetadata[0]?.id
                                : modelMetadata[0]?.id
                        }
                        inputRef={modelVersionRef}
                    >
                        {modelMetadata.map((datum) => (
                            <MenuItem key={datum.id} value={datum.id}>
                                {datum.version}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl fullWidth>
                    <InputLabel id="deployment-strategy">
                        Deployment Strategy
                    </InputLabel>
                    <Select
                        labelId="deployment-strategy"
                        label="Deployment Strategy"
                        defaultValue={
                            deployment
                                ? deploymentStrategies.find(
                                      (strategy) =>
                                          strategy.name === deployment.strategy
                                  )?.name ?? deploymentStrategies[0]?.name
                                : deploymentStrategies[0]?.name
                        }
                        inputRef={deploymentStrategyRef}
                    >
                        {deploymentStrategies.map((deploymentStrategy) => (
                            <MenuItem
                                key={deploymentStrategy.name}
                                value={deploymentStrategy.name}
                            >
                                {deploymentStrategy.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl fullWidth>
                    <InputLabel id="resource">Resource</InputLabel>
                    <Select
                        labelId="resource"
                        label="Resource"
                        defaultValue={resources[0]?.id.toString()}
                        inputRef={resourceRef}
                        onChange={handleChangeResource}
                    >
                        {resources.map((resource) => (
                            <MenuItem key={resource.id} value={resource.id}>
                                {resource.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <OverViewTab
                    headEl={[
                        'CPU Request',
                        'CPU Limit',
                        'Memory Request',
                        'Memory Limit',
                        'GPU Request',
                        'GPU Limit',
                    ]}
                >
                    <div>{resource?.cpu ?? 'Not given'}</div>
                    <div>{resource?.cpuLimit ?? 'Not given'}</div>
                    <div>{resource?.memory ?? 'Not given'}</div>
                    <div>{resource?.memoryLimit ?? 'Not given'}</div>
                    <div>{resource?.gpu ?? 'Not given'}</div>
                    <div>{resource?.gpuLimit ?? 'Not given'}</div>
                </OverViewTab>
                <FormControl>
                    <FormLabel id="scaling-radio-buttons">Scaling</FormLabel>
                    <RadioGroup
                        row
                        aria-labelledby="scaling-radio-buttons"
                        name="radio-buttons-group"
                        value={radioValue}
                        onChange={handleRadioChange}
                    >
                        <FormControlLabel
                            value="REPLICAS"
                            control={<Radio />}
                            label="Use Static Scaling"
                        />
                        <FormControlLabel
                            value="HPA"
                            control={<Radio />}
                            label="Use Dynamic Scaling"
                        />
                    </RadioGroup>
                </FormControl>

                {radioValue === 'HPA' && (
                    <FormControl fullWidth>
                        <InputLabel id="scaling-standard">
                            Scaling Standard
                        </InputLabel>
                        <Select
                            labelId="scaling-standard"
                            label="Scaling Standard"
                            inputRef={standardRef}
                        >
                            <MenuItem value="LATENCY">Latency(ms)</MenuItem>
                            <MenuItem value="GPU">GPU Utilization(%)</MenuItem>
                        </Select>
                    </FormControl>
                )}

                {radioValue === 'HPA' && (
                    <TextField
                        label="Standard Value"
                        type="number"
                        defaultValue={1}
                        inputRef={standardValueRef}
                        inputProps={{ min: 1 }}
                    />
                )}

                {radioValue === 'HPA' && (
                    <div>
                        <InputLabel id="scaling-standard">
                            Set Replica Range
                        </InputLabel>
                        Min: {replicaRange[0]} Max: {replicaRange[1]}
                        <Slider
                            value={replicaRange}
                            onChange={handleSliderChange}
                            disableSwap
                            valueLabelDisplay="auto"
                            min={1}
                            max={10}
                        />
                    </div>
                )}

                {radioValue === 'REPLICAS' && (
                    <TextField
                        label="Replica Count"
                        type="number"
                        defaultValue={1}
                        inputProps={{ min: 1 }}
                        inputRef={standardValueRef}
                    />
                )}
            </div>
            {isUploading && <LinearProgress color="primary" />}
        </ActionCard>
    );
};

export default CreateUpdateDeploymentBase;
