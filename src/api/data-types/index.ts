import { baseURL } from '../../constants';
import { axiosInstanceRef } from '../../hooks/useAuth';
import { IDataTypeResponse } from '../../interfaces/data-types';

export const getDataTypes = async () => {
    const { current: axiosInstance } = axiosInstanceRef;
    const response = await axiosInstance.get(`${baseURL}/api/v1/data-types`);

    return response.data as IDataTypeResponse[];
};
