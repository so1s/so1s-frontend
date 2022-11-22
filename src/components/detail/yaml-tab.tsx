import MonacoEditor from '@uiw/react-monacoeditor';
import { IYamlTabProps } from '../../interfaces/components/detail';

const YamlTab: React.FC<IYamlTabProps> = ({ value }) => {
    return (
        <MonacoEditor
            height="75vh"
            language="yaml"
            value={value}
            options={{
                theme: 'hc-black',
                readOnly: true,
            }}
        />
    );
};

export default YamlTab;
