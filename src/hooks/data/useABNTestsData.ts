import getABNTests from '../../api/tests/abn';
import { abnTestsAtom } from '../../atoms/tests';
import { useData } from '../useData';

export const useABNTestsData = () =>
    useData(abnTestsAtom, getABNTests, { useRawType: true });
