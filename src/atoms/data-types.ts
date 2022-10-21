import { atom } from 'jotai';
import { IDataTypeResponse } from '../interfaces/data-types';

export const dataTypesAtom = atom<IDataTypeResponse[]>([]);
