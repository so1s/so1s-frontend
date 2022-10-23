import { getNodes } from '../../api/nodes';
import { nodesAtom } from '../../atoms/nodes';
import { useData } from '../useData';

export const useNodesData = () =>
    useData(nodesAtom, getNodes, { useRawType: true });
