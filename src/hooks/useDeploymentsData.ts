import { useAtom } from 'jotai';
import { useEffect } from 'react';
import getDeployments from '../api/deployments';
import { deploymentsAtom } from '../atoms/deployments';
import { IDeploymentDatum } from '../interfaces/pages/deployments';
import { convertStatusToIcon } from '../utils/pages/models';

export const useDeploymentsData = () => {
    const [, setDeployments] = useAtom(deploymentsAtom);

    const getData = async () => {
        try {
            const data = await getDeployments();
            setDeployments(
                data.map(
                    (datum) =>
                        ({
                            ...datum,
                            age: new Date(datum.age).toLocaleString(),
                            status: convertStatusToIcon(datum.status),
                        } as IDeploymentDatum)
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
