import { atom } from 'jotai';
import { IDataTypeResponse } from '../interfaces/atoms';

export const dataTypesAtom = atom<IDataTypeResponse[]>([]);
