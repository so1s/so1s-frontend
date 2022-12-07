import { TextField } from '@mui/material';
import { pipe } from 'fp-ts/lib/function';
import { useAtom } from 'jotai';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { createRegistry } from '../../api/registries';
import { snackbarAtom } from '../../atoms/snackbar';
import ActionCard from '../../components/action-card';

export const CreateRegistry: React.FC = () => {
    const [, setSnackbarDatum] = useAtom(snackbarAtom);
    const navigate = useNavigate();

    const nameRef = useRef<HTMLInputElement>(null);
    const baseUrlRef = useRef<HTMLInputElement>(null);
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const setError = (message: string) => {
        setSnackbarDatum({
            severity: 'error',
            message,
        });
    };

    const submit = async () => {
        const items = {
            Name: nameRef,
            baseUrl: baseUrlRef,
            username: usernameRef,
            password: passwordRef,
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

        const response = await createRegistry({
            name: itemsWithValues.Name,
            baseUrl: itemsWithValues.baseUrl,
            username: itemsWithValues.username,
            password: itemsWithValues.password,
        });

        navigate('/registries');
    };

    return (
        <ActionCard title="Create New Registry" mode="CREATE" onClick={submit}>
            <div className="flex flex-col space-y-10 my-10 mx-auto">
                <TextField
                    label="Registry Name"
                    type="text"
                    placeholder="ghcr"
                    inputRef={nameRef}
                />
                <TextField
                    label="Registry url"
                    type="text"
                    placeholder="ghcr.io"
                    inputRef={baseUrlRef}
                />
                <TextField
                    label="Registry Username"
                    type="text"
                    placeholder="so1s"
                    inputRef={usernameRef}
                />
                <TextField
                    label="Registry Password"
                    type="password"
                    inputRef={passwordRef}
                />
            </div>
        </ActionCard>
    );
};
