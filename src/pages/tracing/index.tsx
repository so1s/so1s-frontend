import { useEffect } from 'react';

export const Tracing = () => {
    useEffect(() => {
        window.location.replace('kiali/');
    }, []);

    return <></>;
};
