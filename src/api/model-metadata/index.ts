import { baseURL } from '../../constants';
import { axiosInstance } from '../../hooks/useAuth';
import { IModelMeatdataDeleteResponse } from '../../interfaces/pages/models';

export const deleteModelMetadata = async (id: number, version: string) => {
    const response = await axiosInstance.delete(
        `${baseURL}/api/v1/models/${id}/versions/${version}`
    );

    return response.data as IModelMeatdataDeleteResponse;
};
