import { useAtom } from 'jotai';
import { useEffect } from 'react';
import getModels from '../api/models';
import { modelsAtom } from '../atoms/models';
import { IModelDatum } from '../interfaces/pages/models';
import { convertStatusToIcon } from '../utils/pages/models';

export const useModelData = () => {
    const [, setModels] = useAtom(modelsAtom);

    const getData = async () => {
        try {
            const data = await getModels();
            setModels(
                data.map(
                    (datum) =>
                        ({
                            ...datum,
                            age: new Date(datum.age).toLocaleString(),
                            status: convertStatusToIcon(datum.status),
                        } as IModelDatum)
                )
            );
        } catch (err) {
            setTimeout(getData, 200);
        }
    };

    useEffect(() => {
        getData();
    }, []);
};
