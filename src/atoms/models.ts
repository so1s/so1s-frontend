import { atom } from 'jotai';
import { IModelDatum } from '../interfaces/pages/models';

export const modelsAtom = atom<IModelDatum[]>([]);
