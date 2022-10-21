import { baseURL } from '../../constants';
import { axiosInstanceRef } from '../../hooks/useAuth';
import { IYamlFindResponse } from '../../interfaces';
import {
    IDeploymentCreateRequest,
    IDeploymentCreateResponse,
    IDeploymentDeleteResponse,
    IDeploymentFindResponse,
} from '../../interfaces/pages/deployments';

export const getDeployments = async () => {
    const { current: axiosInstance } = axiosInstanceRef;
    const response = await axiosInstance.get(`${baseURL}/api/v1/deployments`);

    return response.data as IDeploymentFindResponse[];
};

export const getDeploymentYaml = async (id: number) => {
    const { current: axiosInstance } = axiosInstanceRef;
    const response = await axiosInstance.get(
        `${baseURL}/api/v1/deployments/${id}/yaml`
    );

    return response.data as IYamlFindResponse;
};

export const createDeploymentOrPut = async (
    payload: IDeploymentCreateRequest,
    mode: 'post' | 'put'
) => {
    const { current: axiosInstance } = axiosInstanceRef;
    const response = await axiosInstance[mode](
        `${baseURL}/api/v1/deployments`,
        payload
    );

    return response.data as IDeploymentCreateResponse;
};

export const deleteDeployment = async (id: number) => {
    const { current: axiosInstance } = axiosInstanceRef;
    const response = await axiosInstance.delete(
        `${baseURL}/api/v1/deployments/${id}`
    );

    return response.data as IDeploymentDeleteResponse;
};

export default getDeployments;
