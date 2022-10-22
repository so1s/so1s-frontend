import { useEffect } from 'react';
import { useNodesData } from '../../hooks/data/useNodesData';

export const Nodes = () => {
    const [nodes] = useNodesData();

    useEffect(() => {
        console.log({ nodes });
    }, [nodes]);

    return (
        <div>
            {/* <ListTable
                title="Nodes"
                items={nodes}
                itemKey="kind"
                hasDetail
            /> */}
        </div>
    );
};
