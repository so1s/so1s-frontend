/* eslint-disable react/jsx-key */
import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getModelMetadataById } from '../../api/models';
import { modelsAtom } from '../../atoms/models';
import ListTable from '../../components/table';
import { IModelMetadataFindResponse } from '../../interfaces/pages/models';

const ModelDetail: React.FC = () => {
    const [models] = useAtom(modelsAtom);
    const [modelMetadata, setModelMetadata] = useState<
        IModelMetadataFindResponse[]
    >([]);

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
                            age: new Date(datum.age).toLocaleString(),
                        } as IModelMetadataFindResponse)
                )
            );
        })();
    }, []);

    return (
        <div>
            <ListTable
                title={`${modelName} Metadata`}
                items={modelMetadata}
                hasDetail
                editable
                downloadable
                deletable
            />
        </div>
    );
};

export default ModelDetail;
