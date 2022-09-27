import { Summary } from '../../types/components/summary-card';

export interface ISummaryCardProps {
    title: string;
    summaryList: Summary[];
    icon: JSX.Element;
}
