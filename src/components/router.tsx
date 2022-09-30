import { useAtom } from 'jotai';
import { BrowserRouter, Routes as ReactRoutes, Route } from 'react-router-dom';
import { accessTokenWithPersistence } from '../atoms/token';
import routes from '../constants/routes';
import LoginRedirect from '../pages/login-redirect';
import Header from './header';
import Navbar from './navbar';

const Router: React.FC = () => {
    const [accessToken] = useAtom(accessTokenWithPersistence);

    return (
        <BrowserRouter>
            <ReactRoutes>
                {routes.map((e) => {
                    const Page = e.authOnly && !accessToken ? LoginRedirect : e.page;

                    const Element = (
                        <div className="w-screen h-screen flex flex-grow overflow-y-hidden">
                            <div className="flex-1 flex-col flex-grow">
                                <Header />
                                <div className="flex h-full flex-row">
                                    {!e.hidden && <Navbar />}
                                    <div className="flex flex-col flex-1 h-[95vh] pt-10 overflow-y-scroll">
                                        <Page />
                                    </div>
                                </div>
                            </div>
                        </div>
                    );

                    return <Route path={e.uri} key={e.uri} element={Element} />;
                })}
            </ReactRoutes>
        </BrowserRouter>
    );
};

export default Router;
