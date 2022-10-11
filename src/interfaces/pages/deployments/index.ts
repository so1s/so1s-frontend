import { IBaseResponse } from '../..';
import { Status } from '../../../types';
import { Standard } from '../../../types/pages';

export interface IDeploymentBase {
    age: string;
    deploymentName: string;
    endPoint: string;
    strategy: string;

    modelName: string;
    modelVersion: string;
}

export interface IDeploymentDetail extends IDeploymentBase {
    id: number;
    cpu: string;
    memory: string;
    gpu: string;
    cpuLimit: string;
    memoryLimit: string;
    gpuLimit: string;
}

export type IDeploymentFindResponse = IDeploymentDetail & {
    status: Status;
};

export type IDeploymentDatum = IDeploymentDetail & {
    status: JSX.Element;
};

export interface IDeploymentCreateRequest {
    name: string;
    modelMetadataId: number;
    strategy: string;
    resources: {
        cpu: string;
        memory: string;
        gpu: string;
        cpuLimit: string;
        memoryLimit: string;
        gpuLimit: string;
    };
    scale: IScalingBase;
}

export interface IScalingBase {
    standard: Standard;
    standardValue: number;
    minReplicas?: number;
    maxReplicas?: number;
}

export interface IDeploymentCreateResponse {
    success: boolean;
    id: number;
    name: string;
}

export interface IDeploymentDeleteResponse extends IBaseResponse {}
