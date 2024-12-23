const Checkbox: React.FC<CheckBox> = ({
  label,
  checked,
  onChange,
  value,
  type,
  name,
  labelClassName = "",
  inputClassName = "",
}) => {
  return (
    <div className="flex items-center mb-4">
      <input
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        id="default-checkbox"
        type={type}
        className={`${inputClassName} w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600`}
      />
      <label
        className={`${labelClassName} ms-1 text-sm font-medium text-gray-900 dark:text-gray-300`}
      >
        {label}
      </label>
    </div>
  );
};

export default Checkbox;
