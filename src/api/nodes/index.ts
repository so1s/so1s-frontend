import { baseURL } from '../../constants';
import { axiosInstanceRef } from '../../hooks/useAuth';
import { INodeResponse } from '../../interfaces/nodes';

export const getNodes = async () => {
    const { current: axiosInstance } = axiosInstanceRef;
    const response = await axiosInstance.get(`${baseURL}/api/v1/nodes`);

    return response.data as INodeResponse[];
};
