import { IDeploymentDatum } from '../../../../interfaces/pages/deployments';
import {
    IABNTestJoined,
    IABNTestReadResponse,
    IABNTestView,
} from '../../../../interfaces/pages/tests/abn';

export const convertABNTestToView = (
    abnTest: IABNTestReadResponse
): IABNTestView => {
    return {
        id: abnTest.id,
        name: abnTest.name,
        domain: abnTest.domain,
    };
};

export const joinABNTest = (
    abnTest: IABNTestReadResponse,
    deployments: IDeploymentDatum[]
): IABNTestJoined => {
    return {
        id: abnTest?.id,
        name: abnTest?.name,
        domain: abnTest?.domain,
        elements: abnTest?.elements?.map((e) => ({
            deployment: deployments?.find((d) => d.id === e.deploymentId)!,
            weight: e.weight,
        })),
    };
};
