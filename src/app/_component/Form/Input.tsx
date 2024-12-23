import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  labelClassName?: string;
  inputClassName?: string;
  required?: boolean;
  error?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      onChange,
      label,
      placeholder,
      type,
      className,
      labelClassName,
      inputClassName,
      required,
      error,
      ...rest
    },
    ref
  ) => {
    return (
      <div className={`${className} flex flex-col gap-1`}>
        {label && (
          <label
            className={`block mb-2 text-sm font-medium text-gray-900 ${labelClassName}`}
          >
            {label}
            {required && <span className="text-red-500"> *</span>}
          </label>
        )}
        <input
          autoComplete="off"
          ref={ref}
          type={type}
          className={`bg-gray-50 border ${
            error ? "border-red-500" : "border-gray-300"
          } text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 ${inputClassName}`}
          placeholder={placeholder}
          {...rest}
          onChange={onChange}
        />
        {error && <span className="text-red-500 text-sm">{error}</span>}
      </div>
    );
  }
);
Input.displayName = "Input";

export default Input;
