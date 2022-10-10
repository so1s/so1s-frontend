import { AxiosError } from 'axios';
import { useAtom } from 'jotai';
import { snackbarAtom } from '../atoms/snackbar';
import { IBaseResponse } from '../interfaces';

export const useDelete = <R extends IBaseResponse>(
    deleteApi: (id: number, ...args: any[]) => Promise<R>
) => {
    const [, setSnackbarDatum] = useAtom(snackbarAtom);

    const perform = async (id: number, ...args: any[]) => {
        let success: boolean;
        let message: string;

        try {
            ({ success, message } = await deleteApi(id, ...args));
        } catch (err) {
            ({ success, message } = (err as AxiosError<IBaseResponse>).response
                ?.data ?? { success: false, message: '' });
        }

        const severity = success ? 'success' : 'error';
        setSnackbarDatum({
            severity,
            message,
        });

        return success;
    };

    return perform;
};
