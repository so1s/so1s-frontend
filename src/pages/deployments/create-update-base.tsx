import { TextField, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import { pipe } from 'fp-ts/lib/function';
import { useAtom } from 'jotai';
import { ReactNode, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createDeploymentOrPut } from '../../api/deployments';
import { deploymentStrategiesAtom } from '../../atoms/deployment-strategies';
import { deploymentsAtom } from '../../atoms/deployments';
import { modelMetadataAtom } from '../../atoms/model-metadata';
import { modelsAtom } from '../../atoms/models';
import { resourcesAtom } from '../../atoms/resources';

import { snackbarAtom } from '../../atoms/snackbar';
import ActionCard from '../../components/action-card';
import OverViewTab from '../../components/detail/overview-tab';
import { useDeploymentsData } from '../../hooks/useDeploymentsData';
import { useDeploymentStrategiesData } from '../../hooks/useDeploymentStrategiesData';
import { useModelMetadata } from '../../hooks/useModelMetadata';
import { useModelsData } from '../../hooks/useModelsData';
import { useResourcesData } from '../../hooks/useResourcesData';
import { ICreateUpdateBaseParams } from '../../interfaces';
import { IResourceFind } from '../../interfaces/pages/resources';

const CreateUpdateDeploymentBase: React.FC<ICreateUpdateBaseParams> = ({
    type,
}: ICreateUpdateBaseParams) => {
    useResourcesData();
    useModelsData();
    const modelMetadataRefresh = useModelMetadata();
    useDeploymentsData();
    useDeploymentStrategiesData();

    const [models] = useAtom(modelsAtom);
    const [modelMetadata] = useAtom(modelMetadataAtom);
    const [deployments] = useAtom(deploymentsAtom);
    const [deploymentStrategies] = useAtom(deploymentStrategiesAtom);

    const [resources] = useAtom(resourcesAtom);
    const [resource, setResource] = useState<IResourceFind | null>(
        resources[0] ?? null
    );

    const params = useParams();
    const { deploymentName } = params;
    const [, setSnackbarDatum] = useAtom(snackbarAtom);
    const navigate = useNavigate();

    const deploymentNameRef = useRef<HTMLInputElement>(null);
    const modelRef = useRef<HTMLInputElement>(null);
    const modelVersionRef = useRef<HTMLInputElement>(null);
    const deploymentStrategyRef = useRef<HTMLInputElement>(null);
    const resourceRef = useRef<HTMLInputElement>(null);

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

        if (!resource) {
            return;
        }

        const submitMode = type === 'create' ? 'post' : 'put';

        const data = await createDeploymentOrPut(
            {
                name: itemsWithValues['Deployment Name'] as string,
                modelMetadataId: itemsWithValues['Model Version'] as number,
                strategy: itemsWithValues['Deployment Strategy'] as string,
                resources: {
                    cpu: resource.cpu,
                    memory: resource.memory,
                    gpu: resource.gpu,
                    cpuLimit: resource.cpuLimit,
                    memoryLimit: resource.memoryLimit,
                    gpuLimit: resource.gpuLimit,
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
                <Select
                    label="Model"
                    defaultValue={
                        deployment
                            ? models.find(
                                  (model) => model.name === deployment.modelName
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
                <Select
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
                <Select
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
                <Select
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
            </div>
        </ActionCard>
    );
};

export default CreateUpdateDeploymentBase;
