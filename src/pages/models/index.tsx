import { useAtom } from 'jotai';
import { useEffect } from 'react';
import getModels from '../../api/models';
import { modelsAtom } from '../../atoms/models';
import ListTable from '../../components/table';
import { IModelDatum } from '../../interfaces/pages/models';
import { convertStatusToIcon } from '../../utils/pages/models';

const Models: React.FC = () => {
    const [models, setModels] = useAtom(modelsAtom);

    useEffect(() => {
        (async () => {
            const data = await getModels();
            setModels(
                data.map(
                    (datum) =>
                        ({
                            ...datum,
                            age: new Date(datum.age).toLocaleString(),
                            status: convertStatusToIcon(datum.status),
                        } as IModelDatum)
                )
            );
        })();
    }, []);

    return (
        <div>
            <ListTable
                title="Models"
                items={models}
                hasDetail
                editable
                downloadable
                deletable
            />
        </div>
    );
};

export default Models;
