import MonacoEditor from '@uiw/react-monacoeditor';
import { IYamlTabProps } from '../../interfaces/components/detail';

const YamlTab: React.FC<IYamlTabProps> = ({ value }) => {
    return (
        <div className="h-96">
            <MonacoEditor
                language="yaml"
                value={value}
                options={{
                    theme: 'hc-black',
                    readOnly: true,
                }}
            />
        </div>
    );
};

export default YamlTab;
