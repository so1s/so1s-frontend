import { atom } from 'jotai';
import { IRegistryFindResponse } from '../interfaces/pages/registries';

export const registriesAtom = atom<IRegistryFindResponse[]>([]);
