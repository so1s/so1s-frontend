import { getDeploymentStrategies } from '../api/deployment-strategies';
import { deploymentStrategiesAtom } from '../atoms/deployment-strategies';
import { useData } from './useData';

export const useDeploymentStrategiesData = () =>
    useData(deploymentStrategiesAtom, getDeploymentStrategies, {
        useRawType: true,
    });
