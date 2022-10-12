import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { deleteDeployment, getDeploymentYaml } from '../../api/deployments';
import { deploymentsAtom } from '../../atoms/deployments';
import { snackbarAtom } from '../../atoms/snackbar';
import { DetailCard } from '../../components/detail/card';
import OverViewTab from '../../components/detail/overview-tab';
import YamlTab from '../../components/detail/yaml-tab';
import { UNIT } from '../../constants';
import { useDelete } from '../../hooks/useDelete';
import { useDeploymentsData } from '../../hooks/useDeploymentsData';

export const DeploymentDetail: React.FC = () => {
    const [deployments] = useAtom(deploymentsAtom);
    useDeploymentsData();

    const navigate = useNavigate();
    const [, setSnackbarDatum] = useAtom(snackbarAtom);

    const params = useParams();

    const { deploymentName } = params;
    const deployment = deployments.find(
        (e) => e.deploymentName === deploymentName
    );

    const performDelete = useDelete(deleteDeployment);

    const deleteAction = async (id: number) => {
        const success = await performDelete(id);

        navigate(`/deployments`, { replace: true });

        return success;
    };

    const [yaml, setYaml] = useState('');

    useEffect(() => {
        if (!deploymentName) {
            setSnackbarDatum({
                severity: 'error',
                message: 'Deployment Name이 주어지지 않았습니다.',
            });
            navigate('/deployments', { replace: true });
        }
    }, [deploymentName]);

    useEffect(() => {
        if (!deployments.length) {
            return;
        }
        if (!deployment) {
            setSnackbarDatum({
                severity: 'error',
                message: 'Name이 일치하는 Deployment가 없습니다.',
            });
            navigate('/deployments', { replace: true });
            return;
        }
        (async () => {
            const { yaml: yamlResponse } = await getDeploymentYaml(
                deployment.id
            );

            setYaml(yamlResponse);
        })();
    }, [deployment]);

    return (
        <div>
            <DetailCard
                title="Deployment Details"
                tabs={['OverView', 'Logs', 'Yaml']}
                deleteHandler={() => {
                    if (!deployment) {
                        return;
                    }
                    deleteAction(deployment.id);
                }}
            >
                <OverViewTab
                    headEl={[
                        'ID',
                        'Age',
                        'Name',
                        'Endpoint',
                        'Deployment Strategy',
                        'Model Name',
                        'Model Version',
                        'CPU Request',
                        'CPU Limit',
                        'Memory Request',
                        'Memory Limit',
                        'GPU Request',
                        'GPU Limit',
                        'Standard',
                        'Value',
                        'Min Replicas',
                        'Max Replicas',
                    ]}
                >
                    <div>{deployment?.id}</div>
                    <div>{deployment?.age}</div>
                    <div>{deployment?.deploymentName}</div>
                    <div>{deployment?.endPoint}</div>
                    <div>{deployment?.strategy}</div>
                    <div>{deployment?.modelName}</div>
                    <div>{deployment?.modelVersion}</div>
                    <div>{deployment?.cpu}</div>
                    <div>{deployment?.cpuLimit}</div>
                    <div>{deployment?.memory}</div>
                    <div>{deployment?.memoryLimit}</div>
                    <div>{deployment?.gpu}</div>
                    <div>{deployment?.gpuLimit}</div>
                    <div>{deployment?.standard}</div>
                    <div>
                        {deployment?.standardValue}
                        {UNIT[deployment?.standard || 'REPLICAS']}
                    </div>
                    <div>{deployment?.minReplicas}</div>
                    <div>{deployment?.maxReplicas}</div>
                </OverViewTab>
                <div>Not Implemented</div>
                <YamlTab value={yaml} />
            </DetailCard>
        </div>
    );
};
