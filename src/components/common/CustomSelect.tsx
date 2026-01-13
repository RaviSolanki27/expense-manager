// src/components/common/CustomSelect.tsx
import { FieldProps } from 'formik';
import { SelectHTMLAttributes } from 'react';

interface CustomSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  errorText?: string;
  containerClassName?: string;
  labelClassName?: string;
  selectClassName?: string;
  errorClassName?: string;
  required?: boolean;
  id?: string;
  options: Array<{ value: string | number; label: string }>;
}

const CustomSelect = ({
  label,
  errorText,
  containerClassName = '',
  labelClassName = 'block text-sm font-medium text-gray-700 mb-1',
  selectClassName = '',
  errorClassName = 'mt-1 text-sm text-red-600',
  required = false,
  id,
  options,
  value,
  onChange,
  ...selectProps
}: CustomSelectProps) => {
  const selectId = id || `select-${label?.replace(/\s+/g, '-').toLowerCase()}`;

  return (
    <div className={`mb-4 ${containerClassName}`}>
      {label && (
        <label htmlFor={selectId} className={labelClassName}>
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <select
        id={selectId}
        className={`
          w-full px-3 py-2 border rounded-md text-gray-600 placeholder-gray-400
          focus:outline-none focus:ring-1 focus:ring-blue-500
          ${errorText ? 'border-red-500' : 'border-gray-300'}
          ${selectClassName}
        `}
        aria-invalid={!!errorText}
        aria-required={required}
        onChange={onChange}
        value={value}
        {...selectProps}
      >
        <option value="" className="text-gray-300">Select an option</option>
        {options.map((option) => (
          <option key={option.value} value={option.value} className="text-gray-700">
            {option.label}
          </option>
        ))}
      </select>
      {errorText && <div className={errorClassName}>{errorText}</div>}
    </div>
  );
};

// Formik Field wrapper
const FormikSelect = ({ 
  field, 
  form: { touched, errors }, 
  label, 
  options,
  ...props 
}: FieldProps & { label: string; options: Array<{ value: string | number; label: string }> }) => {
  const error = touched[field.name] ? errors[field.name] : undefined;
  const errorText = error ? String(
    Array.isArray(error) 
      ? error[0]
      : typeof error === 'object' && error !== null
        ? Object.values(error)[0]
        : error
  ) : undefined;

  return (
    <CustomSelect
      {...field}
      {...props}
      label={label}
      options={options}
      errorText={errorText}
      value={field.value}
      onChange={field.onChange}
    />
  );
};

export { CustomSelect as default, FormikSelect };