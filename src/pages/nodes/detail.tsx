import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getNodeYaml } from '../../api/nodes';
import { snackbarAtom } from '../../atoms/snackbar';
import { DetailCard } from '../../components/detail/card';
import OverViewTab from '../../components/detail/overview-tab';
import YamlTab from '../../components/detail/yaml-tab';
import { useNodesData } from '../../hooks/data/useNodesData';
import { convertNodeToView } from '../../utils/pages/nodes';

export const NodeDetail = () => {
    const [nodes] = useNodesData();
    const [yaml, setYaml] = useState('');

    const [, setSnackbarDatum] = useAtom(snackbarAtom);

    const { nodeName } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (!nodeName) {
            setSnackbarDatum({
                severity: 'error',
                message: `노드명이 주어지지 않았습니다..`,
            });
            navigate('/nodes');
        }
    }, []);

    if (!nodeName) {
        return <></>;
    }

    const node = nodes.find((node) => node.metadata.name === nodeName);

    useEffect(() => {
        (async () => {
            setYaml(await getNodeYaml(nodeName));
        })();
    }, [nodeName]);

    useEffect(() => {
        if (!node) {
            setSnackbarDatum({
                severity: 'error',
                message: `${nodeName} 노드명과 일치하는 노드를 찾지 못했습니다.`,
            });
            navigate('/nodes');
        }
    }, []);

    if (!node) {
        return <></>;
    }

    const nodeView = convertNodeToView(node);

    return (
        <div>
            <DetailCard
                title="Node Details"
                tabs={['OverView', 'Logs', 'Yaml']}
            >
                <OverViewTab
                    headEl={[
                        'Api Version',
                        'Kind',
                        'Node Group',
                        'Name',
                        'Instance Type',
                        'Allocatable CPU',
                        'Allocatable Memory',
                        'Allocatable Ephemeral Storage',
                        'Allocatable GPU',
                        'Allocatable Pods',
                        'CPU Capacity',
                        'Memory Capacity',
                        'Ephemeral Storage Capacity',
                        'GPU Capacity',
                        'Pods Capacity',
                    ]}
                >
                    <div>{nodeView.apiVersion}</div>
                    <div>{nodeView.kind}</div>
                    <div>
                        {
                            nodeView.metadata.labels[
                                'eks.amazonaws.com/nodegroup'
                            ]
                        }
                    </div>
                    <div>{nodeView.name}</div>
                    <div>
                        {
                            nodeView.metadata.labels[
                                'node.kubernetes.io/instance-type'
                            ]
                        }
                    </div>
                    <div>{nodeView.cpuAllocatable}</div>
                    <div>{nodeView.memoryAllocatable}</div>
                    <div>{nodeView.ephemeralStorageAllocatable}</div>
                    <div>{nodeView.gpuAllocatable ?? 'None'}</div>
                    <div>{nodeView.podsAllocatable}</div>
                    <div>{nodeView.cpuCapacity}</div>
                    <div>{nodeView.memoryCapacity}</div>
                    <div>{nodeView.ephemeralStorageCapacity}</div>
                    <div>{nodeView.gpuCapacity ?? 'None'}</div>
                    <div>{nodeView.podsCapacity}</div>
                </OverViewTab>
                <div>Not Implemented</div>
                <YamlTab value={yaml} />
            </DetailCard>
        </div>
    );
};
