import { baseURL } from '../../constants';
import { axiosInstance } from '../../hooks/useAuth';
import { ILibraryDatum } from '../../interfaces/atoms/library';

export const getLibraries = async () => {
    const response = await axiosInstance.get(`${baseURL}/api/v1/libraries`);

    return response.data as ILibraryDatum[];
};
