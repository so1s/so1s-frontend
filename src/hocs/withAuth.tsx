import useAuth from '../hooks/useAuth';

type Props = {
    children?: React.ReactNode;
};

export const WithAuth: React.FC<Props> = ({ children }) => {
    useAuth();

    return <>{children}</>;
};
