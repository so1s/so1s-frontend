import { getDataTypes } from '../../api/data-types';
import { dataTypesAtom } from '../../atoms/data-types';
import { useData } from '../useData';

export const useDataTypesData = () =>
    useData(dataTypesAtom, getDataTypes, { useRawType: true });
