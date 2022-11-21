import {
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    TextField,
} from '@mui/material';
import { pipe } from 'fp-ts/lib/function';
import { useAtom } from 'jotai';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createOrUpdateABNTest } from '../../../api/tests/abn';
import { snackbarAtom } from '../../../atoms/snackbar';
import ActionCard from '../../../components/action-card';
import { useABNTestsData } from '../../../hooks/data/useABNTestsData';
import { useDeploymentsData } from '../../../hooks/data/useDeploymentsData';
import { IABNTestElement } from '../../../interfaces/pages/tests/abn';
import { ICreateUpdateBaseParams } from '../../../interfaces';

export const CreateUpdateABNTestBase: React.FC<ICreateUpdateBaseParams> = ({
    type,
}: ICreateUpdateBaseParams) => {
    const [abnTests] = useABNTestsData();
    const [deployments] = useDeploymentsData();
    const [elementsSize, setElementsSize] = useState(1);
    const elements = useRef<IABNTestElement[]>([]);

    const navigate = useNavigate();

    const [, setSnackbarDatum] = useAtom(snackbarAtom);

    const setError = (message: string) => {
        setSnackbarDatum({
            severity: 'error',
            message,
        });
    };

    const nameRef = useRef<HTMLInputElement>(null);
    const domainRef = useRef<HTMLInputElement>(null);

    const { id } = useParams();
    const abnTest = abnTests.find((test) => test.id === +id);

    useEffect(() => {
        if (type === 'update' && abnTest) {
            elements.current = [...abnTest.elements];
            setElementsSize(abnTest.elements.length);
        }
    }, [abnTest, type]);

    useEffect(() => {
        while (elementsSize > elements.current.length) {
            elements.current.push({
                deploymentId: deployments[0]?.id ?? 0,
                weight: 0,
            });
        }
        while (elementsSize < elements.current.length) {
            elements.current.pop();
        }
    }, [elementsSize]);

    if (type === 'update' && id == null) {
        setError(`AB Test ID가 주어지지 않았습니다.`);
        navigate('/tests/abn', { replace: true });
        return <></>;
    }

    const submit = async () => {
        const items = {
            name: nameRef,
            domain: domainRef,
        };

        const itemsWithValues = pipe(
            items,
            Object.entries,
            (arr) => arr.map(([k, v]) => [k, v.current?.value]),
            Object.fromEntries
        ) as { [k in keyof typeof items]: string | number };

        if (type === 'update') {
            itemsWithValues.name = abnTest?.name ?? '';
        }

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

        if (elementsSize < 1) {
            setError(`하나 이상의 인퍼런스 서버가 정의되어야 합니다.`);
            return;
        }

        const mode = type === 'create' ? 'post' : 'put';

        const { name, domain } = itemsWithValues;

        const response = await createOrUpdateABNTest(
            {
                name: name as string,
                domain: domain as string,
                elements: elements.current,
            },
            mode
        );

        setSnackbarDatum({
            severity: response.success ? 'success' : 'error',
            message: JSON.stringify(response.data, null, 4),
        });

        navigate('/tests/abn');
    };

    const elementsForm = useMemo(
        () =>
            new Array(elementsSize).fill(null).map((_, idx) => {
                const p1 = idx + 1;

                const handleDeploymentChange = (
                    event: SelectChangeEvent<number>
                ) => {
                    const {
                        target: { value },
                    } = event;

                    elements.current[idx].deploymentId = +value;
                };

                const handleWeightChange = (
                    event: React.ChangeEvent<HTMLInputElement>
                ) => {
                    const {
                        target: { value },
                    } = event;

                    elements.current[idx].weight = +value;
                };

                return (
                    <div key={idx} className="my-10">
                        <FormControl fullWidth>
                            <InputLabel id={`deployment-${idx}`}>
                                Deployment {p1}
                            </InputLabel>
                            <div className="space-y-10 flex flex-col">
                                <Select
                                    label="Deployment"
                                    onChange={handleDeploymentChange}
                                >
                                    {deployments.map((dep) => (
                                        <MenuItem key={dep.id} value={dep.id}>
                                            {dep.deploymentName}
                                        </MenuItem>
                                    ))}
                                </Select>
                                <TextField
                                    label={`Deployment ${p1} Weight`}
                                    type="number"
                                    defaultValue={0}
                                    inputProps={{ min: 0 }}
                                    onChange={handleWeightChange}
                                />
                            </div>
                        </FormControl>
                    </div>
                );
            }),
        [elementsSize, deployments]
    );

    return (
        <ActionCard
            title={`${type === 'create' ? 'Create New' : 'Update'} ABN Test`}
            mode={type === 'create' ? 'CREATE' : 'UPDATE'}
            onClick={submit}
        >
            <div className="flex flex-col space-y-10 my-10 mx-auto">
                <TextField
                    label={`ABN Test Name${
                        type === 'update'
                            ? `: ${abnTest?.name ?? 'Not Found'} (Disabled)`
                            : ''
                    }`}
                    disabled={type === 'update'}
                    placeholder="ABN Test"
                    inputRef={nameRef}
                />
                <TextField
                    label="Domain"
                    defaultValue={abnTest?.domain}
                    placeholder="so1s.io"
                    inputRef={domainRef}
                />
            </div>
            {elementsForm}
            <div className="flex flex-row w-full">
                <div className="ml-auto mr-5">
                    <Button
                        color="primary"
                        variant="contained"
                        onClick={() => setElementsSize(elementsSize + 1)}
                    >
                        +
                    </Button>
                </div>

                <div className="mr-auto ml-5">
                    {elementsSize > 1 && (
                        <Button
                            color="error"
                            variant="contained"
                            onClick={() => setElementsSize(elementsSize - 1)}
                        >
                            -
                        </Button>
                    )}
                </div>
            </div>
        </ActionCard>
    );
};
