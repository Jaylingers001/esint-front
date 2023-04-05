import React, {KeyboardEventHandler} from "react";
import {FieldInputProps, FieldMetaState} from "react-final-form";
import InputChangeUtil from "./InputChangeUtil";

interface TextAreaProps {
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
    cols?: number;
    rows?: number;
}

const TextArea: React.FC<TextAreaProps> = (props) => {
    const handleEvent = () => {
        props.input.onChange(InputChangeUtil().changeKanaAndHalfWidth(props.input.value.toString()));
    }

    return (
        <textarea className={props.className}
                  type={props.type ?? "text"}
                  cols={props.cols}
                  placeholder={props.placeholder}
                  maxLength={props.maxLength}
                  minLength={props.minLength}
                  required={props.required}
                  onKeyUp={props.onKeyUp}
                  id={props.id}
                  title={props.title}
                  {...props.input}
                  onBlur={event => handleEvent()}
                  rows={props.rows}
                  data-cy={props.dataCy}
        />
    )
}

TextArea.defaultProps = {
    className: 'form-box__input --left'
}
export default TextArea;
