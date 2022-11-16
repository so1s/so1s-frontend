import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import currentPage from '../atoms/current-page';
import { WithHeaderProps } from '../types/hocs';

export const WithHeader: React.FC<WithHeaderProps> = ({ children, datum }) => {
    const location = useLocation();
    const [, setPage] = useAtom(currentPage);

    useEffect(() => {
        if (location.pathname === datum.uri) {
            setPage(datum);
        }
    }, [datum, location.pathname]);

    return <>{children}</>;
};
