import { useEffect } from 'react';

const LoginRedirect: React.FC = () => {

    useEffect(() => {
        // eslint-disable-next-line no-restricted-globals
        location.href = '/login';
    }, []);

    return <></>;
};

export default LoginRedirect;
