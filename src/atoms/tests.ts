import { atom } from 'jotai';
import { IABTestReadResponse } from '../interfaces/pages/tests';

export const abTestsAtom = atom<IABTestReadResponse[]>([]);
