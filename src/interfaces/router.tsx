type User = 'Owner' | 'Admin' | 'User';

export default interface IRouterDatum {
    uri: string;
    name: string;
    icon: JSX.Element;
    page: React.FC;
    authOnly?: boolean;
    for?: User[];
    hidden?: boolean;
}
