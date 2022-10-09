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
import Login from '../pages/login';
import Logout from '../pages/logout';
import Models from '../pages/models';
import CreateModel from '../pages/models/create';
import UpdateModel from '../pages/models/update';
import ModelDetail from '../pages/models/detail';
import { ModelMetadataDetail } from '../pages/model-metadata/detail';
import { Deployments } from '../pages/deployments';

const routes: IRouterDatum[] = [
    {
        uri: '/',
        name: 'Home',
        icon: <HomeIcon fontSize="large" />,
        page: Home,
        authOnly: false,
    },
    {
        uri: '/login',
        name: 'Login',
        page: Login,
        authOnly: false,
        hidden: true,
    },
    {
        uri: '/logout',
        name: 'Logout',
        page: Logout,
        authOnly: false,
        hidden: true,
    },
    {
        uri: '/models',
        name: 'Models',
        icon: <ModelTrainingIcon fontSize="large" />,
        authOnly: true,
        page: Models,
        for: ['Owner', 'Admin', 'User'],
    },
    {
        uri: '/models/:modelName',
        name: 'Model Detail',
        authOnly: true,
        hidden: true,
        page: ModelDetail,
        for: ['Owner', 'Admin', 'User'],
    },
    {
        uri: '/models/create',
        name: 'Model Create',
        authOnly: true,
        hidden: true,
        page: CreateModel,
        for: ['Owner', 'Admin', 'User'],
    },
    {
        uri: '/models/update/:modelName',
        name: 'Create Model Metadata',
        authOnly: true,
        hidden: true,
        page: UpdateModel,
        for: ['Owner', 'Admin', 'User'],
    },
    {
        uri: '/models/:modelName/:version',
        name: 'Model Metadata Detail',
        authOnly: true,
        hidden: true,
        page: ModelMetadataDetail,
        for: ['Owner', 'Admin', 'User'],
    },
    {
        uri: '/deployments',
        name: 'Deployments',
        authOnly: true,
        icon: <RocketLaunchIcon fontSize="large" />,
        page: Deployments,
        for: ['Owner', 'Admin', 'User'],
    },
    {
        uri: '/volumes',
        name: 'Volumes',
        icon: <StorageIcon fontSize="large" />,
        authOnly: true,
        page: Index,
        for: ['Owner', 'Admin', 'User'],
    },
    {
        uri: '/monitoring',
        name: 'Monitoring',
        icon: <MonitorIcon fontSize="large" />,
        authOnly: true,
        page: Index,
        for: ['Owner', 'Admin', 'User'],
    },
    {
        uri: '/tests',
        name: 'Tests',
        icon: <SpeedIcon fontSize="large" />,
        page: Index,
        for: ['Owner', 'Admin', 'User'],
    },
    {
        uri: '/alerts',
        name: 'Alerts',
        icon: <NotificationImportantIcon fontSize="large" />,
        page: Index,
        for: ['Owner', 'Admin', 'User'],
    },
    {
        uri: '/resources',
        name: 'Resources',
        icon: <MemoryIcon fontSize="large" />,
        page: Index,
        for: ['Owner', 'Admin', 'User'],
    },
];

export default routes;
