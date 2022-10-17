import { Button, Paper, Typography } from '@mui/material';
import { useEffect, useRef } from 'react';
import LockIcon from '@mui/icons-material/Lock';
import { useAtom } from 'jotai';
import { useNavigate } from 'react-router-dom';
import Input from '../components/input';
import signIn from '../api/auth';
import { ISignInResponse } from '../interfaces/pages/auth';
import { accessTokenWithPersistence } from '../atoms/token';
import { snackbarAtom } from '../atoms/snackbar';

const Login: React.FC = () => {
    const [accessToken, setAccessToken] = useAtom(accessTokenWithPersistence);
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const [, setSnackbarDatum] = useAtom(snackbarAtom);
    const navigate = useNavigate();

    useEffect(() => {
        if (!accessToken) {
            return;
        }
        navigate('/', {
            replace: true,
        });
    }, [accessToken]);

    const login = async () => {
        const username = usernameRef.current?.value ?? '';
        const password = passwordRef.current?.value ?? '';

        if (!username) {
            setSnackbarDatum({
                severity: 'error',
                message: 'Username이 주어지지 않았습니다.',
            });
            return;
        }
        if (!password) {
            setSnackbarDatum({
                severity: 'error',
                message: 'Password가 주어지지 않았습니다.',
            });
            return;
        }

        let tokenResponse: ISignInResponse | null = null;

        try {
            tokenResponse = await signIn(username, password);
        } catch {
            setSnackbarDatum({
                severity: 'error',
                message: '로그인에 실패했습니다.',
            });
            return;
        }

        setSnackbarDatum({
            severity: 'success',
            message: '로그인에 성공했습니다.',
        });

        setAccessToken(tokenResponse?.token ?? '');
    };

    return (
        <div className="flex flex-row mx-auto my-auto">
            <Paper className="w-[40rem] flex-row py-10">
                <div className="w-[30rem] mx-auto my-auto flex flex-col justify-center space-y-4">
                    <div className="mx-auto">
                        <LockIcon
                            fontSize="large"
                            sx={{
                                backgroundColor: '#9C27B0',
                                color: '#000000',
                                padding: '0.5rem',
                            }}
                        />
                    </div>
                    <Typography align="center" variant="h6">
                        Sign in
                    </Typography>
                    <Input
                        title="Username"
                        inputRef={usernameRef}
                        sx={{ width: '100%' }}
                    />
                    <Input
                        title="Password"
                        type="password"
                        inputRef={passwordRef}
                        sx={{ width: '100%' }}
                    />
                    <Button variant="contained" onClick={login}>
                        Sign In
                    </Button>
                </div>
            </Paper>
        </div>
    );
};

export default Login;
