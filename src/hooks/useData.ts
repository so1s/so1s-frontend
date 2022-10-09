import { PrimitiveAtom, useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { Status } from '../types';
import { convertStatusToIcon } from '../utils/pages/models';

export const useData = <IBase extends { age: string }>(
    dataAtom: PrimitiveAtom<(IBase & { status: JSX.Element })[]>,
    getApi: (...args: any[]) => Promise<(IBase & { status: Status })[]>
) => {
    type IDatum = IBase & { status: JSX.Element };

    const [, setData] = useAtom(dataAtom);
    const [needRefesh, setNeedRefresh] = useState<boolean>(true);

    const [args, setArgs] = useState<any[]>([]);

    const refresh = (...args: any[]) => {
        setArgs(args);
        setNeedRefresh(true);
    };

    const getData = async () => {
        try {
            const data = (await getApi(...args)).map(
                (datum) =>
                    ({
                        ...datum,
                        age: new Date(datum.age).toLocaleString(),
                        status: convertStatusToIcon(datum.status),
                    } as IDatum)
            );
            setData(data);
        } catch (err) {
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
