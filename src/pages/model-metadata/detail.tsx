import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
    deleteModelMetadata,
    getModelMetadataDetail,
} from '../../api/model-metadata';
import { getModelYaml } from '../../api/models';
import { snackbarAtom } from '../../atoms/snackbar';
import { DetailCard } from '../../components/detail/card';
import OverViewTab from '../../components/detail/overview-tab';
import YamlTab from '../../components/detail/yaml-tab';
import { useDelete } from '../../hooks/useDelete';
import { useModelsData } from '../../hooks/data/useModelsData';
import { IModelMetadataDetail } from '../../interfaces/pages/model-metadata';
import { convertStatusToIcon } from '../../utils/pages/models';
import { locale } from '../../constants';

export const ModelMetadataDetail = () => {
    const [models] = useModelsData();

    const navigate = useNavigate();
    const [, setSnackbarDatum] = useAtom(snackbarAtom);

    const params = useParams();

    const { modelName, version } = params;
    const model = models.find((e) => e.name === modelName);

    const performDelete = useDelete(deleteModelMetadata);

    const deleteAction = async (id: number, version: string) => {
        const success = await performDelete(id, version);

        navigate(`/models/${modelName}`, { replace: true });

        return success;
    };

    const [yaml, setYaml] = useState('');
    const [modelMetadata, setModelMetadata] =
        useState<IModelMetadataDetail | null>(null);

    useEffect(() => {
        if (!modelName || !version) {
            setSnackbarDatum({
                severity: 'error',
                message: 'Version과 ModelName이 주어지지 않았습니다.',
            });
            navigate('/models', { replace: true });
        }
    }, [modelName, version]);

    useEffect(() => {
        if (!models.length) {
            return;
        }
        if (!model) {
            setSnackbarDatum({
                severity: 'error',
                message: 'Version과 ModelName이 일치하는 Model이 없습니다.',
            });
            navigate('/models', { replace: true });
            return;
        }
        (async () => {
            const { yaml: yamlResponse } = await getModelYaml({
                modelId: model.id,
                version: version ?? '',
            });

            setYaml(yamlResponse);
        })();
    }, [model]);

    useEffect(() => {
        if (!model) {
            return;
        }
        (async () => {
            const data = await getModelMetadataDetail(model.id, version ?? '');

            setModelMetadata({
                ...data,
                age: new Date(data.age).toLocaleString(locale),
                status: convertStatusToIcon(data.status),
            });
        })();
    }, [model]);

    return (
        <div>
            <DetailCard
                title="Model Metadata Details"
                tabs={['OverView', 'Yaml']}
                deleteHandler={() => {
                    if (!model || !version) {
                        return;
                    }
                    deleteAction(model.id, version);
                }}
            >
                <OverViewTab
                    headEl={[
                        'Age',
                        'Name',
                        'Version',
                        'Status',
                        'File Url',
                        'Library',
                        'Input Shape',
                        'Input Dtype',
                        'Output Shape',
                        'Output Dtype',
                    ]}
                >
                    <div>{modelMetadata?.age}</div>
                    <div>{modelMetadata?.name}</div>
                    <div>{modelMetadata?.version}</div>
                    <div>{modelMetadata?.status}</div>
                    <div>{modelMetadata?.url}</div>
                    <div>{modelMetadata?.library}</div>
                    <div>{modelMetadata?.inputShape}</div>
                    <div>{modelMetadata?.inputDtype}</div>
                    <div>{modelMetadata?.outputShape}</div>
                    <div>{modelMetadata?.outputDtype}</div>
                </OverViewTab>
                <YamlTab value={yaml} />
            </DetailCard>
        </div>
    );
};
