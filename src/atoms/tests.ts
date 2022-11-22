import { atom } from 'jotai';
import { IABNTestReadResponse } from '../interfaces/pages/tests/abn';

export const abnTestsAtom = atom<IABNTestReadResponse[]>([]);
