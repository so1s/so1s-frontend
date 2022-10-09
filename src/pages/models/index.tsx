import { useAtom } from 'jotai';
import { deleteModel } from '../../api/models';
import { modelsAtom } from '../../atoms/models';
import ListTable from '../../components/table';
import { useDelete } from '../../hooks/useDelete';
import { useModelsData } from '../../hooks/useModelsData';

const Models: React.FC = () => {
    const [models] = useAtom(modelsAtom);
    useModelsData();

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
                items={models}
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
