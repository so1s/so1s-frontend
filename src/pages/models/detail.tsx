/* eslint-disable react/jsx-key */
import { useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { deleteModelMetadata } from '../../api/model-metadata';
import ListTable from '../../components/table';
import { useDelete } from '../../hooks/useDelete';
import { useModelMetadata } from '../../hooks/data/useModelMetadata';
import { useModelsData } from '../../hooks/data/useModelsData';
import { IModelMetadataView } from '../../interfaces/pages/models';
import { filterColumns } from '../../utils';

const ModelDetail: React.FC = () => {
    const [models] = useModelsData();
    const [modelMetadata, refreshData] = useModelMetadata();

    const modelMetadataView: IModelMetadataView[] = useMemo(
        () =>
            modelMetadata.map((obj) =>
                filterColumns(obj, ['age', 'status', 'url', 'version'])
            ),
        [modelMetadata]
    );

    const performDelete = useDelete(deleteModelMetadata);

    const params = useParams();

    const { modelName } = params;

    const model = models.find((e) => e.name === modelName);

    const deleteAction = async (_: number, version: string) => {
        if (!model) {
            return false;
        }

        const selected = modelMetadata.find((e) => e.version === version);

        if (!selected) {
            return false;
        }

        const success = await performDelete(selected.id, selected.version);

        refreshData();

        return success;
    };

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
                items={modelMetadataView}
                itemKey="version"
                hasDetail
                creatable
                deletable
                deleteAction={deleteAction}
                deleteParams={['version']}
            />
        </div>
    );
};

export default ModelDetail;
