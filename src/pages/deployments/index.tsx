import { useMemo } from 'react';
import { deleteDeployment } from '../../api/deployments';
import ListTable from '../../components/table';
import { useDelete } from '../../hooks/useDelete';
import { useDeploymentsData } from '../../hooks/data/useDeploymentsData';
import { IDeploymentView } from '../../interfaces/pages/deployments';
import { filterColumns } from '../../utils';

export const Deployments = () => {
    const [deployments, refreshData] = useDeploymentsData();

    const deploymentsView: IDeploymentView[] = useMemo(
        () =>
            deployments.map((obj) =>
                filterColumns(obj, [
                    'age',
                    'deploymentName',
                    'status',
                    'endPoint',
                    'strategy',
                    'modelName',
                    'modelVersion',
                ])
            ),
        [deployments]
    );

    const performDelete = useDelete(deleteDeployment);

    const deleteAction = async (_: number, name: string) => {
        const deployment = deployments.find((e) => e.deploymentName === name);

        if (!deployment) {
            return false;
        }

        const success = await performDelete(deployment.id);

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
                creatable
                editable
                deletable
                deleteAction={deleteAction}
                deleteParams={['deploymentName']}
            />
        </div>
    );
};
