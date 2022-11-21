import { IBaseResponse } from '../../..';
import { IDeploymentDatum } from '../../deployments';

export interface IABNTestElement {
    deploymentId: number;
    weight: number;
}

export interface IABNTestElementJoined {
    deployment: IDeploymentDatum;
    weight: number;
}

export interface IABNTestBaseResponse {
    name: string;
    domain: string;
}

export type IABNTestReadResponse = {
    id: number;
    elements: IABNTestElement[];
} & IABNTestBaseResponse;

export type IABNTestCreateRequest = {
    elements: IABNTestElement[];
} & IABNTestBaseResponse;

export type IABNTestDeleteResponse = IBaseResponse;
export type IABNTestCreateResponse = {
    data: IABNTestReadResponse;
} & IBaseResponse;

export type IABNTestView = {
    id: number;
} & IABNTestBaseResponse;

export type IABNTestJoined = {
    elements: IABNTestElementJoined[];
} & IABNTestView;
