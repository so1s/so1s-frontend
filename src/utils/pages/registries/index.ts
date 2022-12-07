import {
    IRegistryFindResponse,
    IRegistryView,
} from '../../../interfaces/pages/registries';

export const convertRegistryToView = (
    registry: IRegistryFindResponse
): IRegistryView => {
    return {
        name: registry.name,
        baseUrl: registry.baseUrl,
        username: registry.username,
    } as IRegistryView;
};
