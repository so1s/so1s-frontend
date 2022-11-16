import { baseURL } from '../../constants';
import { axiosInstanceRef } from '../../hooks/useAuth';
import { IYamlFindResponse } from '../../interfaces';
import {
    ICreateModelRequest,
    ICreateModelResponse,
    IModelDeleteResponse,
    IModelFindResponse,
    IModelMetadataFindResponse,
    IModelYamlFindRequest,
} from '../../interfaces/pages/models';

export const getModels = async () => {
    const { current: axiosInstance } = axiosInstanceRef;
    const response = await axiosInstance.get(`${baseURL}/api/v1/models`);

    return response.data as IModelFindResponse[];
};

export const getModelMetadataById = async (id?: number) => {
    if (id === undefined) {
        // eslint-disable-next-line no-promise-executor-return
        await new Promise((res) => setTimeout(res, 100));
        return [];
    }

    const { current: axiosInstance } = axiosInstanceRef;
    const response = await axiosInstance.get(`${baseURL}/api/v1/models/${id}`);

    return response.data as IModelMetadataFindResponse[];
};

export const getModelYaml = async ({
    modelId,
    version,
}: IModelYamlFindRequest) => {
    const { current: axiosInstance } = axiosInstanceRef;
    const response = await axiosInstance.get(
        `${baseURL}/api/v1/models/${modelId}/versions/${version}/yaml`
    );

    return response.data as IYamlFindResponse;
};

export const createModelOrAddModelMetadata = async (
    payload: ICreateModelRequest,
    mode: 'post' | 'put'
) => {
    const { current: axiosInstance } = axiosInstanceRef;
    const formData = new FormData();

    Object.entries(payload).forEach(([name, value]) => {
        formData.append(name, value);
    });

    const response = await axiosInstance[mode](
        `${baseURL}/api/v1/models`,
        formData
    );

    return response.data as ICreateModelResponse;
};

export const deleteModel = async (id: number) => {
    const { current: axiosInstance } = axiosInstanceRef;
    const response = await axiosInstance.delete(
        `${baseURL}/api/v1/models/${id}`
    );

    return response.data as IModelDeleteResponse;
};

export default getModels;
