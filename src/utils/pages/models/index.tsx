import CancelIcon from '@mui/icons-material/Cancel';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import HelpIcon from '@mui/icons-material/Help';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import UnpublishedIcon from '@mui/icons-material/Unpublished';
import { pipe } from 'fp-ts/lib/function';
import { Status } from '../../../types';
import { CustomPopover } from '../../../components/custom-popover';

export const convertStatusToIcon = (status: Status): JSX.Element =>
    pipe(
        {
            PENDING: <AutorenewIcon />,
            RUNNING: <ChangeCircleIcon />,
            SUCCEEDED: <CheckCircleIcon />,
            FAILED: <UnpublishedIcon />,
            UNKNOWN: <HelpIcon />,
        },
        Object.entries,
        (arr) =>
            arr.map(([k, v]) => [
                k,
                <CustomPopover key={k} title={k}>
                    {v}
                </CustomPopover>,
            ]),
        Object.fromEntries,
        (obj) => obj[status] ?? <CancelIcon />
    );
