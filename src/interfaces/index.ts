export interface IBaseResponse {
    success: boolean;
    message: string;
}

export interface ICreateUpdateBaseParams {
    type: 'create' | 'update';
}

export interface IYamlFindResponse {
    yaml: string;
}
