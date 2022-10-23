import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import { IBackspaceProps } from '../interfaces/components/backspace';

export const Backspace = (props: IBackspaceProps) => {
    const { className } = props;
    const navigate = useNavigate();

    const goBack = () => navigate(-1);

    return (
        <ArrowBackIcon
            className={`cursor-pointer mr-2 ${className ?? ''}`}
            onClick={goBack}
        />
    );
};
