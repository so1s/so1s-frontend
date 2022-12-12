import { useEffect } from 'react';

export const ApiDocs = () => {
    useEffect(() => {
        window.location.replace('swagger-ui/');
    }, []);

    return <></>;
};
