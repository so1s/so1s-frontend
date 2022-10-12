import { atom } from 'jotai';
import { IModelMetadatum } from '../interfaces/pages/models';

export const modelMetadataAtom = atom<IModelMetadatum[]>([]);
