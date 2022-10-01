import {
    TextField,
    Select,
    SelectChangeEvent,
    MenuItem,
    Button,
} from '@mui/material';
import { useAtom } from 'jotai';
import { ReactNode, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { modelsAtom } from '../../atoms/models';
import { snackbarAtom } from '../../atoms/snackbar';
import ActionCard from '../../components/action-card';
import { libraries } from '../../constants/libraries';

interface Props {
    modelName: string;
}

const UpdateModel: React.FC = () => {
    const [models] = useAtom(modelsAtom);
    const params: Props = useParams() as unknown as Props;
    const [, setSnackbarDatum] = useAtom(snackbarAtom);
    const navigate = useNavigate();

    const [library, setLibrary] = useState(libraries[0]);
    const [file, setFile] = useState<File | null>(null);
    const modelNameRef = useRef(null);
    const modelFilesRef = useRef(null);
    const inputShapeRef = useRef(null);
    const inputDataTypeRef = useRef(null);
    const outputShapeRef = useRef(null);
    const outputDataTypeRef = useRef(null);

    const handleChangeLibrary = (
        event: SelectChangeEvent<string>,
        child?: ReactNode
    ) => {
        setLibrary(event.target.value);
    };
    const handleFileInput = (e: React.ChangeEvent) => {
        const { files } = e.target as HTMLInputElement;
        setFile(files?.length ? files[0] : null);
    };

    const submit = () => {
        // TODO: Implementation TODO
    };

    const { modelName } = params;

    const model = models.find((model) => model.name === modelName);

    if (!model) {
        setSnackbarDatum({
            severity: 'error',
            message: '일치하는 모델 데이터가 없습니다.',
        });
        navigate('/models', { replace: true });

        return <></>;
    }

    return (
        <ActionCard
            title="Create New Model Metadata"
            mode="CREATE"
            onClick={submit}
        >
            <div className="flex flex-col space-y-10 my-10 mx-auto">
                <TextField
                    label="Model Name"
                    value={`${model.name} (Disabled)`}
                    disabled
                    placeholder="Titanic (Disabled)"
                    inputRef={modelNameRef}
                />
                <Select
                    label="Library"
                    value={model.library}
                    onChange={handleChangeLibrary}
                >
                    {libraries.map((libraryName) => (
                        <MenuItem key={libraryName} value={libraryName}>
                            {libraryName}
                        </MenuItem>
                    ))}
                </Select>
                <div className="flex flex-row">
                    <div className="text-large ml-2 lr-auto w-[10vw] text-lg">
                        Model Files
                    </div>
                    <Button
                        variant="contained"
                        component="label"
                        sx={{
                            marginLeft: 'auto',
                            marginRight: '0',
                            width: '10vw',
                        }}
                    >
                        Upload File
                        <input type="file" hidden onChange={handleFileInput} />
                    </Button>
                </div>

                <TextField
                    label="Input Shape"
                    placeholder="(10,)"
                    inputRef={inputShapeRef}
                />
                <TextField
                    label="Input Data Type"
                    placeholder="float32"
                    inputRef={inputDataTypeRef}
                />
                <TextField
                    label="Output Shape"
                    placeholder="(1,)"
                    inputRef={outputShapeRef}
                />
                <TextField
                    label="Output Data Type"
                    placeholder="string"
                    inputRef={outputDataTypeRef}
                />
            </div>
        </ActionCard>
    );
};

export default UpdateModel;
