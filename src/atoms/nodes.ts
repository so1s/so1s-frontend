import { atom } from 'jotai';
import { INodeResponse } from '../interfaces/nodes';

export const nodesAtom = atom<INodeResponse[]>([]);
