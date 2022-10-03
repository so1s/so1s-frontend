import { ReactNode } from 'react';

export interface IDetailCardProps {
    title: string;
    tabs: string[];
    children: ReactNode[];
    deleteHandler?: React.MouseEventHandler<SVGSVGElement> | undefined;
}

export interface ITabPanelProps {
    children?: ReactNode;
    index: number;
    value: number;
}

export interface IOverViewTab {
    headEl: string[];
    children: ReactNode[];
}

export interface IYamlTabProps {
    value: string;
}
