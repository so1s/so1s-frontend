import { baseURL } from '../../constants';
import { axiosInstance } from '../../hooks/useAuth';
import {
    IModelMetadataDetailResponse,
    IModelMetadataDeleteResponse,
} from '../../interfaces/pages/model-metadata';

export const getModelMetadataDetail = async (id: number, version: string) => {
    const response = await axiosInstance.get(
        `${baseURL}/api/v1/models/${id}/versions/${version}`
    );

    return response.data as IModelMetadataDetailResponse;
};

export const deleteModelMetadata = async (id: number, version: string) => {
    const response = await axiosInstance.delete(
        `${baseURL}/api/v1/models/${id}/versions/${version}`
    );

    return response.data as IModelMetadataDeleteResponse;
};
