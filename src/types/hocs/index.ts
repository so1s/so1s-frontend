import IRouterDatum from '../../interfaces/router';

export type HoCProps = {
    children?: React.ReactNode;
};

export type WithHeaderProps = HoCProps & {
    datum: IRouterDatum;
};
