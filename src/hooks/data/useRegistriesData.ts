import { getRegistries } from '../../api/registries';
import { registriesAtom } from '../../atoms/registries';
import { useData } from '../useData';

export const useRegistriesData = () =>
    useData(registriesAtom, getRegistries, { useRawType: true });
