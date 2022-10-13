import getABTests from '../api/tests';
import { abTestsAtom } from '../atoms/tests';
import { useData } from './useData';

export const useABTestsData = () =>
    useData(abTestsAtom, getABTests, { useRawType: true });
