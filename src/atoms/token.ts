import { atom } from 'jotai';

export const accessToken = atom(localStorage.getItem('accessToken'))

export const accessTokenWithPersistence = atom(
    (get) => get(accessToken),
    (get, set, newToken: string) => {
        set(accessToken, newToken)
        localStorage.setItem('accessToken', newToken)
    }
)