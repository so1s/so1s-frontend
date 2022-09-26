import { ReactNode } from 'react';

export interface IDetailCardProps {
    title: string;
    tabs: string[];
    children: ReactNode[];
}

export interface ITabPanelProps {
    children?: ReactNode;
    index: number;
    value: number;
}
