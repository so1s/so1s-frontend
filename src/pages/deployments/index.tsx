import { useAtom } from 'jotai';
import { deleteDeployment } from '../../api/deployments';
import { deploymentsAtom } from '../../atoms/deployments';
import ListTable from '../../components/table';
import { useDelete } from '../../hooks/useDelete';
import { useDeploymentsData } from '../../hooks/useDeploymentsData';

export const Deployments = () => {
    const [deployments] = useAtom(deploymentsAtom);
    const refreshData = useDeploymentsData();

    const performDelete = useDelete(deleteDeployment);

    const deleteAction = async (id: number) => {
        const success = await performDelete(id);

        refreshData();

        return success;
    };

    return (
        <div>
            <ListTable
                title="Deployments"
                items={deployments}
                itemKey="deploymentName"
                hasDetail
                editable
                deletable
                deleteAction={deleteAction}
            />
        </div>
    );
};
