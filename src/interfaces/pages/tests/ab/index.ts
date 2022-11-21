import { IBaseResponse } from '../../..';
import { IDeploymentDatum } from '../../deployments';

export interface IABTestBaseResponse {
    name: string;
    domain: string;
}

export type IABTestReadResponse = {
    id: number;
    aid: number;
    bid: number;
} & IABTestBaseResponse;

export type IABTestCreateRequest = {
    a: number;
    b: number;
} & IABTestBaseResponse;

export type IABTestDeleteResponse = IBaseResponse;
export type IABTestCreateResponse = {
    data: IABTestReadResponse;
} & IBaseResponse;

export type IABTestView = {
    id: number;
    a: string;
    b: string;
} & IABTestBaseResponse;

export type IABTestJoined = {
    id: number;
    a?: IDeploymentDatum;
    b?: IDeploymentDatum;
} & IABTestBaseResponse;
