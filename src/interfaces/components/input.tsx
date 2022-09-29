import { HTMLInputTypeAttribute } from "react";

export default interface IInputProps {
    title: string;
    type?: HTMLInputTypeAttribute;
    placholder?: string;
    helperText?: string;
    required?: boolean;
    defaultValue?: string;
    disabled?: boolean;
    fullWidth?: boolean;
    inputRef?: any;
}
