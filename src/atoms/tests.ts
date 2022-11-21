import { atom } from 'jotai';
import { IABTestReadResponse } from '../interfaces/pages/tests/ab';
import { IABNTestReadResponse } from '../interfaces/pages/tests/abn';

export const abTestsAtom = atom<IABTestReadResponse[]>([]);
export const abnTestsAtom = atom<IABNTestReadResponse[]>([]);
