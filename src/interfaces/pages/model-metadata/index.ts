import { IBaseResponse } from '../..';
import { Status } from '../../../types';

interface IModelMetadataDetailBase {
    age: string;
    name: string;
    version: string;
    url: string;
    library: string;
    inputShape: string;
    inputDtype: string;
    outputShape: string;
    outputDtype: string;
}

export interface IModelMetadataDetailResponse extends IModelMetadataDetailBase {
    status: Status;
}

export interface IModelMetadataDetail extends IModelMetadataDetailBase {
    status: JSX.Element;
}

export interface IModelMetadataDeleteResponse extends IBaseResponse {}
