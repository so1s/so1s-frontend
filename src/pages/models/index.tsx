/* eslint-disable react/jsx-key */
import { useEffect, useRef, useState } from 'react';
import getModels from '../../api/models';
import ListTable from '../../components/table';
import { IModelDatum } from '../../interfaces/pages/models';
import { convertStatusToIcon } from '../../utils/pages/models';

const Models: React.FC = () => {
    const [models, setModels] = useState<IModelDatum[]>([]);

    useEffect(() => {
        (async () => {
            const data = await getModels();
            setModels(
                data.map(
                    (datum) =>
                        ({
                            ...datum,
                            status: convertStatusToIcon(datum.status),
                        } as IModelDatum)
                )
            );
        })();
    });

    const inputT = useRef<HTMLInputElement>(null);

    const api = () => {
        console.log(inputT.current?.value);
    };

    return (
        <div>
            <ListTable items={models} editable downloadable />
        </div>
    );
};

export default Models;
