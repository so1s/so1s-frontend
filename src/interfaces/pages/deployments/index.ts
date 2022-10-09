import { IBaseResponse } from '../..';
import { Status } from '../../../types';

export interface IDeploymentBase {
    id: number;
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

export type IDeploymentFindResponse = IDeploymentBase & {
    status: Status;
};

export type IDeploymentDatum = IDeploymentBase & {
    status: JSX.Element;
};

export interface IDeploymentDeleteResponse extends IBaseResponse {}
