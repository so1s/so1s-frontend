import { useAtom } from "jotai";
import { useEffect } from "react";
import { accessTokenWithPersistence } from "../atoms/token";
import useAuth from "../hooks/useAuth";

const Logout: React.FC = () => {
    const [accessToken, setAccessToken] = useAtom(accessTokenWithPersistence);
    useAuth();

    useEffect(() => {
        setAccessToken('');
        location.href = "/";
    }, []);

    return <></>
}

export default Logout;