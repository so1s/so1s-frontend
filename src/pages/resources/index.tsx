import { deleteResource } from '../../api/resources';
import ListTable from '../../components/table';
import { useDelete } from '../../hooks/useDelete';
import { useResourcesData } from '../../hooks/data/useResourcesData';

export const Resources = () => {
    const [resources, refreshData] = useResourcesData();

    const performDelete = useDelete(deleteResource);

    const deleteAction = async (id: number) => {
        const success = await performDelete(id);

        refreshData();

        return success;
    };

    return (
        <div>
            <ListTable
                title="Resources"
                items={resources}
                itemKey="name"
                hasDetail
                creatable
                deletable
                deleteAction={deleteAction}
            />
        </div>
    );
};
