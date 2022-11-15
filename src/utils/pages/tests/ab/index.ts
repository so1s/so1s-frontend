import { IDeploymentDatum } from '../../../../interfaces/pages/deployments';
import {
    IABTestJoined,
    IABTestReadResponse,
    IABTestView,
} from '../../../../interfaces/pages/tests';

export const joinABTest = (
    abTest: IABTestReadResponse,
    deployments: IDeploymentDatum[]
): IABTestJoined => {
    return {
        id: abTest.id,
        name: abTest.name,
        a: deployments.find((dep) => dep.id === abTest.aid),
        b: deployments.find((dep) => dep.id === abTest.bid),
        domain: abTest.domain,
    };
};

export const convertABTestToView = (
    abTest: IABTestReadResponse,
    deployments: IDeploymentDatum[]
): IABTestView => {
    const joined = joinABTest(abTest, deployments);
    return {
        id: joined.id,
        name: joined.name,
        a: joined.a?.deploymentName ?? '',
        b: joined.b?.deploymentName ?? '',
        domain: joined.domain,
    };
};
