import { RootObject } from './generated';

export type INodeResponse = RootObject;

export type INodeView = INodeResponse & {
    name: string;

    cpuAllocatable: string;
    memoryAllocatable: string;
    EphemeralStrageAllocatable: string;
    gpuAllocatable: string;
    podsAllocatable: string;

    cpuCapacity: string;
    memoryCapacity: string;
    ephemeralStrorageCapacity: string;
    gpuCapacity: string;
    podsCapacity: string;
};
