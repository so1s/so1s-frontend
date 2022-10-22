import { useEffect } from 'react';
import ListTable from '../../components/table';
import { useNodesData } from '../../hooks/data/useNodesData';
import { convertNodeToView } from '../../utils/pages/nodes';

export const Nodes = () => {
    const [nodes] = useNodesData();

    const nodesView = nodes.map((node) => convertNodeToView(node));

    useEffect(() => {
        console.log({ nodes });
    }, [nodes]);

    return (
        <div>
            <ListTable
                title="Nodes"
                items={nodesView}
                itemKey="name"
                hasDetail
            />
        </div>
    );
};
