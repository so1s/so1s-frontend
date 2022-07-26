import { IBaseResponse } from '../..';

export type IRegistryBase = {
    name: string;
    baseUrl: string;
    username: string;
};

export type IRegistryFindResponse = {
    id: number;
} & IRegistryBase;

export type IRegistryDeleteReponse = IBaseResponse;

export type IRegistryCreateRequest = {
    name: string;
    password: string;
} & IRegistryBase;
