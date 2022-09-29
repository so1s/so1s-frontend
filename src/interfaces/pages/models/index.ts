import { Status } from '../../../types';

export interface IModelFindResponse {
    age: string;
    name: string;
    status: Status;
    version: string;
    library: string;
}

export interface IModelYAMLFindRequest {
    modelId: string | number;
    version: string | number;
}

export interface IModelYAMLFindResponse {
    yaml: string;
}