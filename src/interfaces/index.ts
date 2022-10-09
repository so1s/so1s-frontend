export interface IBaseResponse {
    success: boolean;
    message: string;
}

export interface ICreateUpdateBaseParams {
    type: 'create' | 'update';
}
