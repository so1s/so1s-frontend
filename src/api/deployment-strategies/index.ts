import { baseURL } from '../../constants';
import { axiosInstanceRef } from '../../hooks/useAuth';
import { IDeploymentStrategyFindResponse } from '../../interfaces/pages/deployment-strategies';

export const getDeploymentStrategies = async () => {
    const { current: axiosInstance } = axiosInstanceRef;
    const response = await axiosInstance.get(
        `${baseURL}/api/v1/deployment-strategies`
    );

    return response.data as IDeploymentStrategyFindResponse[];
};
