import LogoutIcon from '@mui/icons-material/Logout';
import { useAtom } from 'jotai';
import Logo from '../assets/So1s.png';
import currentPage from '../atoms/current-page';

const Header: React.FC = () => {
    const [page] = useAtom(currentPage);

    return (
        <header className="sticky top-0 w-full flex justify-between z-30">
            <div className="flex-grow h-18 w-full flex justify-between px-5 py-2 bg-primary text-white">
                <a href="/"> <img src={Logo} className="my-auto h-8" alt="So1s Logo" /></a>
                <div className="font-serif text-2xl">
                    {page?.name ?? 'Home'}
                </div>
                <a href="/login"> <LogoutIcon className="my-auto" fontSize="large" /></a>
            </div>
        </header>
    );
};

export default Header;
