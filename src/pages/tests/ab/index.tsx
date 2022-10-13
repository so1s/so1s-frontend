import { useAtom } from 'jotai';
import { deleteABTest } from '../../../api/tests';
import { deploymentsAtom } from '../../../atoms/deployments';
import { abTestsAtom } from '../../../atoms/tests';
import ListTable from '../../../components/table';
import { useABTestsData } from '../../../hooks/useABTestsData';
import { useDelete } from '../../../hooks/useDelete';
import { useDeploymentsData } from '../../../hooks/useDeploymentsData';
import { IABTestView } from '../../../interfaces/pages/tests';
import { convertABTestToView } from '../../../utils/pages/tests/ab';

const ABTests: React.FC = () => {
    const refreshData = useABTestsData();
    useDeploymentsData();

    const [abTests] = useAtom(abTestsAtom);
    const [deployments] = useAtom(deploymentsAtom);

    const abTestsView: IABTestView[] = abTests.map((abTest) =>
        convertABTestToView(abTest, deployments)
    );

    const performDelete = useDelete(deleteABTest);

    const deleteAction = async (id: number) => {
        const success = await performDelete(id);

        refreshData();

        return success;
    };

    return (
        <div>
            <ListTable
                title="AB Tests"
                items={abTestsView}
                itemKey="name"
                hasDetail
                editable
                deletable
                deleteAction={deleteAction}
            />
        </div>
    );
};

export default ABTests;
