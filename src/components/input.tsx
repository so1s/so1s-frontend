import { TextField } from '@mui/material';
import IInputProps from '../interfaces/components/input';

const Input: React.FC<IInputProps> = ({ title, ...textFieldProps }) => {
    return (
        <div className="my-2">
            {' '}
            {title ? (
                <div className="text-large text-label py-1">{title}</div>
            ) : null}
            <TextField variant="outlined" {...textFieldProps} />{' '}
        </div>
    );
};

export default Input;
