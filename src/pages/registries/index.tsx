import ListTable from '../../components/table';
import { useRegistriesData } from '../../hooks/data/useRegistriesData';
import { convertRegistryToView } from '../../utils/pages/registries';

export const Registries = () => {
    const [registries] = useRegistriesData();

    const registriesView = registries.map((r) => convertRegistryToView(r));

    return (
        <div>
            <ListTable
                title="Registries"
                items={registriesView}
                itemKey="name"
                creatable
            />
        </div>
    );
};
