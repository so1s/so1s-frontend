import { TextField } from '@mui/material';
import IInputProps from '../interfaces/components/input';

const Input: React.FC<IInputProps> = ({
    title,
    type,
    placholder,
    helperText,
    required,
    defaultValue,
    disabled,
    fullWidth,
    inputRef,
}) => {
    return (
        <div className="my-2">
            {' '}
            <div className="text-large text-label py-1">{title}</div>
            <TextField
                variant="outlined"
                type={type ?? ''}
                fullWidth={!fullWidth}
                placeholder={placholder}
                helperText={helperText}
                required={required}
                defaultValue={defaultValue}
                disabled={disabled}
                inputRef={inputRef}
            />{' '}
        </div>
    );
};

export default Input;
