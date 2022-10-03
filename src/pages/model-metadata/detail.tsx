import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getModelMetadataDetail } from '../../api/model-metadata';
import { getModelYaml } from '../../api/models';
import { modelsAtom } from '../../atoms/models';
import { snackbarAtom } from '../../atoms/snackbar';
import { DetailCard } from '../../components/detail/card';
import OverViewTab from '../../components/detail/overview-tab';
import YamlTab from '../../components/detail/yaml-tab';
import { useModelData } from '../../hooks/useModelData';
import { IModelMetadataDetail } from '../../interfaces/pages/model-metadata';
import { convertStatusToIcon } from '../../utils/pages/models';

export const ModelMetadataDetail = () => {
    const [models] = useAtom(modelsAtom);
    useModelData();

    const navigate = useNavigate();
    const [, setSnackbarDatum] = useAtom(snackbarAtom);

    const params = useParams();

    const { modelName, version } = params;
    const model = models.find((e) => e.name === modelName);

    const [yaml, setYaml] = useState('');
    const [modelMetadata, setModelMetadata] =
        useState<IModelMetadataDetail | null>(null);

    useEffect(() => {
        if (!modelName || !version) {
            setSnackbarDatum({
                severity: 'error',
                message: 'Version과 ModelName이 일치하는 Model이 없습니다.',
            });
            navigate('/models', { replace: true });
        }
    }, [modelName, version]);

    useEffect(() => {
        if (!model) {
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

            console.log(data);

            setModelMetadata({
                ...data,
                age: new Date(data.age).toLocaleString(),
                status: convertStatusToIcon(data.status),
            });
        })();
    }, [model]);

    return (
        <div>
            <DetailCard
                title="Model Metadata Details"
                tabs={['OverView', 'Logs', 'Yaml']}
                deleteHandler={() => {
                    navigate(`/models/${modelName}/delete/${version}`);
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
                <div>Not Implemented</div>
                <YamlTab value={yaml} />
            </DetailCard>
        </div>
    );
};
