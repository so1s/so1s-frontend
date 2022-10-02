import { Status } from '../../../types';

export interface IModelFindResponse {
    id: number;
    age: string;
    name: string;
    status: Status;
    version: string;
    library: string;
}

export interface IModelDeleteResponse {
    success: boolean;
    message: string;
}

export interface IModelMetadataFindResponse {
    age: string;
    version: string;
    status: Status;
    url: string;
}

export interface IModelMetadatum {
    age: string;
    version: string;
    status: JSX.Element;
    url: string;
}

export interface IModelYAMLFindRequest {
    modelId: string | number;
    version: string | number;
}

export interface IModelYAMLFindResponse {
    yaml: string;
}

export interface ICreateModelRequest {
    modelFile: File;
    name: string;
    library: string;
    inputShape: string;
    inputDtype: string;
    outputShape: string;
    outputDtype: string;
}

export interface ICreateModelResponse {
    success: boolean;
    modelName: string;
    fileName: string;
    version: string;
    savedUrl: string;
}

export interface IModelDatum {
    id: number;
    age: string;
    name: string;
    status: JSX.Element;
    version: string;
    library: string;
}

export interface ICreateUpdateModelBaseParams {
    type: 'create' | 'update';
}
