import useAuth from '../hooks/useAuth';
import { HoCProps } from '../types/hocs';

export const WithAuth: React.FC<HoCProps> = ({ children }) => {
    useAuth();

    return <>{children}</>;
};
