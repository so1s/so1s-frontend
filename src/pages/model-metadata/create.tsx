import { useNavigate, useParams } from 'react-router-dom';

export const CreateModelMetadata = () => {
    const navigate = useNavigate();
    const { modelName } = useParams();

    navigate(`/models/update/${modelName}`, { replace: true });

    return <></>;
};
