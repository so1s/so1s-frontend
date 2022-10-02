import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useEffect, useMemo, useRef, useState } from 'react';
import ActionCard from '../components/action-card';
import { DetailCard } from '../components/detail/card';
import Input from '../components/input';
import OverViewTab from '../components/detail/overview-tab';
import ListTable from '../components/table';
import IListTableProps from '../interfaces/components/table';
import YAMLTAB from '../components/detail/yaml-tab';
import { getModelYaml } from '../api/models';
import { IModelDatum } from '../interfaces/pages/models';

export const sampleModelData: IListTableProps<IModelDatum> = {
    items: [
        {
            id: 1,
            age: '1 minutes ago',
            name: 'iris',
            status: <CheckCircleIcon />,
            version: 'v1',
            library: 'tensorflow',
        },
        {
            id: 2,
            age: '2 minutes ago',
            name: 'iris',
            status: <CheckCircleIcon />,
            version: 'v1',
            library: 'tensorflow',
        },
        {
            id: 3,
            age: '3 minutes ago',
            name: 'iris',
            status: <CheckCircleIcon />,
            version: 'v1',
            library: 'tensorflow',
        },
    ],
    editable: true,
    downloadable: true,
};

const Index: React.FC = () => {
    const inputT = useRef<HTMLInputElement>(null);

    const api = () => {
        console.log(inputT.current?.value);
    };

    const [yaml, setYaml] = useState('');
    const getModelYAML = useMemo(
        () => async () => {
            return getModelYaml({ modelId: 2, version: 'v1' });
        },
        []
    );

    useEffect(() => {
        (async () => {
            const result = await getModelYAML();
            setYaml(result.yaml);
        })();
    }, []);

    return (
        <div>
            <ListTable {...{ ...sampleModelData, title: 'Models' }} />
            <ActionCard title="Models" mode="UPDATE" onClick={api}>
                <Input title="hello" inputRef={inputT} />
            </ActionCard>

            <DetailCard
                title="Model Details"
                tabs={['OVERVIEW', 'LOGS', 'YAML']}
                deleteHandler={() => {
                    console.log('delete detail');
                }}
            >
                <OverViewTab
                    headEl={[
                        'Name',
                        'Status',
                        'File',
                        'Library',
                        'Input Shape',
                        'Input Dtype',
                    ]}
                >
                    <div>sss</div>
                    <div>sss</div>
                    <div>hi2</div>
                    <div>hi3</div>
                    <div>hi2</div>
                    <div>hi3</div>
                </OverViewTab>
                <div>hi3</div>
                <YAMLTAB value={yaml} />
            </DetailCard>
        </div>
    );
};

export default Index;
