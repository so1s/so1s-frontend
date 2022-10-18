import {
    NavigateFunction,
    NavigateOptions,
    To,
    useNavigate,
} from 'react-router-dom';

export const useNavigator = (
    a: To | number,
    b?: NavigateOptions
): React.MouseEventHandler => {
    const navigate: NavigateFunction = useNavigate();

    const clickHandler = () => {
        navigate(a as any, b);
    };

    return clickHandler;
};
