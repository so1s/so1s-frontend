import { useAtom } from 'jotai';
import axios from 'axios';
import { useEffect } from 'react';
import { accessTokenWithPersistence } from '../atoms/token';
import { baseURL } from '../constants';

const axiosInstance = axios.create({ baseURL });
export const axiosInstanceRef = new Proxy({ current: axiosInstance }, {});

const useAuth = () => {
    const [accessToken] = useAtom(accessTokenWithPersistence);

    useEffect(() => {
        axiosInstanceRef.current = axios.create({
            baseURL,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
            },
        });
    }, [accessToken]);
};

export default useAuth;
