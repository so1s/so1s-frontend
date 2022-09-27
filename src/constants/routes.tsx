import HomeIcon from '@mui/icons-material/Home';
import MonitorIcon from '@mui/icons-material/Monitor';
import StorageIcon from '@mui/icons-material/Storage';
import ModelTrainingIcon from '@mui/icons-material/ModelTraining';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import SpeedIcon from '@mui/icons-material/Speed';
import NotificationImportantIcon from '@mui/icons-material/NotificationImportant';
import MemoryIcon from '@mui/icons-material/Memory';
import Index from '../pages/example';
import IRouterDatum from '../interfaces/router';
import Home from '../pages/home';

const routes: IRouterDatum[] = [
    {
        uri: '/',
        name: 'Home',
        icon: <HomeIcon fontSize="large" />,
        page: Home,
        authOnly: false,
    },
    {
        uri: '/models',
        name: 'Models',
        icon: <ModelTrainingIcon fontSize="large" />,
        page: Index,
        for: ['Owner', 'Admin', 'User'],
    },
    {
        uri: '/models',
        name: 'Volumes',
        icon: <StorageIcon fontSize="large" />,
        page: Index,
        for: ['Owner', 'Admin', 'User'],
    },
    {
        uri: '/models',
        name: 'Monitoring',
        icon: <MonitorIcon fontSize="large" />,
        page: Index,
        for: ['Owner', 'Admin', 'User'],
    },
    {
        uri: '/models',
        name: 'Tests',
        icon: <SpeedIcon fontSize="large" />,
        page: Index,
        for: ['Owner', 'Admin', 'User'],
    },
    {
        uri: '/models',
        name: 'Deployments',
        icon: <RocketLaunchIcon fontSize="large" />,
        page: Index,
        for: ['Owner', 'Admin', 'User'],
    },
    {
        uri: '/models',
        name: 'Alerts',
        icon: <NotificationImportantIcon fontSize="large" />,
        page: Index,
        for: ['Owner', 'Admin', 'User'],
    },
    {
        uri: '/models',
        name: 'Resources',
        icon: <MemoryIcon fontSize="large" />,
        page: Index,
        for: ['Owner', 'Admin', 'User'],
    },
];

export default routes;
