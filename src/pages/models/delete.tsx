import { AxiosError } from 'axios';
import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { deleteModel } from '../../api/models';
import { modelsAtom } from '../../atoms/models';
import { snackbarAtom } from '../../atoms/snackbar';
import { IModelDeleteResponse } from '../../interfaces/pages/models';

const DeleteModel: React.FC = () => {
    const [models] = useAtom(modelsAtom);
    const [, setSnackbarDatum] = useAtom(snackbarAtom);

    const params = useParams();
    const navigate = useNavigate();

    const { modelName } = params;

    const model = models.find((e) => e.name === modelName);

    useEffect(() => {
        (async () => {
            if (!model) {
                setSnackbarDatum({
                    severity: 'error',
                    message: 'Delete할 Model이 주어지지 않았습니다.',
                });
                navigate('/models', { replace: true });
                return;
            }

            let success: boolean;
            let message: string;

            try {
                ({ success, message } = await deleteModel(model.id));
            } catch (err) {
                ({ success, message } = (
                    err as AxiosError<IModelDeleteResponse>
                ).response?.data ?? { success: false, message: '' });
            }

            const severity = success ? 'success' : 'error';
            setSnackbarDatum({
                severity,
                message,
            });

            navigate('/models', { replace: true });
        })();
    }, []);

    return <></>;
};

export default DeleteModel;
