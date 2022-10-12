import { atom } from 'jotai';
import { IResourceFind } from '../interfaces/pages/resources';

export const resourcesAtom = atom<IResourceFind[]>([]);
