import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { deleteResource } from '../../api/resources';
import { resourcesAtom } from '../../atoms/resources';
import { snackbarAtom } from '../../atoms/snackbar';
import { DetailCard } from '../../components/detail/card';
import OverViewTab from '../../components/detail/overview-tab';
import { useDelete } from '../../hooks/useDelete';
import { useResourcesData } from '../../hooks/useResourcesData';

export const ResourceDetail = () => {
    const refreshData = useResourcesData();
    const [resources] = useAtom(resourcesAtom);

    const navigate = useNavigate();
    const [, setSnackbarDatum] = useAtom(snackbarAtom);

    const params = useParams();

    const { resourceName } = params;
    const resource = resources.find((e) => e.name === resourceName);

    const performDelete = useDelete(deleteResource);

    const deleteAction = async (id: number) => {
        const success = await performDelete(id);

        refreshData();

        navigate(`/resources`, { replace: true });

        return success;
    };

    useEffect(() => {
        if (!resourceName) {
            setSnackbarDatum({
                severity: 'error',
                message: 'Resource Name이 주어지지 않았습니다.',
            });
            navigate('/resources', { replace: true });
        }
    }, [resourceName]);

    useEffect(() => {
        if (!resources.length) {
            return;
        }
        if (!resource) {
            setSnackbarDatum({
                severity: 'error',
                message: 'Name이 일치하는 Resource가 없습니다.',
            });
            navigate('/resource', { replace: true });
        }
    }, [resource]);

    return (
        <div>
            <DetailCard
                title="Resource Details"
                tabs={['OverView']}
                deleteHandler={() => {
                    if (!resource) {
                        return;
                    }
                    deleteAction(resource.id);
                }}
            >
                <OverViewTab
                    headEl={[
                        'ID',
                        'Name',
                        'CPU Request',
                        'CPU Limit',
                        'Memory Request',
                        'Memory Limit',
                        'GPU Request',
                        'GPU Limit',
                    ]}
                >
                    <div>{resource?.id}</div>
                    <div>{resource?.name}</div>
                    <div>{resource?.cpu}</div>
                    <div>{resource?.cpuLimit}</div>
                    <div>{resource?.memory}</div>
                    <div>{resource?.memoryLimit}</div>
                    <div>{resource?.gpu}</div>
                    <div>{resource?.gpuLimit}</div>
                </OverViewTab>
                <></>
            </DetailCard>
        </div>
    );
};
