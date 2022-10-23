import HomeIcon from '@mui/icons-material/Home';
import MonitorIcon from '@mui/icons-material/Monitor';
import ModelTrainingIcon from '@mui/icons-material/ModelTraining';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import SpeedIcon from '@mui/icons-material/Speed';
import NotificationImportantIcon from '@mui/icons-material/NotificationImportant';
import MemoryIcon from '@mui/icons-material/Memory';
import DnsIcon from '@mui/icons-material/Dns';
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
import { CreateDeployment } from '../pages/deployments/create';
import { UpdateDeployment } from '../pages/deployments/update';
import { DeploymentDetail } from '../pages/deployments/detail';
import ABTests from '../pages/tests/ab';
import { ABTestDetail } from '../pages/tests/ab/detail';
import { CreateABTest } from '../pages/tests/ab/create';
import { UpdateABTest } from '../pages/tests/ab/update';
import { Resources } from '../pages/resources';
import { CreateResource } from '../pages/resources/create';
import { ResourceDetail } from '../pages/resources/detail';
import { CreateModelMetadata } from '../pages/model-metadata/create';
import { Monitoring } from '../pages/monitoring';
import { Nodes } from '../pages/nodes';
import { NodeDetail } from '../pages/nodes/detail';

const routes: IRouterDatum[] = [
    {
        uri: '/',
        name: 'Home',
        icon: <HomeIcon fontSize="large" />,
        page: Home,
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
        page: Models,
        for: ['Owner', 'Admin', 'User'],
    },
    {
        uri: '/models/:modelName',
        name: 'Model Detail',
        hidden: true,
        page: ModelDetail,
        for: ['Owner', 'Admin', 'User'],
    },
    {
        uri: '/models/create',
        name: 'Model Create',
        hidden: true,
        page: CreateModel,
        for: ['Owner', 'Admin', 'User'],
    },
    {
        uri: '/models/:modelName/create',
        name: 'Create Model Metadata',
        hidden: true,
        page: CreateModelMetadata,
        for: ['Owner', 'Admin', 'User'],
    },
    {
        uri: '/models/update/:modelName',
        name: 'Create Model Metadata',
        hidden: true,
        page: UpdateModel,
        for: ['Owner', 'Admin', 'User'],
    },
    {
        uri: '/models/:modelName/:version',
        name: 'Model Metadata Detail',
        hidden: true,
        page: ModelMetadataDetail,
        for: ['Owner', 'Admin', 'User'],
    },
    {
        uri: '/deployments',
        name: 'Deployments',
        icon: <RocketLaunchIcon fontSize="large" />,
        page: Deployments,
        for: ['Owner', 'Admin', 'User'],
    },
    {
        uri: '/deployments/:deploymentName',
        name: 'Deployment Detail',
        hidden: true,
        page: DeploymentDetail,
        for: ['Owner', 'Admin', 'User'],
    },
    {
        uri: '/deployments/create',
        name: 'Create Deployment',
        hidden: true,
        page: CreateDeployment,
        for: ['Owner', 'Admin', 'User'],
    },
    {
        uri: '/deployments/update/:deploymentName',
        name: 'Update Deployment',
        hidden: true,
        page: UpdateDeployment,
        for: ['Owner', 'Admin', 'User'],
    },
    {
        uri: '/monitoring',
        name: 'Monitoring',
        icon: <MonitorIcon fontSize="large" />,
        page: Monitoring,
        for: ['Owner', 'Admin', 'User'],
    },
    {
        uri: '/tests/ab',
        name: 'AB Tests',
        icon: <SpeedIcon fontSize="large" />,
        page: ABTests,
        for: ['Owner', 'Admin', 'User'],
    },
    {
        uri: '/tests/ab/:abTestName',
        name: 'AB Test Detail',
        hidden: true,
        page: ABTestDetail,
        for: ['Owner', 'Admin', 'User'],
    },
    {
        uri: '/tests/ab/create',
        name: 'AB Test Create',
        hidden: true,
        page: CreateABTest,
        for: ['Owner', 'Admin', 'User'],
    },
    {
        uri: '/tests/ab/update/:abTestName',
        name: 'AB Test Update',
        hidden: true,
        page: UpdateABTest,
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
        page: Resources,
        for: ['Owner', 'Admin', 'User'],
    },
    {
        uri: '/resources/:resourceName',
        name: 'Resource Detail',
        hidden: true,
        page: ResourceDetail,
        for: ['Owner', 'Admin', 'User'],
    },
    {
        uri: '/resources/create',
        name: 'Resource Create',
        hidden: true,
        page: CreateResource,
        for: ['Owner', 'Admin', 'User'],
    },
    {
        uri: '/nodes',
        name: 'Nodes',
        icon: <DnsIcon fontSize="large" />,
        page: Nodes,
        for: ['Owner', 'Admin', 'User'],
    },
    {
        uri: '/nodes/:nodeName',
        name: 'Node Detail',
        hidden: true,
        page: NodeDetail,
        for: ['Owner', 'Admin', 'User'],
    },
];

export default routes;
