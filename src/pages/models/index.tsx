/* eslint-disable react/jsx-key */
import { useEffect, useMemo, useRef, useState } from 'react';
import ActionCard from '../../components/action-card';
import { DetailCard } from '../../components/detail/card';
import Input from '../../components/input';
import OverViewTab from '../../components/detail/overview-tab';
import ListTable from '../../components/table';
import YAMLTAB from '../../components/detail/yaml-tab';
import { getModelYaml } from '../../api/models';
import { sampleModelData } from '../example';

const Models: React.FC = () => {
    const models = useState([]);

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
            <ListTable {...sampleModelData} />
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

export default Models;
