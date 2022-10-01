import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { accessTokenWithPersistence } from '../atoms/token';

const Logout: React.FC = () => {
    const [accessToken, setAccessToken] = useAtom(accessTokenWithPersistence);
    const navigate = useNavigate();

    useEffect(() => {
        setAccessToken('');
        navigate('/', {
            replace: true,
        });
    }, []);

    return <></>;
};

export default Logout;
