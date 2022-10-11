import {
    TextField,
    Select,
    MenuItem,
    SelectChangeEvent,
    InputLabel,
    FormControl,
} from '@mui/material';
import { pipe } from 'fp-ts/lib/function';
import { useAtom } from 'jotai';
import { ReactNode, useEffect, useRef } from 'react';
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
            </div>
        </ActionCard>
    );
};

export default CreateUpdateDeploymentBase;
