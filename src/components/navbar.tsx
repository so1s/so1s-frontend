import { Link } from 'react-router-dom';
import routes from '../constants/routes';

const NavBar: React.FC = () => {
    return (
        <nav className="w-[16vw] min-h-[100vh] bg-white divide-y divide-[#e5e7eb] ">
            {routes.map((e) => {
                return (
                    <div key={e.name} className="h-20 flex flex-grow">
                        <Link
                            replace
                            to={e.uri}
                            className="flex flex-row my-auto space-x-3 ml-2"
                        >
                            <div className="">{e.icon}</div>
                            <div className="font-sans my-auto">{e.name}</div>
                        </Link>
                    </div>
                );
            })}
        </nav>
    );
};

export default NavBar;
