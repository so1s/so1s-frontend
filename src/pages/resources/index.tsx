import { useAtom } from 'jotai';
import { deleteResource } from '../../api/resources';
import { resourcesAtom } from '../../atoms/resources';
import ListTable from '../../components/table';
import { useDelete } from '../../hooks/useDelete';
import { useResourcesData } from '../../hooks/useResourcesData';

export const Resources = () => {
    const refreshData = useResourcesData();
    const [resources] = useAtom(resourcesAtom);

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
                deletable
                deleteAction={deleteAction}
            />
        </div>
    );
};
