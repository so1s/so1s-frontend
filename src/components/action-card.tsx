import { Button, Paper } from '@mui/material';
import IActionCardProps from '../interfaces/components/action-card';
import { Backspace } from './backspace';

const ActionCard: React.FC<IActionCardProps> = ({
    children,
    title,
    mode,
    onClick,
}) => {
    return (
        <Paper className="w-6/12 mx-auto">
            <div className="font-serif text-2xl text-body mx-5 py-5">
                <Backspace />
                <span>{title}</span>
            </div>
            <div className="mx-5 py-5 font-sans">{children}</div>
            <div className="flex flex-row-reverse mx-5 py-5">
                <Button variant="contained" onClick={onClick}>
                    {' '}
                    {mode}{' '}
                </Button>
            </div>
        </Paper>
    );
};

export default ActionCard;
