import { Status } from '../../../types';

export interface IDeploymentFindResponse {
    age: string;
    deploymentName: string;
    status: Status;
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
