import { ReactNode } from 'react';

export default interface IActionCardProps {
    children: ReactNode;
    title: string;
    mode: 'UPDATE' | 'CREATE';
    onClick: React.MouseEventHandler<HTMLButtonElement>;
}
