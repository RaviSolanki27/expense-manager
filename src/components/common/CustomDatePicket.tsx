// src/components/common/CustomDatePicker.tsx
import { FieldProps } from 'formik';
import { InputHTMLAttributes } from 'react';

interface CustomDatePickerProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  errorText?: string;
  containerClassName?: string;
  labelClassName?: string;
  inputClassName?: string;
  errorClassName?: string;
  required?: boolean;
  id?: string;
}

const CustomDatePicker = ({
  label,
  errorText,
  containerClassName = '',
  labelClassName = 'block text-sm font-medium text-gray-700 mb-1',
  inputClassName = '',
  errorClassName = 'mt-1 text-sm text-red-600',
  required = false,
  id,
  ...inputProps
}: CustomDatePickerProps) => {
  const inputId = id || `date-${label?.replace(/\s+/g, '-').toLowerCase()}`;

  return (
    <div className={`mb-4 ${containerClassName}`}>
      {label && (
        <label htmlFor={inputId} className={labelClassName}>
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        <input
          type="date"
          id={inputId}
          className={`
            w-full px-3 py-2 border rounded-md
            focus:outline-none focus:ring-1 focus:ring-blue-500
            ${errorText ? 'border-red-500' : 'border-gray-300'}
            ${inputClassName}
            text-gray-700
          `}
          aria-invalid={!!errorText}
          aria-required={required}
          {...inputProps}
        />
      </div>
      {errorText && <div className={errorClassName}>{errorText}</div>}
    </div>
  );
};

// Formik Field wrapper
const FormikDatePicker = ({ 
  field, 
  form: { touched, errors }, 
  label, 
  ...props 
}: FieldProps & { label: string }) => {
  const error = touched[field.name] ? errors[field.name] : undefined;
  const errorText = error ? String(
    Array.isArray(error) 
      ? error[0]
      : typeof error === 'object' && error !== null
        ? Object.values(error)[0]
        : error
  ) : undefined;

  return (
    <CustomDatePicker
      {...field}
      {...props}
      label={label}
      errorText={errorText}
    />
  );
};

export { CustomDatePicker as default, FormikDatePicker };