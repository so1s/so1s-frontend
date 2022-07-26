/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import LogoutIcon from '@mui/icons-material/Logout';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useAtom } from 'jotai';
import { useNavigate } from 'react-router-dom';
import Logo from '../assets/So1s.png';
import currentPage from '../atoms/current-page';
import { accessTokenWithPersistence } from '../atoms/token';
import { snackbarAtom } from '../atoms/snackbar';
import { useNavigator } from '../hooks/useNavigator';

const Header: React.FC = () => {
    const [page] = useAtom(currentPage);
    const [accessToken] = useAtom(accessTokenWithPersistence);
    const [, setSnackbarDatum] = useAtom(snackbarAtom);
    const navigate = useNavigate();
    const logoClickHandler = () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        accessToken
            ? navigate('/')
            : (setSnackbarDatum({
                  severity: 'error',
                  message: '로그인 된 사용자만 이용 가능합니다.',
              }),
              navigate('/login'));
    };

    return (
        <header className="sticky top-0 w-full flex justify-between z-30">
            <div className="flex-grow h-18 w-full flex justify-between px-5 py-2 bg-primary text-white">
                <img
                    src={Logo}
                    className="my-auto h-8 cursor-pointer"
                    alt="So1s Logo"
                    onClick={logoClickHandler}
                />
                <div className="font-serif text-2xl">
                    {page?.name ?? 'Home'}
                </div>
                {!accessToken ? (
                    <LogoutIcon
                        className="my-auto cursor-pointer"
                        fontSize="large"
                        onClick={useNavigator('/login')}
                    />
                ) : (
                    <ExitToAppIcon
                        className="my-auto cursor-pointer"
                        fontSize="large"
                        onClick={useNavigator('/logout')}
                    />
                )}
            </div>
        </header>
    );
};

export default Header;
