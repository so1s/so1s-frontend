import { deleteABTest } from '../../../api/tests/ab';
import ListTable from '../../../components/table';
import { useABTestsData } from '../../../hooks/data/useABTestsData';
import { useDelete } from '../../../hooks/useDelete';
import { useDeploymentsData } from '../../../hooks/data/useDeploymentsData';
import { IABTestView } from '../../../interfaces/pages/tests/ab';
import { convertABTestToView } from '../../../utils/pages/tests/ab';

const ABTests: React.FC = () => {
    const [abTests, refreshData] = useABTestsData();
    const [deployments] = useDeploymentsData();

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
                creatable
                editable
                deletable
                deleteAction={deleteAction}
            />
        </div>
    );
};

export default ABTests;
