import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import ModelTrainingIcon from '@mui/icons-material/ModelTraining';
import SpeedIcon from '@mui/icons-material/Speed';
import { useEffect, useState } from 'react';
import getDeployments from '../api/deployments';
import getModels from '../api/models';
import getABTests from '../api/tests';
import SummaryCard from '../components/summary-card';
import { IDeploymentFindResponse } from '../interfaces/deployments';
import { IModelFindResponse } from '../interfaces/models';
import { IABTestReadResponse } from '../interfaces/tests';
import { Summary } from '../types/components/summary-card';

const Home: React.FC = () => {
    const [modelSummary, setModelSummary] = useState<Summary[]>([]);
    const [deploySummary, setDeploySummary] = useState<Summary[]>([]);
    const [testSummary, setTestSummary] = useState<Summary[]>([]);

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

    useEffect(() => {
        const getDeployData = async () => {
            const response: IDeploymentFindResponse[] = await getDeployments();

            const result = response.map((item) => {
                return {
                    title: item.deploymentName,
                    content: item.status,
                };
            });

            setDeploySummary(result);
        };

        getDeployData();
    }, []);

    useEffect(() => {
        const getTestData = async () => {
            const response: IABTestReadResponse[] = await getABTests();

            const result = response.map((item) => {
                return {
                    title: item.name,
                    content: item.domain,
                };
            });

            setTestSummary(result);
        };

        getTestData();
    }, []);

    return (
        <div className="flex flex-row justify-around">
            <SummaryCard
                title="Model Summary"
                summaryList={modelSummary}
                icon={
                    <ModelTrainingIcon fontSize="medium" className="my-auto" />
                }
            />
            <SummaryCard
                title="Deployment Summary"
                summaryList={deploySummary}
                icon={
                    <RocketLaunchIcon fontSize="medium" className="my-auto" />
                }
            />
            <SummaryCard
                title="A/B Test Summary"
                summaryList={testSummary}
                icon={<SpeedIcon fontSize="medium" className="my-auto" />}
            />
        </div>
    );
};

export default Home;
