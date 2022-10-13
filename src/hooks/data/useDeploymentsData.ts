import getDeployments from '../../api/deployments';
import { deploymentsAtom } from '../../atoms/deployments';
import { useData } from '../useData';

export const useDeploymentsData = () =>
    useData(deploymentsAtom, getDeployments);
