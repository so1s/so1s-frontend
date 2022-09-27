import MonacoEditor from '@uiw/react-monacoeditor';

interface IYAMLTABProps {
    value: string;
}

const YAMLTAB: React.FC<IYAMLTABProps> = ({ value }) => {
    return (
        <div className="h-96">
            <MonacoEditor
                language="yaml"
                value={value}
                options={{
                    theme: 'hc-black',
                }}
            />
        </div>
    );
};

export default YAMLTAB;
