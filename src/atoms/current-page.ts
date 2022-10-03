import { atom } from 'jotai';
import IRouterDatum from '../interfaces/router';

const currentPage = atom<IRouterDatum | null>(null);

export default currentPage;
