import { baseURL } from '../../constants';
import { axiosInstanceRef } from '../../hooks/useAuth';
import {
    IRegistryCreateRequest,
    IRegistryDeleteReponse,
    IRegistryFindResponse,
} from '../../interfaces/pages/registries';

export const getRegistries = async () => {
    const { current: axiosInstance } = axiosInstanceRef;
    const response = await axiosInstance.get(`${baseURL}/api/v2/registries`);

    return response.data as IRegistryFindResponse[];
};

export const deleteRegistry = async (id: number) => {
    const { current: axiosInstance } = axiosInstanceRef;
    const response = await axiosInstance.delete(
        `${baseURL}/api/v2/registries/${id}`
    );

    return response.data as IRegistryDeleteReponse;
};

export const createRegistry = async (payload: IRegistryCreateRequest) => {
    const { current: axiosInstance } = axiosInstanceRef;
    const response = await axiosInstance.post(
        `${baseURL}/api/v2/registries`,
        payload
    );

    return response.data as IRegistryFindResponse;
};
