import axios from 'axios';
import { baseURL } from '../../constants';
import { IABTestReadResponse } from '../../interfaces/tests';

export const getABTests = async () => {
    const response = await axios.get(`${baseURL}/api/v1/tests/ab`);

    return response.data as IABTestReadResponse[];
};

export default getABTests;
