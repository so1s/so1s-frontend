import { useEffect } from 'react';

export const Logging = () => {
    useEffect(() => {
        window.location.replace('kibana/');
    }, []);

    return <></>;
};
