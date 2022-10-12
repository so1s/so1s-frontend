import { atom } from 'jotai';
import { IDeploymentDatum } from '../interfaces/pages/deployments';

export const deploymentsAtom = atom<IDeploymentDatum[]>([]);
