import { baseURL } from '../../constants';
import { axiosInstance } from '../../hooks/useAuth';
import { IABTestReadResponse } from '../../interfaces/pages/tests';

export const getABTests = async () => {
    const response = await axiosInstance.get(`${baseURL}/api/v1/tests/ab`);

    return response.data as IABTestReadResponse[];
};

export default getABTests;
