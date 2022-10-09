import { Status } from '../../../types';

export interface IDeploymentBase {
    age: string;
    deploymentName: string;
    endPoint: string;
    strategy: string;

    modelName: string;
    modelVersion: string;

    cpu: string;
    memory: string;
    gpu: string;
    cpuLimit: string;
    memoryLimit: string;
    gpuLimit: string;
}
export interface IDeploymentFindResponse extends IDeploymentBase {
    status: Status;
}

export interface IDeploymentDatum extends IDeploymentBase {
    status: JSX.Element;
}
