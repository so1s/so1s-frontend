import { MenuItem, Select, TextField } from '@mui/material';
import { pipe } from 'fp-ts/lib/function';
import { useAtom } from 'jotai';
import { useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createOrUpdateABTest } from '../../../api/tests';
import { deploymentsAtom } from '../../../atoms/deployments';
import { snackbarAtom } from '../../../atoms/snackbar';
import { abTestsAtom } from '../../../atoms/tests';
import ActionCard from '../../../components/action-card';
import { useABTestsData } from '../../../hooks/useABTestsData';
import { useDeploymentsData } from '../../../hooks/useDeploymentsData';
import { ICreateUpdateBaseParams } from '../../../interfaces';

export const CreateUpdateABTestBase: React.FC<ICreateUpdateBaseParams> = ({
    type,
}: ICreateUpdateBaseParams) => {
    useABTestsData();
    useDeploymentsData();

    const [abTests] = useAtom(abTestsAtom);
    const [deployments] = useAtom(deploymentsAtom);

    const navigate = useNavigate();

    const [, setSnackbarDatum] = useAtom(snackbarAtom);

    const setError = (message: string) => {
        setSnackbarDatum({
            severity: 'error',
            message,
        });
    };

    const nameRef = useRef<HTMLInputElement>(null);
    const aIdRef = useRef<HTMLInputElement>(null);
    const bIdRef = useRef<HTMLInputElement>(null);
    const domainRef = useRef<HTMLInputElement>(null);

    const { abTestName } = useParams();

    if (!abTestName) {
        setError(`AB Test Name이 주어지지 않았습니다.`);
        navigate('/tests/ab', { replace: true });
        return <></>;
    }

    const abTest = abTests.find((test) => test.name === abTestName);

    if (type === 'update' && !abTest) {
        setError(`Name과 일치하는 AB Test 객체를 찾지 못했습니다.`);
        navigate('/tests/ab', { replace: true });
        return <></>;
    }
    const submit = async () => {
        const items = {
            name: nameRef,
            aId: aIdRef,
            bId: bIdRef,
            domain: domainRef,
        };

        const itemsWithValues = pipe(
            items,
            Object.entries,
            (arr) => arr.map(([k, v]) => [k, v.current?.value]),
            Object.fromEntries
        ) as { [k in keyof typeof items]: string | number };

        const isCorrect = pipe(
            itemsWithValues,
            Object.entries,

            (arr) =>
                arr.every(([name, value]) => {
                    if (value !== 0 && !value) {
                        setError(`${name}이(가) 주어지지 않았습니다.`);
                        return false;
                    }
                    return true;
                })
        );

        if (!isCorrect) {
            return;
        }

        const mode = type === 'create' ? 'post' : 'put';

        const { name, aId, bId, domain } = itemsWithValues;

        const response = await createOrUpdateABTest(
            {
                name: name as string,
                a: aId as number,
                b: bId as number,
                domain: domain as string,
            },
            mode
        );

        setSnackbarDatum({
            severity: response.success ? 'success' : 'error',
            message: JSON.stringify(response.data, null, 4),
        });

        navigate('/tests/ab');
    };

    return (
        <ActionCard
            title={`${type === 'create' ? 'Create' : 'Update New'} Model`}
            mode={type === 'create' ? 'CREATE' : 'UPDATE'}
            onClick={submit}
        >
            <div className="flex flex-col space-y-10 my-10 mx-auto">
                <TextField
                    label="AB Test Name"
                    disabled={type === 'update'}
                    placeholder="AB Test"
                    inputRef={nameRef}
                />
                <Select label="Deployment A" inputRef={aIdRef}>
                    {deployments.map((dep) => (
                        <MenuItem key={dep.id} value={dep.id}>
                            {dep.deploymentName}
                        </MenuItem>
                    ))}
                </Select>
                <Select label="Deployment A" inputRef={bIdRef}>
                    {deployments.map((dep) => (
                        <MenuItem key={dep.id} value={dep.id}>
                            {dep.deploymentName}
                        </MenuItem>
                    ))}
                </Select>
                <TextField
                    label="Domain"
                    placeholder="https://so1s.io"
                    inputRef={domainRef}
                />
            </div>
        </ActionCard>
    );
};
