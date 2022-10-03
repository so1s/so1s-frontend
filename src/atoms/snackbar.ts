import { atom } from 'jotai';
import { IStackbarDatum } from '../interfaces/atoms/snackbar';

export const snackbarAtom = atom<IStackbarDatum | null>(null);
