import { SnackBar } from '../components/snackbar';
import { HoCProps } from '../types/hocs';

export const WithSnackbar: React.FC<HoCProps> = ({ children }) => {
    return (
        <>
            {children}
            <SnackBar />
        </>
    );
};
