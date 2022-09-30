import axios from 'axios';
import { baseURL } from '../../constants';
import { ISignInResponse } from '../../interfaces/pages/auth';

export const signIn = async (username: string, password: string) => {
    const response = await axios.post(`${baseURL}/api/v1/signin`, { username, password });

    return response.data as ISignInResponse;
};

export default signIn;
