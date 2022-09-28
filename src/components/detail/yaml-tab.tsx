import MonacoEditor from '@uiw/react-monacoeditor';
import { IYAMLTABProps } from '../../interfaces/components/detail';

const YAMLTAB: React.FC<IYAMLTABProps> = ({ value }) => {
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

export default YAMLTAB;
