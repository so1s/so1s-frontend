import { Paper } from '@mui/material';
import { ISummaryCardProps } from '../interfaces/components/summary-card';

const SummaryCard: React.FC<ISummaryCardProps> = ({
    title,
    summaryList,
    icon,
}) => {
    return (
        <Paper className="w-52">
            <div className="text-1xl p-3 border-b-2 border-line border-1">
                {title}
            </div>
            <div className="flex my-3">
                {summaryList.map((item, idx) => {
                    return (
                        <div
                            className="flex space-x-5 mx-3 justify-center"
                            key={idx}
                        >
                            {icon}
                            <div className="text-xs">
                                <div> {item.title} </div>
                                <div> {item.content} </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </Paper>
    );
};

export default SummaryCard;
