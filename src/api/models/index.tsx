import axios from 'axios';
import { baseURL } from '../../constants';
import { IModelFindResponse } from '../../interfaces/pages/models';

export const getModels = async () => {
    const response = await axios.get(`${baseURL}/api/v1/models`);

    return response.data as IModelFindResponse[];
};

interface IModelYAMLFindRequest {
    modelId: string | number;
    version: string | number;
}

interface IModelYAMLFindResponse {
    yaml: string;
}

export const getModelYaml = async ({
    modelId,
    version,
}: IModelYAMLFindRequest) => {
    const response = await axios.get(
        `${baseURL}/api/v1/models/${modelId}/versions/${version}/yaml`
    );

    return response.data as IModelYAMLFindResponse;
};

export default getModels;
