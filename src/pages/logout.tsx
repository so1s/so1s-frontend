import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { accessTokenWithPersistence } from '../atoms/token';

const Logout: React.FC = () => {
    const [accessToken, setAccessToken] = useAtom(accessTokenWithPersistence);

    useEffect(() => {
        setAccessToken('');
        // eslint-disable-next-line no-restricted-globals
        location.href = '/';
    }, []);

    return <></>;
};

export default Logout;
