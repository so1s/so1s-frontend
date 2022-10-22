import { INodeResponse, INodeView } from '../../../interfaces/pages/nodes';

export const convertNodeToView = (node: INodeResponse): INodeView => {
    return {
        ...node,
        name: node.metadata.name,
        cpuAllocatable: node.status.allocatable.cpu,
        memoryAllocatable: node.status.allocatable.memory,
        EphemeralStrageAllocatable:
            node.status.allocatable['ephemeral-storage'],
        gpuAllocatable: node.status.allocatable['nvidia.com/gpu'],
        podsAllocatable: node.status.allocatable.pods,

        cpuCapacity: node.status.capacity.cpu,
        memoryCapacity: node.status.capacity.memory,
        ephemeralStrorageCapacity: node.status.capacity['ephemeral-storage'],
        gpuCapacity: node.status.capacity['nvidia.com/gpu'],
        podsCapacity: node.status.capacity.pods,
    } as INodeView;
};
