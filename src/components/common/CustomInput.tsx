import React from 'react';

interface CustomInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    errorText?: string;
    containerClassName?: string;
    labelClassName?: string;
    inputClassName?: string;
    errorClassName?: string;
    required?: boolean;
}

const CustomInput: React.FC<CustomInputProps> = ({
    label,
    errorText,
    containerClassName = '',
    labelClassName = '',
    inputClassName = '',
    errorClassName = '',
    required = false,
    id,
    ...inputProps
}) => {
    // Generate a unique ID if not provided
    const inputId = id || `input-${label?.replace(/\s+/g, '-').toLowerCase()}`;

    return (
        <div className={`input-container ${containerClassName}`}>
            {label && (
                <label 
                    htmlFor={inputId} 
                    className={`input-label ${labelClassName}`}
                >
                    {label}
                    {required && <span className="required-indicator">*</span>}
                </label>
            )}
            <input
                id={inputId}
                className={`input-field ${inputClassName} ${errorText ? 'input-error' : ''}`}
                {...inputProps}
            />
            {errorText && (
                <span className={`error-text ${errorClassName}`}>
                    {errorText}
                </span>
            )}
        </div>
    );
};

export default CustomInput;