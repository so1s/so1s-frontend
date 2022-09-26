import { BrowserRouter, Routes as ReactRoutes, Route } from 'react-router-dom';
import routes from '../constants/routes';
import Header from './header';
import Navbar from './navbar';

const Router: React.FC = () => {
    return (
        <BrowserRouter>
            <ReactRoutes>
                {routes.map((e) => {
                    const Page = e.page;

                    const Element = (
                        <div className="w-full min-h-full flex">
                            <div className="flex-1 flex-col">
                                <Header />
                                <div className="flex flex-row">
                                    <Navbar />
                                    <div className="flex-1 my-10 min-w-fit">
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
