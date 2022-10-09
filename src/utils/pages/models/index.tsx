import CancelIcon from '@mui/icons-material/Cancel';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import HelpIcon from '@mui/icons-material/Help';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import UnpublishedIcon from '@mui/icons-material/Unpublished';
import { Status } from '../../../types';
import { CustomPopover } from '../../../components/custom-popover';

export const convertStatusToIcon = (status: Status) => {
    const mappings = Object.fromEntries(
        Object.entries({
            PENDING: <AutorenewIcon />,
            RUNNING: <ChangeCircleIcon />,
            SUCCEEDED: <CheckCircleIcon />,
            FAILED: <UnpublishedIcon />,
            UNKNOWN: <HelpIcon />,
        }).map(([k, v]) => [
            k,
            <CustomPopover key={k} title={k}>
                {v}
            </CustomPopover>,
        ])
    );

    return mappings[status] ?? <CancelIcon />;
};
