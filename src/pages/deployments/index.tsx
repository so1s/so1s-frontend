import { useAtom } from 'jotai';
import { deploymentsAtom } from '../../atoms/deployments';
import ListTable from '../../components/table';
import { useDeploymentsData } from '../../hooks/useDeploymentsData';

export const Deployments = () => {
    const [deployments] = useAtom(deploymentsAtom);
    useDeploymentsData();

    return (
        <div>
            <ListTable
                title="Deployments"
                items={deployments}
                hasDetail
                editable
                deletable
            />
        </div>
    );
};
