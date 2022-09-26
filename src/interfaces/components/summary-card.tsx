import { Summary } from '../../types/components/summary-card';

export interface ISummaryCardProps {
    title: string;
    summaryList: Array<Summary>;
    icon: JSX.Element;
}
