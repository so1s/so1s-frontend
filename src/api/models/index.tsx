import axios from 'axios';
import { baseURL } from '../../constants';
import { IModelFindResponse } from '../../interfaces/models';

export const getModels = async () => {
    const response = await axios.get(`${baseURL}/api/v1/models`);

    return response.data as IModelFindResponse[];
};

export default getModels;
