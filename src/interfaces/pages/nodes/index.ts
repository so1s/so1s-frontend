import { RootObject } from './generated';

export type INodeResponse = RootObject;

export type INodeView = INodeResponse & {
    name: string;

    cpuAllocatable: string;
    memoryAllocatable: string;
    ephemeralStorageAllocatable: string;
    gpuAllocatable?: string;
    podsAllocatable: string;

    cpuCapacity: string;
    memoryCapacity: string;
    ephemeralStorageCapacity: string;
    gpuCapacity?: string;
    podsCapacity: string;
};
