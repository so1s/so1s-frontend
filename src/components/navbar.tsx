import { useAtom } from 'jotai';
import { useNavigate } from 'react-router-dom';
import currentPage from '../atoms/current-page';
import routes from '../constants/routes';

const NavBar: React.FC = () => {
    const [, setPage] = useAtom(currentPage);
    const navigate = useNavigate();
    return (
        <nav className="w-[15rem] h-[95vh] bg-white divide-y divide-[#e5e7eb]">
            {routes
                .map((e) => {
                    if (e.hidden) {
                        return null;
                    }
                    return (
                        // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
                        <div
                            key={e.name}
                            className="h-20 flex flex-grow cursor-pointer"
                            onClick={() => {
                                navigate(e.uri);
                            }}
                        >
                            <div className="flex flex-row my-auto space-x-3 ml-2">
                                <div className="">{e.icon}</div>
                                <div className="font-sans my-auto">
                                    {e.name}
                                </div>
                            </div>
                        </div>
                    );
                })
                .filter((e) => !!e)}
        </nav>
    );
};

export default NavBar;
