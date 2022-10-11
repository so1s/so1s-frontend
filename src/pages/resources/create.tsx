import { TextField } from '@mui/material';
import { pipe } from 'fp-ts/lib/function';
import { useAtom } from 'jotai';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { createResource } from '../../api/resources';
import { snackbarAtom } from '../../atoms/snackbar';
import ActionCard from '../../components/action-card';

export const CreateResource: React.FC = () => {
    const [, setSnackbarDatum] = useAtom(snackbarAtom);
    const navigate = useNavigate();

    const nameRef = useRef<HTMLInputElement>(null);
    const cpuRequestRef = useRef<HTMLInputElement>(null);
    const cpuLimitRef = useRef<HTMLInputElement>(null);
    const memoryRequestRef = useRef<HTMLInputElement>(null);
    const memoryLimitRef = useRef<HTMLInputElement>(null);
    const gpuRequestRef = useRef<HTMLInputElement>(null);
    const gpuLimitRef = useRef<HTMLInputElement>(null);

    const setError = (message: string) => {
        setSnackbarDatum({
            severity: 'error',
            message,
        });
    };

    const submit = async () => {
        const items = {
            Name: nameRef,
            'CPU Request': cpuRequestRef,
            'CPU Limit': cpuLimitRef,
            'Memory Request': memoryRequestRef,
            'Memory Limit': memoryLimitRef,
            'GPU Request': gpuRequestRef,
            'GPU Limit': gpuLimitRef,
        };

        const itemsWithValues = pipe(
            items,
            Object.entries,
            (arr) => arr.map(([k, v]) => [k, v.current?.value]),
            Object.fromEntries
        ) as { [k in keyof typeof items]: string };

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

        const response = await createResource({
            name: itemsWithValues.Name,
            cpu: itemsWithValues['CPU Request'],
            cpuLimit: itemsWithValues['CPU Limit'],
            memory: itemsWithValues['Memory Request'],
            memoryLimit: itemsWithValues['Memory Limit'],
            gpu: itemsWithValues['GPU Request'],
            gpuLimit: itemsWithValues['GPU Limit'],
        });

        setSnackbarDatum({
            severity: response.success ? 'success' : 'error',
            message: JSON.stringify(response.message, null, 4),
        });

        navigate('/resources');
    };

    return (
        <ActionCard title="Create New Resource" mode="CREATE" onClick={submit}>
            <div className="flex flex-col space-y-10 my-10 mx-auto">
                <TextField
                    label="Resource Name"
                    type="text"
                    inputRef={nameRef}
                />
                <TextField
                    label="CPU Request"
                    type="text"
                    defaultValue="100m"
                    inputRef={cpuRequestRef}
                />
                <TextField
                    label="CPU Limit"
                    type="text"
                    defaultValue="100m"
                    inputRef={cpuLimitRef}
                />
                <TextField
                    label="Memory Request"
                    type="text"
                    defaultValue="256Mi"
                    inputRef={memoryRequestRef}
                />
                <TextField
                    label="Memory Limit"
                    type="text"
                    defaultValue="256Mi"
                    inputRef={memoryLimitRef}
                />
                <TextField
                    label="GPU Request"
                    type="number"
                    defaultValue={0}
                    inputRef={gpuRequestRef}
                />
                <TextField
                    label="GPU Limit"
                    type="number"
                    defaultValue={0}
                    inputRef={gpuLimitRef}
                />
            </div>
        </ActionCard>
    );
};
