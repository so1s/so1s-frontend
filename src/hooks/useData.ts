import { AxiosError } from 'axios';
import { PrimitiveAtom, useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { Status } from '../types';
import { convertStatusToIcon } from '../utils/pages/models';

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
    params?: {
        useRawType?: UseRawType;
    }
) => {
    type IDatum = UseRawType extends true
        ? IBase
        : IBase & { status: JSX.Element };

    const [, setData] = useAtom(dataAtom);
    const [needRefesh, setNeedRefresh] = useState<boolean>(true);

    const [args, setArgs] = useState<any[]>([]);

    const refresh = (...args: any[]) => {
        setArgs(args);
        setNeedRefresh(true);
    };

    const getData = async () => {
        try {
            const data = (await getApi(...args)).map((datum) => {
                if (params?.useRawType) {
                    return datum as IBase;
                }
                const narrowedDatum = datum as IBase & {
                    age: string;
                    status: Status;
                };
                return {
                    ...narrowedDatum,
                    age: new Date(narrowedDatum.age).toLocaleString(),
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

    return refresh;
};
