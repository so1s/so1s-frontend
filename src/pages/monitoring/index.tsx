import { useEffect } from 'react';

export const Monitoring = () => {
    useEffect(() => {
        window.location.replace('/dashboard');
    }, []);

    return <></>;
};
