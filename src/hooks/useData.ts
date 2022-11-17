import { AxiosError } from 'axios';
import { PrimitiveAtom, useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { locale } from '../constants';
import { Status } from '../types';
import { convertStatusToIcon } from '../utils/pages/models';

export const defaultRefreshDelay = 500;

export const useData = <
    IBase extends UseRawType extends true ? {} : { age: string },
    UseRawType extends boolean | undefined = undefined
>(
    dataAtom: PrimitiveAtom<
        (UseRawType extends true ? IBase : IBase & { status: JSX.Element })[]
    >,
    getApi: (
        ...args: any[]
    ) => Promise<
        (UseRawType extends true ? IBase : IBase & { status: Status })[]
    >,
    params: {
        useRawType?: UseRawType;
        refreshDelay?: number | null;
    } = {}
) => {
    type IDatum = UseRawType extends true
        ? IBase
        : IBase & { status: JSX.Element };

    const { useRawType } = params;
    const { refreshDelay: initialRefreshDelay } = params;

    const refreshDelay =
        initialRefreshDelay === undefined
            ? defaultRefreshDelay
            : initialRefreshDelay;

    const [data, setData] = useAtom(dataAtom);
    const [needRefesh, setNeedRefresh] = useState<boolean>(true);

    const [args, setArgs] = useState<any[]>([]);

    const refresh = (...args: any[]) => {
        setArgs(args);
        setNeedRefresh(true);
    };

    useEffect(() => {
        if (refreshDelay === null) {
            return () => {};
        }

        const id = setInterval(() => {
            setNeedRefresh(true);
        }, refreshDelay);

        return () => clearInterval(id);
    }, [refreshDelay, setNeedRefresh]);

    const getData = async () => {
        try {
            const data = (await getApi(...args)).map((datum) => {
                if (useRawType) {
                    return datum as IBase;
                }
                const narrowedDatum = datum as IBase & {
                    age: string;
                    status: Status;
                };
                return {
                    ...narrowedDatum,
                    age: new Date(narrowedDatum.age).toLocaleString(locale),
                    status: convertStatusToIcon(narrowedDatum.status),
                } as unknown as IDatum;
            });
            setData(data as IDatum[]);
        } catch (err) {
            if ((err as AxiosError).response?.status === 500) {
                return;
            }

            setTimeout(getData, 200);
        }
    };

    useEffect(() => {
        if (needRefesh) {
            getData();
            setNeedRefresh(false);
        }
    }, [needRefesh, getData, setNeedRefresh]);

    useEffect(() => () => setData([]), []);

    return [data, refresh] as const;
};
