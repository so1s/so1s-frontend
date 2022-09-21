import { atom } from 'jotai';
import IRouterDatum from '../interfaces/router';

const currentPage = atom<IRouterDatum | null>(null); // Interface TODO

export default currentPage;
