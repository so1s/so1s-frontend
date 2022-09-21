import LogoutIcon from '@mui/icons-material/Logout';
import { useAtom } from 'jotai';
import Logo from '../assets/So1s.png';
import currentPage from '../atoms/current-page';

const Header: React.FC = () => {
    const [page] = useAtom(currentPage);

    return (
        <header className="sticky top-0 w-full flex justify-between">
            <div className="flex-grow h-18 flex justify-between px-5 py-2 bg-primary text-white">
                <img src={Logo} className="my-auto h-8" alt="So1s Logo" />
                <div className="font-serif text-2xl">
                    {page?.name ?? 'Home'}
                </div>
                <LogoutIcon className="my-auto" fontSize="large" />
            </div>
        </header>
    );
};

export default Header;
