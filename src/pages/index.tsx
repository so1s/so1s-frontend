import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ListTable from '../components/table';
import IListTableProps from '../interfaces/components/table';

const Index: React.FC = () => {
    const ListTableProps: IListTableProps = {
        headEl: ['Age', 'Name', 'Status', 'Version', 'Library'],
        bodyEl: [
            ['1 minutes ago', 'titan', <CheckCircleIcon />, 'v1', 'tensorflow'],
            ['2 minutes ago', 'titan', <CheckCircleIcon />, 'v1', 'tensorflow'],
            ['3 minutes ago', 'titan', <CheckCircleIcon />, 'v1', 'tensorflow'],
            ['4 minutes ago', 'titan', <CheckCircleIcon />, 'v1', 'tensorflow'],
            ['5 minutes ago', 'titan', <CheckCircleIcon />, 'v1', 'tensorflow'],
            ['6 minutes ago', 'titan', <CheckCircleIcon />, 'v1', 'tensorflow'],
            ['7 minutes ago', 'titan', <CheckCircleIcon />, 'v1', 'tensorflow'],
            ['8 minutes ago', 'titan', <CheckCircleIcon />, 'v1', 'tensorflow'],
            ['9 minutes ago', 'titan', <CheckCircleIcon />, 'v1', 'tensorflow'],
            [
                '10 minutes ago',
                'titan',
                <CheckCircleIcon />,
                'v1',
                'tensorflow',
            ],
        ],
        isAddUpdateCol: true,
    };

    return (
        <div>
            <ListTable
                bodyEl={ListTableProps.bodyEl}
                headEl={ListTableProps.headEl}
                isAddUpdateCol={ListTableProps.isAddUpdateCol}
            />
        </div>
    );
};

export default Index;
