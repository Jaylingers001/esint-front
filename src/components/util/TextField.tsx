import React, {KeyboardEventHandler} from "react";
import {FieldInputProps, FieldMetaState} from "react-final-form";
import InputChangeUtil from "./InputChangeUtil";

interface TextFieldProps {
    input: FieldInputProps<string | number>;
    meta: FieldMetaState<string | number>;
    type?: string;
    placeholder: string;
    required?: boolean;
    maxLength?: number;
    minLength?: number;
    className?: string;
    onKeyUp?: KeyboardEventHandler | undefined;
    pattern?: string;
    id?: string;
    title?: string;
    max?: number;
    dataCy?: string;
    disabled?: boolean;
    min?: number;
}

const TextFields: React.FC<TextFieldProps> = (props) => {
    const handleEvent = () => {
        props.input.onChange(InputChangeUtil().changeKanaAndHalfWidth(props.input.value.toString()));
    }

    return (
        <input className={props.className}
               type={props.type ?? "text"}
               min={props.min ?? '0'}
               placeholder={props.placeholder}
               maxLength={props.maxLength}
               minLength={props.minLength}
               required={props.required}
               onKeyUp={props.onKeyUp}
               pattern={props.pattern}
               id={props.id}
               title={props.title}
               {...props.input}
               onBlur={event => handleEvent()}
               max={props.max}
               data-cy={props.dataCy}
               disabled={props.disabled}
        />
    )
}

TextFields.defaultProps = {
    className: 'form-box__input --left'
}
export default TextFields;
