/* eslint-disable react/jsx-key */
import { useAtom } from 'jotai';
import { useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { deleteModelMetadata } from '../../api/model-metadata';
import { modelMetadataAtom } from '../../atoms/model-metadata';
import { modelsAtom } from '../../atoms/models';
import ListTable from '../../components/table';
import { useDelete } from '../../hooks/useDelete';
import { useModelMetadata } from '../../hooks/useModelMetadata';
import { useModelsData } from '../../hooks/useModelsData';
import { IModelMetadataBase } from '../../interfaces/pages/models';
import { filterColumns } from '../../utils';

const ModelDetail: React.FC = () => {
    const [models] = useAtom(modelsAtom);
    const [modelMetadata] = useAtom(modelMetadataAtom);

    useModelsData();

    const modelMetadataView: IModelMetadataBase[] = useMemo(
        () =>
            modelMetadata.map((obj) =>
                filterColumns(obj, ['age', 'status', 'url', 'version'])
            ),
        [modelMetadata]
    );

    const refreshData = useModelMetadata();

    const performDelete = useDelete(deleteModelMetadata);

    const params = useParams();

    const { modelName } = params;

    const model = models.find((e) => e.name === modelName);

    const deleteAction = async (id: number, version: string) => {
        if (!model) {
            return false;
        }

        const success = await performDelete(model.id, version);

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
                editable
                deletable
                deleteAction={deleteAction}
                deleteParams={['version']}
            />
        </div>
    );
};

export default ModelDetail;
