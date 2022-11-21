import { baseURL } from '../../../constants';
import { axiosInstanceRef } from '../../../hooks/useAuth';
import {
    IABNTestCreateRequest,
    IABNTestCreateResponse,
    IABNTestDeleteResponse,
    IABNTestReadResponse,
} from '../../../interfaces/pages/tests/abn';

export const getABNTests = async () => {
    const { current: axiosInstance } = axiosInstanceRef;
    const response = await axiosInstance.get(`${baseURL}/api/v2/tests/ab`);

    return response.data as IABNTestReadResponse[];
};

export const createOrUpdateABNTest = async (
    payload: IABNTestCreateRequest,
    mode: 'post' | 'put' = 'post'
) => {
    const { current: axiosInstance } = axiosInstanceRef;
    const response = await axiosInstance[mode](
        `${baseURL}/api/v2/tests/ab`,
        payload
    );

    return response.data as IABNTestCreateResponse;
};

export const deleteABNTest = async (id: number) => {
    const { current: axiosInstance } = axiosInstanceRef;
    const response = await axiosInstance.delete(
        `${baseURL}/api/v2/tests/ab/${id}`
    );

    return response.data as IABNTestDeleteResponse;
};

export default getABNTests;
