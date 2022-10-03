import { Alert, Snackbar } from '@mui/material';
import { useAtom } from 'jotai';
import { snackbarAtom } from '../atoms/snackbar';

export const SnackBar: React.FC = () => {
    const [snackbarDatum, setSnackbarDatum] = useAtom(snackbarAtom);

    const close = () => {
        setSnackbarDatum(null);
    };

    return (
        <Snackbar
            open={!!snackbarDatum?.message}
            autoHideDuration={6000}
            onClose={close}
        >
            <Alert
                onClose={close}
                severity={snackbarDatum?.severity}
                sx={{ width: '100%' }}
            >
                {snackbarDatum?.message}
            </Alert>
        </Snackbar>
    );
};
