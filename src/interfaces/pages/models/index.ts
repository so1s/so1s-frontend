import { IBaseResponse } from '../..';
import { Status } from '../../../types';

export interface IModelBase {
    id: number;
    age: string;
    name: string;
    version: string;
    library: string;
}

export type IModelFindResponse = IModelBase & {
    status: Status;
};

export type IModelDatum = IModelBase & {
    status: JSX.Element;
};

export interface IModelDeleteResponse extends IBaseResponse {}

export interface IModelMetadataBase {
    id: number;
    age: string;
    version: string;
    url: string;
}

export type IModelMetadataFindResponse = IModelMetadataBase & {
    status: Status;
};

export type IModelMetadatum = IModelMetadataBase & {
    status: JSX.Element;
};

export interface IModelYamlFindRequest {
    modelId: string | number;
    version: string | number;
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
