import { pipe } from 'fp-ts/lib/function';
import { filter } from 'fp-ts/lib/Array';

export const hasOwnProperty = <T, K extends PropertyKey>(
    obj: T,
    prop: K
): obj is T & Record<K, unknown> => {
    return Object.prototype.hasOwnProperty.call(obj, prop);
};

export const filterColumns = <T extends {}>(obj: T, columns: (keyof T)[]) =>
    pipe(
        obj,
        Object.entries,
        filter(([k, v]) => columns.includes(k as keyof T)),
        Object.fromEntries
    );
