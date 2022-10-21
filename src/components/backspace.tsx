import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

export const Backspace = () => {
    const navigate = useNavigate();

    const goBack = () => navigate(-1);

    return (
        <ArrowBackIcon className="cursor-pointer mr-2 mb-1" onClick={goBack} />
    );
};
