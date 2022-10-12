import { atom } from 'jotai';
import { ILibraryDatum } from '../interfaces/atoms/library';

export const librariesAtom = atom<ILibraryDatum[]>([]);
