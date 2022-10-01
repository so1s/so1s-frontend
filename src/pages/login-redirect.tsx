import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { snackbarAtom } from '../atoms/snackbar';

const LoginRedirect: React.FC = () => {
    const [, setSnackbarDatum] = useAtom(snackbarAtom);
    const navigate = useNavigate();

    useEffect(() => {
        setSnackbarDatum({
            severity: 'error',
            message: '로그인 된 사용자만 이용 가능합니다.',
        });

        navigate('/login', {
            replace: true,
        });
    }, []);

    return <></>;
};

export default LoginRedirect;
