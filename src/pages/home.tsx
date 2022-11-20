import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import ModelTrainingIcon from '@mui/icons-material/ModelTraining';
import SpeedIcon from '@mui/icons-material/Speed';
import { useEffect, useState, useMemo } from 'react';
import getDeployments from '../api/deployments';
import getModels from '../api/models';
import getABTests from '../api/tests/ab';
import SummaryCard from '../components/summary-card';
import { IDeploymentFindResponse } from '../interfaces/pages/deployments';
import { IModelFindResponse } from '../interfaces/pages/models';
import { IABTestReadResponse } from '../interfaces/pages/tests/ab';
import ISummaries from '../interfaces/pages/home';

const Home: React.FC = () => {
    const [summaries, setSummaries] = useState<ISummaries>({
        model: [],
        deploy: [],
        test: [],
    });

    const getModelData = useMemo(
        () => async () => {
            const response: IModelFindResponse[] = await getModels();

            const result = response.map((item) => {
                return {
                    title: item.name,
                    content: item.status,
                };
            });

            return result;
        },
        []
    );

    const getDeployData = useMemo(
        () => async () => {
            const response: IDeploymentFindResponse[] = await getDeployments();

            const result = response.map((item) => {
                return {
                    title: item.deploymentName,
                    content: item.status,
                };
            });

            return result;
        },
        []
    );

    const getTestData = useMemo(
        () => async () => {
            const response: IABTestReadResponse[] = await getABTests();

            const result = response.map((item) => {
                return {
                    title: item.name,
                    content: item.domain,
                };
            });

            return result;
        },
        []
    );

    useEffect(() => {
        (async () => {
            const [modelData, deployData, testData] = await Promise.all([
                getModelData(),
                getDeployData(),
                getTestData(),
            ]);

            setSummaries({
                model: modelData,
                deploy: deployData,
                test: testData,
            });
        })();
    }, []);

    return (
        <div className="flex flex-row justify-around">
            <SummaryCard
                title="Model Summary"
                summaryList={summaries?.model ?? []}
                icon={
                    <ModelTrainingIcon fontSize="medium" className="my-auto" />
                }
            />
            <SummaryCard
                title="Deployment Summary"
                summaryList={summaries?.deploy ?? []}
                icon={
                    <RocketLaunchIcon fontSize="medium" className="my-auto" />
                }
            />
            <SummaryCard
                title="A/B Test Summary"
                summaryList={summaries?.test ?? []}
                icon={<SpeedIcon fontSize="medium" className="my-auto" />}
            />
        </div>
    );
};

export default Home;
