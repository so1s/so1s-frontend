import { deleteABNTest } from '../../../api/tests/abn';
import ListTable from '../../../components/table';
import { useABNTestsData } from '../../../hooks/data/useABNTestsData';
import { useDelete } from '../../../hooks/useDelete';
import { IABNTestView } from '../../../interfaces/pages/tests/abn';
import { convertABNTestToView } from '../../../utils/pages/tests/abn';

const ABNTests: React.FC = () => {
    const [abnTests, refreshData] = useABNTestsData();

    const abnTestsView: IABNTestView[] = abnTests.map((abnTest) =>
        convertABNTestToView(abnTest)
    );

    const performDelete = useDelete(deleteABNTest);

    const deleteAction = async (id: number) => {
        const success = await performDelete(id);

        refreshData();

        return success;
    };

    console.log({ abnTests });

    return (
        <div>
            <ListTable
                title="ABN Tests"
                items={abnTestsView}
                itemKey="id"
                hasDetail
                creatable
                editable
                deletable
                deleteAction={deleteAction}
            />
        </div>
    );
};

export default ABNTests;
