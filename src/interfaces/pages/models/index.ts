import { IBaseResponse } from '../..';
import { Status } from '../../../types';

export interface IModelBase {
    age: string;
    name: string;
    version: string;
    library: string;
}

export type IModelView = IModelBase & {
    status: JSX.Element;
};

export interface IModelDetail extends IModelBase {
    id: number;
}

export type IModelFindResponse = IModelDetail & {
    status: Status;
};

export type IModelDatum = IModelDetail & {
    status: JSX.Element;
};

export interface IModelDeleteResponse extends IBaseResponse {}

export interface IModelMetadataBase {
    age: string;
    version: string;
    url: string;
}

export type IModelMetadataView = IModelMetadataBase & {
    status: JSX.Element;
};
export interface IModelMetadataDetail extends IModelMetadataBase {
    id: number;
}

export type IModelMetadataFindResponse = IModelMetadataDetail & {
    status: Status;
};

export type IModelMetadatum = IModelMetadataDetail & {
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
