import { getLibraries } from '../api/library';
import { librariesAtom } from '../atoms/library';
import { useData } from './useData';

export const useLibrariesData = () =>
    useData(librariesAtom, getLibraries, true);
