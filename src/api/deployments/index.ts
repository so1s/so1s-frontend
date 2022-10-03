import { baseURL } from '../../constants';
import { axiosInstance } from '../../hooks/useAuth';
import { IDeploymentFindResponse } from '../../interfaces/pages/deployments';

export const getDeployments = async () => {
    const response = await axiosInstance.get(`${baseURL}/api/v1/deployments`);

    return response.data as IDeploymentFindResponse[];
};

export default getDeployments;
