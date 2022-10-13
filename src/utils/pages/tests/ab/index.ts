import { IDeploymentDatum } from '../../../../interfaces/pages/deployments';
import {
    IABTestReadResponse,
    IABTestView,
} from '../../../../interfaces/pages/tests';

export const convertABTestToView = (
    abTest: IABTestReadResponse,
    deployments: IDeploymentDatum[]
): IABTestView => {
    return {
        id: abTest.id,
        name: abTest.name,
        a: deployments.find((dep) => dep.id === abTest.aId),
        b: deployments.find((dep) => dep.id === abTest.bId),
        domain: abTest.domain,
    };
};
