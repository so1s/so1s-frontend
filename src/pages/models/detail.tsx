/* eslint-disable react/jsx-key */
import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { deleteModelMetadata } from '../../api/model-metadata';
import { modelMetadataAtom } from '../../atoms/model-metadata';
import { modelsAtom } from '../../atoms/models';
import ListTable from '../../components/table';
import { useDelete } from '../../hooks/useDelete';
import { useModelMetadata } from '../../hooks/useModelMetadata';
import { useModelsData } from '../../hooks/useModelsData';

const ModelDetail: React.FC = () => {
    const [models] = useAtom(modelsAtom);
    const [modelMetadata] = useAtom(modelMetadataAtom);

    useModelsData();

    const refreshData = useModelMetadata();

    const performDelete = useDelete(deleteModelMetadata);

    const deleteAction = async (id: number, version: string) => {
        const success = await performDelete(id);

        refreshData();

        return success;
    };

    const params = useParams();

    const { modelName } = params;

    const model = models.find((e) => e.name === modelName);

    useEffect(() => {
        if (!model) {
            return;
        }

        refreshData(model.id);
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
                deleteAction={deleteAction}
                deleteParams={['version']}
            />
        </div>
    );
};

export default ModelDetail;
