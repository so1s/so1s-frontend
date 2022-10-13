import { getResources } from '../../api/resources';
import { resourcesAtom } from '../../atoms/resources';
import { useData } from '../useData';

export const useResourcesData = () =>
    useData(resourcesAtom, getResources, { useRawType: true });
