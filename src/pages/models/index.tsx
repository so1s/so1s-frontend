import { useAtom } from 'jotai';
import { useMemo } from 'react';
import { deleteModel } from '../../api/models';
import { modelsAtom } from '../../atoms/models';
import ListTable from '../../components/table';
import { useDelete } from '../../hooks/useDelete';
import { useModelsData } from '../../hooks/data/useModelsData';
import { IModelView } from '../../interfaces/pages/models';
import { filterColumns } from '../../utils';

const Models: React.FC = () => {
    const [models] = useAtom(modelsAtom);
    useModelsData();

    const modelsView: IModelView[] = useMemo(
        () =>
            models.map((obj) =>
                filterColumns(obj, [
                    'age',
                    'name',
                    'status',
                    'version',
                    'library',
                ])
            ),
        [models]
    );

    const refreshData = useModelsData();

    const performDelete = useDelete(deleteModel);

    const deleteAction = async (id: number) => {
        const success = await performDelete(id);

        refreshData();

        return success;
    };

    return (
        <div>
            <ListTable
                title="Models"
                items={modelsView}
                itemKey="name"
                hasDetail
                editable
                deletable
                deleteAction={deleteAction}
            />
        </div>
    );
};

export default Models;
