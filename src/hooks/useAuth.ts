import { useAtom } from "jotai";
import { accessToken as accessTokenAtom, accessTokenWithPersistence } from "../atoms/token";
import axios from 'axios'
import { baseURL } from "../constants";
import { useEffect, useRef } from "react";


export const axiosInstance = axios.create({ baseURL });

const useAuth = () => {
    const [accessToken, setAccessToken] = useAtom(accessTokenWithPersistence);
    const axiosRef = useRef(axiosInstance);

    useEffect(() => {
        axiosInstance.interceptors.request.use(
            config => {
                config.headers = config.headers ?? {};
                config.headers['Authorization'] = `Bearer ${accessToken}`;
                return config;
            },
            error => {
                return Promise.reject(error);
            }
        );
    }, [accessToken]);

    return [axiosRef];
}

export default useAuth;