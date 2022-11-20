import { useAtom } from 'jotai';
import { useNavigate, useParams } from 'react-router-dom';
import { snackbarAtom } from '../../../atoms/snackbar';
import { DetailCard } from '../../../components/detail/card';
import OverViewTab from '../../../components/detail/overview-tab';
import { useDelete } from '../../../hooks/useDelete';
import { useDeploymentsData } from '../../../hooks/data/useDeploymentsData';
import { joinABNTest } from '../../../utils/pages/tests/abn';
import { useABNTestsData } from '../../../hooks/data/useABNTestsData';
import { deleteABNTest } from '../../../api/tests/abn';

export const ABNTestDetail = () => {
    const [abnTests] = useABNTestsData();
    const [deployments] = useDeploymentsData();

    const navigate = useNavigate();
    const [, setSnackbarDatum] = useAtom(snackbarAtom);

    const params = useParams();

    const performDelete = useDelete(deleteABNTest);

    const deleteAction = async (id: number) => {
        const success = await performDelete(id);

        navigate(`/tests/abn`, { replace: true });

        return success;
    };

    const { id } = params;

    if (!id) {
        setSnackbarDatum({
            severity: 'error',
            message: 'name이 주어지지 않았습니다.',
        });
        navigate('/tests/abn', { replace: true });
        return <></>;
    }

    const abnTest = abnTests.find((e) => e.id === +id);

    if (abnTests.length && !abnTest) {
        setSnackbarDatum({
            severity: 'error',
            message: 'abnTestName과 일치하는 AB Test 객체를 찾지 못했습니다.',
        });
        navigate('/tests/abn', { replace: true });
        return <></>;
    }

    const abnTestJoined = joinABNTest(abnTest, deployments);

    const headElements = ['ID', 'Name', 'Domain'].concat(
        abnTest?.elements
            .map((e, idx) => {
                const p1 = idx + 1;
                return [
                    `Deployment ${p1} Name`,
                    `Deployment ${p1} Weight`,
                    `Deployment ${p1} Status`,
                    `Deployment ${p1} Model Name`,
                    `Deployment ${p1} Model Version`,
                    `Deployment ${p1} Deployment Strategy`,
                ];
            })
            .reduce((a, b) => a.concat(b), []) ?? []
    );

    const deploymentDivs =
        abnTestJoined?.elements
            ?.map(({ deployment, weight }) => (
                <>
                    <div>{deployment?.deploymentName}</div>
                    <div>{weight}</div>
                    <div>{deployment?.status}</div>
                    <div>{deployment?.modelName}</div>
                    <div>{deployment?.modelVersion}</div>
                    <div>{deployment?.strategy}</div>
                </>
            ))
            .map((e) => e.props.children)
            .reduce((a, b) => a.concat(b), []) ?? [];

    return (
        <div>
            <DetailCard
                title="ABN Test Details"
                tabs={['OverView']}
                deleteHandler={() => {
                    if (abnTest?.id === undefined) {
                        return;
                    }
                    deleteAction(abnTest.id);
                }}
            >
                <OverViewTab headEl={headElements}>
                    {/* https://stackoverflow.com/a/61475211/11853111 */}
                    {[
                        <div key="id">{abnTestJoined?.id}</div>,
                        <div key="name">{abnTestJoined?.name}</div>,
                        <div key="domain">{abnTestJoined?.domain}</div>,
                    ].concat(deploymentDivs)}
                </OverViewTab>
                <></>
            </DetailCard>
        </div>
    );
};
