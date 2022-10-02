import { useAtom } from 'jotai';
import { modelsAtom } from '../../atoms/models';
import ListTable from '../../components/table';
import { useModelData } from '../../hooks/useModelData';

const Models: React.FC = () => {
    const [models, setModels] = useAtom(modelsAtom);
    useModelData();

    return (
        <div>
            <ListTable
                title="Models"
                items={models}
                hasDetail
                editable
                deletable
            />
        </div>
    );
};

export default Models;
