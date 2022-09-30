import { Button, Divider, Paper, Typography } from "@mui/material";
import { useEffect, useRef } from "react";
import useAuth from "../hooks/useAuth";
import LockIcon from '@mui/icons-material/Lock';
import Input from "../components/input";
import signIn from "../api/auth";
import { ISignInResponse } from "../interfaces/pages/auth";
import { accessTokenWithPersistence } from "../atoms/token";
import { useAtom } from "jotai";

const Login: React.FC = () => {
    const [accessToken, setAccessToken] = useAtom(accessTokenWithPersistence);
    useAuth();
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);


    useEffect(() => {
        console.log({ accessToken })
        if (!accessToken) {
            return;
        }
        location.href = "/";
    }, [accessToken]);

    const login = async () => {
        const username = usernameRef.current?.value ?? '';
        const password = passwordRef.current?.value ?? '';

        if (!username) {
            console.log('Username이 주어지지 않았습니다.'); // snackbar TODO
            return;
        }
        if (!password) {
            console.log('Password가 주어지지 않았습니다.');
            return;
        }

        let tokenResponse: ISignInResponse | null = null;

        try {
            tokenResponse = await signIn(username, password);
        } catch {
            console.log('로그인에 실패했습니다.');
            return;
        }

        console.log('로그인에 성공했습니다.');

        setAccessToken(tokenResponse?.token ?? '');
    }


    return <div className="flex flex-row mx-auto my-auto">
        <Paper className="w-[40rem] flex-row py-10">
            <div className="w-[30rem] mx-auto my-auto flex flex-col justify-center space-y-4">
                <div className="mx-auto">
                    <LockIcon fontSize="large" sx={{ backgroundColor: '#9C27B0', color: '#000000', padding: '0.5rem' }}></LockIcon>

                </div>
                <Typography align="center" variant="h6">Sign in</Typography>
                <Input title="Username" inputRef={usernameRef}></Input>
                <Input title="Password" type="password" inputRef={passwordRef}></Input>
                <Button variant="contained" onClick={login}>Sign In</Button>
            </div>
        </Paper>
    </div>

}

export default Login;