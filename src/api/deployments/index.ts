import axios from 'axios';
import { baseURL } from '../../constants';
import { IDeploymentFindResponse } from '../../interfaces/deployments';

export const getDeployments = async () => {
    const response = await axios.get(`${baseURL}/api/v1/deployments`);

    return response.data as IDeploymentFindResponse[];
};

export default getDeployments;
