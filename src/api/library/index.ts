import { baseURL } from '../../constants';
import { axiosInstanceRef } from '../../hooks/useAuth';
import { ILibraryDatum } from '../../interfaces/atoms/library';

export const getLibraries = async () => {
    const { current: axiosInstance } = axiosInstanceRef;
    const response = await axiosInstance.get(`${baseURL}/api/v1/libraries`);

    return response.data as ILibraryDatum[];
};
