import { forwardRef } from "react";

const Input = forwardRef(({
  label,
  error,
  helperText,
  containerClassName = "",
  labelClassName = "",
  inputClassName = "",
  ...props
}, ref) => {
  const baseInputClasses = "block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#AE2828] focus:border-[#AE2828] sm:text-sm";

  const errorClasses = error ? "border-red-300 focus:ring-red-500 focus:border-red-500" : "";

  const inputClasses = `${baseInputClasses} ${errorClasses} ${inputClassName}`;

  return (
    <div className={`mb-4 ${containerClassName}`}>
      {label && (
        <label className={`block text-sm font-medium text-gray-700 mb-1 ${labelClassName}`}>
          {label}
        </label>
      )}
      <input
        ref={ref}
        className={inputClasses}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
      {helperText && !error && (
        <p className="mt-1 text-sm text-gray-500">{helperText}</p>
      )}
    </div>
  );
});

Input.displayName = "Input";

export default Input;
