import { baseURL } from '../../constants';
import { axiosInstance } from '../../hooks/useAuth';
import {
    IDeploymentDeleteResponse,
    IDeploymentFindResponse,
} from '../../interfaces/pages/deployments';

export const getDeployments = async () => {
    const response = await axiosInstance.get(`${baseURL}/api/v1/deployments`);

    return response.data as IDeploymentFindResponse[];
};

export const deleteDeployment = async (id: number) => {
    const response = await axiosInstance.delete(
        `${baseURL}/api/v1/deployments/${id}`
    );

    return response.data as IDeploymentDeleteResponse;
};

export default getDeployments;
