import HomeIcon from '@mui/icons-material/Home';
import Index from '../components';
import IRouterDatum from '../interfaces/router';

const routes: IRouterDatum[] = [
    {
        uri: '/',
        name: 'Index',
        icon: <HomeIcon />,
        page: Index,
        authOnly: false,
    },
    {
        uri: 'models',
        name: 'Model Detail',
        icon: <HomeIcon />,
        page: Index,
        for: ['Owner', 'Admin', 'User'],
    },
];

export default routes;
