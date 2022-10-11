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
} from '@mui/material';
import { pipe } from 'fp-ts/lib/function';
import { useAtom } from 'jotai';
import { ReactNode, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createDeploymentOrPut } from '../../api/deployments';
import { deploymentStrategiesAtom } from '../../atoms/deployment-strategies';
import { deploymentsAtom } from '../../atoms/deployments';
import { modelMetadataAtom } from '../../atoms/model-metadata';
import { modelsAtom } from '../../atoms/models';

import { snackbarAtom } from '../../atoms/snackbar';
import ActionCard from '../../components/action-card';
import { useDeploymentsData } from '../../hooks/useDeploymentsData';
import { useDeploymentStrategiesData } from '../../hooks/useDeploymentStrategiesData';
import { useModelMetadata } from '../../hooks/useModelMetadata';
import { useModelsData } from '../../hooks/useModelsData';
import { ICreateUpdateBaseParams } from '../../interfaces';

const CreateUpdateDeploymentBase: React.FC<ICreateUpdateBaseParams> = ({
    type,
}: ICreateUpdateBaseParams) => {
    useModelsData();
    const modelMetadataRefresh = useModelMetadata();
    useDeploymentsData();
    useDeploymentStrategiesData();

    const [models] = useAtom(modelsAtom);
    const [modelMetadata] = useAtom(modelMetadataAtom);
    const [deployments] = useAtom(deploymentsAtom);
    const [deploymentStrategies] = useAtom(deploymentStrategiesAtom);
    const params = useParams();
    const { deploymentName } = params;
    const [, setSnackbarDatum] = useAtom(snackbarAtom);
    const navigate = useNavigate();

    const deploymentNameRef = useRef<HTMLInputElement>(null);
    const modelRef = useRef<HTMLInputElement>(null);
    const modelVersionRef = useRef<HTMLInputElement>(null);
    const deploymentStrategyRef = useRef<HTMLInputElement>(null);
    const cpuRequestRef = useRef<HTMLInputElement>(null);
    const cpuLimitRef = useRef<HTMLInputElement>(null);
    const memoryRequestRef = useRef<HTMLInputElement>(null);
    const memoryLimitRef = useRef<HTMLInputElement>(null);
    const gpuRequestRef = useRef<HTMLInputElement>(null);
    const gpuLimitRef = useRef<HTMLInputElement>(null);
    const scalingRef = useRef<HTMLButtonElement>(null);
    const [replicaRange, setReplicaRange] = useState<number[]>([1, 4]);
    const [radioValue, setRadioValue] = useState('');

    const handleChangeModel = (
        event: SelectChangeEvent<number>,
        child?: ReactNode
    ) => {
        const modelId = event.target.value;
        modelMetadataRefresh(modelId);
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
            'CPU Request': cpuRequestRef,
            'CPU Limit': cpuLimitRef,
            'Memory Request': memoryRequestRef,
            'Memory Limit': memoryLimitRef,
            'GPU Request': gpuRequestRef,
            'GPU Limit': gpuLimitRef,
        };

        const itemsWithValues = pipe(
            items,
            Object.entries,
            (arr) => arr.map(([k, v]) => [k, v.current?.value]),
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

        const submitMode = type === 'create' ? 'post' : 'put';

        const data = await createDeploymentOrPut(
            {
                name: itemsWithValues['Deployment Name'] as string,
                modelMetadataId: itemsWithValues['Model Version'] as number,
                strategy: itemsWithValues['Deployment Strategy'] as string,
                resources: {
                    cpu: itemsWithValues['CPU Request'] as string,
                    memory: itemsWithValues['Memory Request'] as string,
                    gpu: itemsWithValues['GPU Request'] as string,
                    cpuLimit: itemsWithValues['CPU Limit'] as string,
                    memoryLimit: itemsWithValues['Memory Limit'] as string,
                    gpuLimit: itemsWithValues['GPU Limit'] as string,
                },
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
        setRadioValue((event.target as HTMLInputElement).value);
    };

    useEffect(() => {
        if (type === 'update' && deployment) {
            const modelId = models.find(
                (model) => model.name === deployment.modelName
            )?.id;
            if (modelId) {
                modelMetadataRefresh(modelId);
            }
        }
    }, [type, deployment]);

    if (type === 'update' && !deployment) {
        setSnackbarDatum({
            severity: 'error',
            message: '일치하는 Deployment 데이터가 없습니다.',
        });
        navigate('/deployments', { replace: true });

        return <></>;
    }

    console.dir(scalingRef);

    return (
        <ActionCard
            title={`${type === 'create' ? 'Create' : 'Update'} New Deployment`}
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
                <TextField
                    label="CPU Request"
                    type="text"
                    defaultValue={deployment ? deployment.cpu : '100m'}
                    inputRef={cpuRequestRef}
                />
                <TextField
                    label="CPU Limit"
                    type="text"
                    defaultValue={deployment ? deployment.cpuLimit : '100m'}
                    inputRef={cpuLimitRef}
                />
                <TextField
                    label="Memory Request"
                    type="text"
                    defaultValue={deployment ? deployment.memory : '256Mi'}
                    inputRef={memoryRequestRef}
                />
                <TextField
                    label="Memory Limit"
                    type="text"
                    defaultValue={deployment ? deployment.memoryLimit : '256Mi'}
                    inputRef={memoryLimitRef}
                />
                <TextField
                    label="GPU Request"
                    type="number"
                    defaultValue={deployment ? deployment.gpu : 0}
                    inputRef={gpuRequestRef}
                />
                <TextField
                    label="GPU Limit"
                    type="number"
                    defaultValue={deployment ? deployment.gpuLimit : 0}
                    inputRef={gpuLimitRef}
                />
                <FormControl>
                    <FormLabel id="scaling-radio-buttons">Scaling</FormLabel>
                    <RadioGroup
                        row
                        aria-labelledby="scaling-radio-buttons"
                        name="radio-buttons-group"
                        ref={scalingRef}
                        value={radioValue}
                        onChange={handleRadioChange}
                    >
                        <FormControlLabel
                            value="hpa"
                            control={<Radio />}
                            label="Use Dynamic Scaling"
                        />
                        <FormControlLabel
                            value="replicas"
                            control={<Radio />}
                            label="Use Static Scaling"
                        />
                    </RadioGroup>
                </FormControl>

                {radioValue === 'hpa' ? (
                    <FormControl fullWidth>
                        <InputLabel id="scaling-standard">
                            Scaling Standard
                        </InputLabel>
                        <Select
                            labelId="scaling-standard"
                            label="Scaling Standard"
                        >
                            <MenuItem value="latency">Latency(ms)</MenuItem>
                            <MenuItem value="gpu">GPU Utilization(%)</MenuItem>
                        </Select>
                    </FormControl>
                ) : (
                    ''
                )}

                {radioValue === 'hpa' ? (
                    <TextField
                        label="Standard Value"
                        type="number"
                        defaultValue={0}
                    />
                ) : (
                    ''
                )}
                {radioValue === 'hpa' ? (
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
                ) : (
                    ''
                )}

                {radioValue === 'replicas' ? (
                    <TextField
                        label="Replica Count"
                        type="number"
                        defaultValue={0}
                    />
                ) : (
                    ''
                )}
            </div>
        </ActionCard>
    );
};

export default CreateUpdateDeploymentBase;
