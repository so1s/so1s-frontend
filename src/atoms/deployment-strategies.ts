import { atom } from 'jotai';
import { IDeploymentStrategyFindResponse } from '../interfaces/pages/deployment-strategies';

export const deploymentStrategiesAtom = atom<IDeploymentStrategyFindResponse[]>(
    []
);
