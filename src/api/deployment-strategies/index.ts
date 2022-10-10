import { baseURL } from '../../constants';
import { axiosInstance } from '../../hooks/useAuth';
import { IDeploymentStrategyFindResponse } from '../../interfaces/pages/deployment-strategies';

export const getDeploymentStrategies = async () => {
    const response = await axiosInstance.get(
        `${baseURL}/api/v1/deployment-strategies`
    );

    return response.data as IDeploymentStrategyFindResponse[];
};
