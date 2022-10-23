import { atom } from 'jotai';
import { INodeResponse } from '../interfaces/pages/nodes';

export const nodesAtom = atom<INodeResponse[]>([]);
