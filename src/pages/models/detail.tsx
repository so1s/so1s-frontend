/* eslint-disable react/jsx-key */
import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getModelMetadataById } from '../../api/models';
import { modelsAtom } from '../../atoms/models';
import ListTable from '../../components/table';
import { useModelsData } from '../../hooks/useModelsData';
import { IModelMetadatum } from '../../interfaces/pages/models';
import { convertStatusToIcon } from '../../utils/pages/models';

const ModelDetail: React.FC = () => {
    const [models] = useAtom(modelsAtom);
    const [modelMetadata, setModelMetadata] = useState<IModelMetadatum[]>([]);

    useModelsData();

    const params = useParams();

    const { modelName } = params;

    const model = models.find((e) => e.name === modelName);

    useEffect(() => {
        (async () => {
            if (!model) {
                return;
            }

            const responseData = await getModelMetadataById(model.id);
            setModelMetadata(
                responseData.map(
                    (datum) =>
                        ({
                            ...datum,
                            status: convertStatusToIcon(datum.status),
                            age: new Date(datum.age).toLocaleString(),
                        } as IModelMetadatum)
                )
            );
        })();
    }, [model]);

    return (
        <div>
            <ListTable
                title={`${modelName} Metadata`}
                entity="Metadata"
                items={modelMetadata}
                itemKey="version"
                hasDetail
                editable
                deletable
            />
        </div>
    );
};

export default ModelDetail;
