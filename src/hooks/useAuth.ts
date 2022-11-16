import { useAtom } from 'jotai';
import axios from 'axios';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { accessTokenWithPersistence } from '../atoms/token';
import { baseURL } from '../constants';

const axiosInstance = axios.create({ baseURL });
export const axiosInstanceRef = new Proxy({ current: axiosInstance }, {});

const useAuth = () => {
    const [accessToken, setAccessToken] = useAtom(accessTokenWithPersistence);

    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (!accessToken && location.pathname !== '/login') {
            navigate('/login');
        }
    }, [accessToken]);

    useEffect(() => {
        axiosInstanceRef.current = axios.create({
            baseURL,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
            },
        });

        axiosInstanceRef.current.interceptors.response.use(
            (response) => response,
            (error) => {
                if (error.response.status === 401) {
                    setAccessToken('');
                }

                return Promise.reject(error);
            }
        );
    }, [accessToken, setAccessToken]);
};

export default useAuth;
