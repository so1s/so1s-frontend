import { baseURL } from '../../constants';
import { axiosInstance } from '../../hooks/useAuth';
import {
    IModelFindResponse,
    IModelYAMLFindRequest,
    IModelYAMLFindResponse,
} from '../../interfaces/pages/models';

export const getModels = async () => {
    const response = await axiosInstance.get(`${baseURL}/api/v1/models`);

    return response.data as IModelFindResponse[];
};

export const getModelYaml = async ({
    modelId,
    version,
}: IModelYAMLFindRequest) => {
    const response = await axiosInstance.get(
        `${baseURL}/api/v1/models/${modelId}/versions/${version}/yaml`
    );

    return response.data as IModelYAMLFindResponse;
};

export default getModels;
