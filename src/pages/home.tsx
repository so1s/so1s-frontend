import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import { useEffect, useState } from 'react';
import getModels from '../api/models';
import SummaryCard from '../components/summary-card';
import { IModelFindResponse } from '../interfaces/models';
import { Summary } from '../types/components/summary-card';

const Home: React.FC = () => {
    const [modelSummary, setModelSummary] = useState<Summary[]>([]);

    useEffect(() => {
        const getModelData = async () => {
            const response: IModelFindResponse[] = await getModels();

            const result = response.map((item) => {
                return {
                    title: item.name,
                    content: item.status,
                };
            });

            setModelSummary(result);
        };

        getModelData();
    }, []);

    return (
        <div className="flex flex-row justify-around">
            <SummaryCard
                title="Model Summary"
                summaryList={modelSummary}
                icon={
                    <RocketLaunchIcon fontSize="medium" className="my-auto" />
                }
            />
            <SummaryCard
                title="Deployment Summary"
                summaryList={[{ title: 'test', content: 'SUCCEEDED' }]}
                icon={
                    <RocketLaunchIcon fontSize="medium" className="my-auto" />
                }
            />
            <SummaryCard
                title="A/B Test Summary"
                summaryList={[{ title: 'test', content: 'SUCCEEDED' }]}
                icon={
                    <RocketLaunchIcon fontSize="medium" className="my-auto" />
                }
            />
        </div>
    );
};

export default Home;
