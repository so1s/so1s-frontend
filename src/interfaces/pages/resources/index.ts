import { IBaseResponse } from '../..';

export interface IResourceBase {
    name: string;
    cpu: string;
    cpuLimit: string;
    memory: string;
    memoryLimit: string;
    gpu: string;
    gpuLimit: string;
}

export type IResourceCreateRequest = IResourceBase;

export type IResourceFind = {
    id: number;
} & IResourceBase;

export type IResourceCreateResponse = IBaseResponse;

export type IResourceDeleteResponse = IBaseResponse;
