import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useRef } from 'react';
import ActionCard from '../components/action-card';
import { DetailCard } from '../components/detail/card';
import Input from '../components/input';
import OverViewTab from '../components/detail/overview-tab';
import ListTable from '../components/table';
import IListTableProps from '../interfaces/components/table';
import YAMLTAB from '../components/detail/yaml-tab';

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

    const inputT = useRef<HTMLInputElement>(null);

    const api = () => {
        console.log(inputT.current?.value);
    };

    const value = `apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: backend-namespace-labeler
  annotations:
    "helm.sh/hook": pre-install
    "helm.sh/hook-weight": "2"
    "helm.sh/hook-delete-policy": hook-succeeded,hook-failed
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: cluster-admin
subjects:
  - kind: ServiceAccount
    name: hyper-sa
    namespace: {{ .Release.Namespace  }}`;

    return (
        <div>
            <ListTable
                bodyEl={ListTableProps.bodyEl}
                headEl={ListTableProps.headEl}
                isAddUpdateCol={ListTableProps.isAddUpdateCol}
            />
            <ActionCard title="Models" mode="UPDATE" onClick={api}>
                <Input title="hello" inputRef={inputT} />
            </ActionCard>

            <DetailCard
                title="Model Details"
                tabs={['OVERVIEW', 'LOGS', 'YAML']}
                deleteHandler={() => {
                    console.log('delete detail');
                }}
            >
                <OverViewTab
                    headEl={[
                        'Name',
                        'Status',
                        'File',
                        'Library',
                        'Input Shape',
                        'Input Dtype',
                    ]}
                >
                    <div>sss</div>
                    <div>sss</div>
                    <div>hi2</div>
                    <div>hi3</div>
                    <div>hi2</div>
                    <div>hi3</div>
                </OverViewTab>
                <div>hi3</div>
                <YAMLTAB value={value} />
            </DetailCard>
        </div>
    );
};

export default Index;
