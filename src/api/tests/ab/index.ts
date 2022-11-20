import { baseURL } from '../../../constants';
import { axiosInstanceRef } from '../../../hooks/useAuth';
import {
    IABTestCreateRequest,
    IABTestCreateResponse,
    IABTestDeleteResponse,
    IABTestReadResponse,
} from '../../../interfaces/pages/tests/ab';

export const getABTests = async () => {
    const { current: axiosInstance } = axiosInstanceRef;
    const response = await axiosInstance.get(`${baseURL}/api/v1/tests/ab`);

    return response.data as IABTestReadResponse[];
};

export const createOrUpdateABTest = async (
    payload: IABTestCreateRequest,
    mode: 'post' | 'put' = 'post'
) => {
    const { current: axiosInstance } = axiosInstanceRef;
    const response = await axiosInstance[mode](
        `${baseURL}/api/v1/tests/ab`,
        payload
    );

    return response.data as IABTestCreateResponse;
};

export const deleteABTest = async (id: number) => {
    const { current: axiosInstance } = axiosInstanceRef;
    const response = await axiosInstance.delete(
        `${baseURL}/api/v1/tests/ab/${id}`
    );

    return response.data as IABTestDeleteResponse;
};

export default getABTests;
