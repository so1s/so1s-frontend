import { deleteRegistry } from '../../api/registries';
import ListTable from '../../components/table';
import { useRegistriesData } from '../../hooks/data/useRegistriesData';
import { useDelete } from '../../hooks/useDelete';

export const Registries = () => {
    const [registries, refreshData] = useRegistriesData();

    const performDelete = useDelete(deleteRegistry);

    const deleteAction = async (id: number) => {
        const success = await performDelete(id);

        refreshData();

        return success;
    };

    return (
        <div>
            <ListTable
                title="Registries"
                items={registries}
                itemKey="id"
                creatable
                deletable
                deleteAction={deleteAction}
            />
        </div>
    );
};
