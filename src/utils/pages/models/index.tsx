import CancelIcon from '@mui/icons-material/Cancel';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import HelpIcon from '@mui/icons-material/Help';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import UnpublishedIcon from '@mui/icons-material/Unpublished';
import { Status } from '../../../types';

export const convertStatusToIcon = (status: Status) => {
    return (
        {
            PENDING: <AutorenewIcon />,
            RUNNING: <ChangeCircleIcon />,
            SUCCEEDED: <CheckCircleIcon />,
            FAILED: <UnpublishedIcon />,
            UNKNOWN: <HelpIcon />,
        }[status] ?? <CancelIcon />
    );
};
