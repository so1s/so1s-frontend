import getModels from '../api/models';
import { modelsAtom } from '../atoms/models';
import { useData } from './useData';

export const useModelsData = () => useData(modelsAtom, getModels);
