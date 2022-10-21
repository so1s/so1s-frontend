import { baseURL } from '../../constants';
import { axiosInstanceRef } from '../../hooks/useAuth';
import {
    IResourceCreateRequest,
    IResourceCreateResponse,
    IResourceDeleteResponse,
    IResourceFind,
} from '../../interfaces/pages/resources';

export const getResources = async () => {
    const { current: axiosInstance } = axiosInstanceRef;
    const response = await axiosInstance.get(`${baseURL}/api/v1/resources`);

    return response.data as IResourceFind[];
};

export const deleteResource = async (id: number) => {
    const { current: axiosInstance } = axiosInstanceRef;
    const response = await axiosInstance.delete(
        `${baseURL}/api/v1/resources/${id}`
    );

    return response.data as IResourceDeleteResponse;
};

export const createResource = async (payload: IResourceCreateRequest) => {
    const { current: axiosInstance } = axiosInstanceRef;
    const response = await axiosInstance.post(
        `${baseURL}/api/v1/resources`,
        payload
    );

    return response.data as IResourceCreateResponse;
};
