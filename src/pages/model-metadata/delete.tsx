import { AxiosError } from 'axios';
import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { deleteModelMetadata } from '../../api/model-metadata';
import { modelsAtom } from '../../atoms/models';
import { snackbarAtom } from '../../atoms/snackbar';
import { IModelMeatdataDeleteResponse } from '../../interfaces/pages/models';

export const DeleteModelMetadata = () => {
    const [models] = useAtom(modelsAtom);
    const [, setSnackbarDatum] = useAtom(snackbarAtom);

    const params = useParams();
    const navigate = useNavigate();

    const { modelName, version } = params;

    const model = models.find((e) => e.name === modelName);

    useEffect(() => {
        (async () => {
            if (!model || !version) {
                setSnackbarDatum({
                    severity: 'error',
                    message: 'Delete할 ModelMetadata가 주어지지 않았습니다.',
                });
                navigate('/models', { replace: true });
                return;
            }

            let success: boolean;
            let message: string;

            try {
                ({ success, message } = await deleteModelMetadata(
                    model.id,
                    version
                ));
            } catch (err) {
                ({ success, message } = (
                    err as AxiosError<IModelMeatdataDeleteResponse>
                ).response?.data ?? { success: false, message: '' });
            }

            const severity = success ? 'success' : 'error';
            setSnackbarDatum({
                severity,
                message,
            });

            navigate(`/models/${modelName}`, { replace: true });
        })();
    }, []);

    return <></>;
};
