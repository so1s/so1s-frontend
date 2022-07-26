import {
    TextField,
    Select,
    SelectChangeEvent,
    MenuItem,
    Button,
    FormControl,
    InputLabel,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio,
    LinearProgress,
} from '@mui/material';
import { useAtom } from 'jotai';
import { ReactNode, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createModelOrAddModelMetadata } from '../../api/models';
import { modelsAtom } from '../../atoms/models';
import { snackbarAtom } from '../../atoms/snackbar';
import ActionCard from '../../components/action-card';
import { useDataTypesData } from '../../hooks/data/useDataTypesData';
import { useLibrariesData } from '../../hooks/data/useLibrariesData';
import { useRegistriesData } from '../../hooks/data/useRegistriesData';
import { ICreateUpdateBaseParams } from '../../interfaces';
import { ModelType } from '../../types/pages';

const CreateUpdateModelBase: React.FC<ICreateUpdateBaseParams> = ({
    type,
}: ICreateUpdateBaseParams) => {
    const [models] = useAtom(modelsAtom);
    const params = useParams();
    const [, setSnackbarDatum] = useAtom(snackbarAtom);
    const navigate = useNavigate();

    const [dataTypes] = useDataTypesData();

    const [libraries] = useLibrariesData();
    const [library, setLibrary] = useState<string>('tensorflow');

    const [registries] = useRegistriesData();
    const [registry, setRegistry] = useState<number>(registries[0]?.id ?? 0);

    const [file, setFile] = useState<File | null>(null);
    const [deviceType, setDeviceType] = useState<ModelType>('cpu');
    const [isUploading, setIsUploading] = useState(false);

    const modelNameRef = useRef<HTMLInputElement>(null);
    const inputShapeRef = useRef<HTMLInputElement>(null);
    const inputDataTypeRef = useRef<HTMLInputElement>(null);
    const outputShapeRef = useRef<HTMLInputElement>(null);
    const outputDataTypeRef = useRef<HTMLInputElement>(null);

    const handleChangeLibrary = (
        event: SelectChangeEvent<string>,
        child?: ReactNode
    ) => {
        setLibrary(event.target.value);
    };

    const handleChangeRegistry = (
        event: SelectChangeEvent<number>,
        child?: ReactNode
    ) => {
        setRegistry(+event.target.value);
    };

    const handleFileInput = (e: React.ChangeEvent) => {
        const { files } = e.target as HTMLInputElement;
        setFile(files?.length ? files[0] : null);
    };

    const handleDeviceTypeChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setDeviceType((event.target as HTMLInputElement).value as ModelType);
    };

    const setError = (message: string) => {
        setSnackbarDatum({
            severity: 'error',
            message,
        });
    };

    const { modelName } = params;

    const submit = async () => {
        const [
            modelNameVal,
            inputShape,
            inputDataType,
            outputShape,
            outputDataType,
        ] = [
            modelNameRef,
            inputShapeRef,
            inputDataTypeRef,
            outputShapeRef,
            outputDataTypeRef,
        ].map((e) => e.current?.value);

        const items = {
            '모델 이름': type === 'update' ? modelName : modelNameVal,
            '사용 라이브러리': library,
            '모델 파일': file,
            'Model Registry': registry,
            'Model Device Type': deviceType,
            'Input Shape': inputShape,
            'Input Data Type': inputDataType,
            'Output Shape': outputShape,
            'Output Data Type': outputDataType,
        };

        const isCorrect = Object.entries(items).every(([name, value]) => {
            if (!value && value !== 0) {
                setError(`${name}이(가) 주어지지 않았습니다.`);
                return false;
            }
            return true;
        });

        if (!isCorrect) {
            return;
        }

        const submitMode = type === 'create' ? 'post' : 'put';

        setIsUploading(true);

        const data = await createModelOrAddModelMetadata(
            {
                name: items['모델 이름'] ?? '',
                library,
                modelFile: file!!,
                registryId: registry,
                deviceType,
                inputShape: inputShape ?? '',
                outputShape: outputShape ?? '',
                inputDtype: inputDataType ?? '',
                outputDtype: outputDataType ?? '',
            },
            submitMode
        );

        setSnackbarDatum({
            severity: 'success',
            message: JSON.stringify(data, null, 4),
        });

        navigate('/models');
    };

    const model = models.find((model) => model.name === modelName);

    if (type === 'update' && models.length && !model) {
        setSnackbarDatum({
            severity: 'error',
            message: '일치하는 모델 데이터가 없습니다.',
        });
        navigate('/models', { replace: true });

        return <></>;
    }

    return (
        <ActionCard
            title={`Create New Model ${type === 'update' ? 'Metadata' : ''}`}
            mode={type === 'create' ? 'CREATE' : 'UPDATE'}
            onClick={submit}
        >
            <div className="flex flex-col space-y-10 my-10 mx-auto">
                <TextField
                    label="Model Name"
                    disabled={type === 'update'}
                    placeholder={
                        type === 'update'
                            ? `${model?.name ?? ''} (Disabled)`
                            : 'Titanic'
                    }
                    inputRef={modelNameRef}
                />
                <FormControl fullWidth>
                    <InputLabel id="library">Library</InputLabel>
                    <Select
                        labelId="library"
                        label="Library"
                        defaultValue={model?.library ?? library}
                        onChange={handleChangeLibrary}
                    >
                        {libraries.map((e) => (
                            <MenuItem key={e.name} value={e.name}>
                                {e.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl fullWidth>
                    <InputLabel id="registry">Registry</InputLabel>
                    <Select
                        labelId="registry"
                        label="Registry"
                        defaultValue={model?.registryId ?? registry}
                        onChange={handleChangeRegistry}
                    >
                        {registries.map((e) => (
                            <MenuItem key={e.id} value={e.id}>
                                {e.name} / {e.baseUrl} / {e.username}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <div className="flex flex-row">
                    <div className="text-large ml-2 mr-auto w-[10vw] text-lg">
                        Model Files
                    </div>
                    <div className="text-large mr-2 ml-auto w-[10vw] text-lg">
                        {file?.name}
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
                <FormControl>
                    <FormLabel id="model-type-radio-buttons">
                        Model Device Type
                    </FormLabel>
                    <RadioGroup
                        row
                        aria-labelledby="model-type-radio-buttons"
                        name="radio-buttons-group"
                        value={deviceType}
                        onChange={handleDeviceTypeChange}
                    >
                        <FormControlLabel
                            value="cpu"
                            control={<Radio />}
                            label="CPU"
                        />
                        <FormControlLabel
                            value="gpu"
                            control={<Radio />}
                            label="GPU"
                        />
                    </RadioGroup>
                </FormControl>

                <TextField
                    label="Input Shape"
                    placeholder="(10,)"
                    inputRef={inputShapeRef}
                />
                <FormControl fullWidth>
                    <InputLabel id="input-data-type">
                        Input Data Type
                    </InputLabel>
                    <Select
                        labelId="input-data-type"
                        label="Input Data Type"
                        defaultValue={dataTypes[0]?.name}
                        inputRef={inputDataTypeRef}
                    >
                        {dataTypes.map((dataType) => (
                            <MenuItem key={dataType.name} value={dataType.name}>
                                {dataType.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <TextField
                    label="Output Shape"
                    placeholder="(1,)"
                    inputRef={outputShapeRef}
                />
                <FormControl fullWidth>
                    <InputLabel id="output-data-type">
                        Output Data Type
                    </InputLabel>
                    <Select
                        labelId="output-data-type"
                        label="Output Data Type"
                        defaultValue={dataTypes[0]?.name}
                        inputRef={outputDataTypeRef}
                    >
                        {dataTypes.map((dataType) => (
                            <MenuItem key={dataType.name} value={dataType.name}>
                                {dataType.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                {isUploading && <LinearProgress color="primary" />}
            </div>
        </ActionCard>
    );
};

export default CreateUpdateModelBase;
