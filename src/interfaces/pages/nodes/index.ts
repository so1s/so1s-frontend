import { RootObject } from './generated';

export type INodeResponse = RootObject;

export interface INodeYamlResponse {
    yaml: string;
}

export type INodeView = INodeResponse & {
    name: string;

    nodeGroup: string;
    instanceType: string;

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
