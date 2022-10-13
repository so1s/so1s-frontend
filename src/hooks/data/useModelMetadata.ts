import { getModelMetadataById } from '../../api/models';
import { modelMetadataAtom } from '../../atoms/model-metadata';
import { useData } from '../useData';

export const useModelMetadata = () =>
    useData(modelMetadataAtom, getModelMetadataById);
