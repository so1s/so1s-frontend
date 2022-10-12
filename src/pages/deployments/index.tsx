import { useAtom } from 'jotai';
import { useMemo } from 'react';
import { deleteDeployment } from '../../api/deployments';
import { deploymentsAtom } from '../../atoms/deployments';
import ListTable from '../../components/table';
import { useDelete } from '../../hooks/useDelete';
import { useDeploymentsData } from '../../hooks/useDeploymentsData';
import { IDeploymentBase } from '../../interfaces/pages/deployments';
import { filterColumns } from '../../utils';

export const Deployments = () => {
    const [deployments] = useAtom(deploymentsAtom);

    const deploymentsView: IDeploymentBase[] = useMemo(
        () =>
            deployments.map((obj) =>
                filterColumns(obj, [
                    'age',
                    'deploymentName',
                    'endPoint',
                    'strategy',
                    'modelName',
                    'modelVersion',
                ])
            ),
        [deployments]
    );

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
                items={deploymentsView}
                itemKey="deploymentName"
                hasDetail
                editable
                deletable
                deleteAction={deleteAction}
            />
        </div>
    );
};
