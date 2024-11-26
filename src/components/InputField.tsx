import { FieldError } from "react-hook-form";

type InputFieldProps = {
  label: string;
  type?: string;
  register: any;
  as?: 'input' | 'textarea' | 'select';
  name: string;
  defaultValue?: string | number;
  error?: FieldError | FieldError[]; // Allow for multiple errors
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  containerClassName?: string; // Allow custom container styling
  isTextarea?: boolean; // Flag to toggle textarea
  options?: string[];
  productImage?: string; 
};

const InputField = ({
  label,
  type = "text",
  register,
  name,
  defaultValue,
  error,
  options = [],
  productImage,
  inputProps,
  as = 'input',
  containerClassName = "w-full md:w-1/4",
  isTextarea = false,
}: InputFieldProps) => {
  // Handle error messages
  const errorMessages = Array.isArray(error)
    ? error.map((err) => err.message).filter(Boolean)
    : [error?.message].filter(Boolean);

  return (
    <div className={`flex flex-col gap-2 ${containerClassName}`}>
      <label htmlFor={name} className="text-xs text-gray-500">
        {label}
      </label>
      {isTextarea ? (
        <textarea
          id={name}
          {...register(name)}
          className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full focus:ring-blue-500 focus:border-blue-500 focus:text-black"
          {...(inputProps as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
          defaultValue={defaultValue}
        />
      ) : (
        <input
          id={name}
          type={type}
          {...register(name)}
          className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full focus:ring-blue-500 focus:border-blue-500 focus:text-black"
          {...inputProps}
          defaultValue={defaultValue}
        />
      )}
      {errorMessages.length > 0 &&
        errorMessages.map((msg, index) => (
          <p key={index} className="text-xs text-red-400">
            {msg}
          </p>
        ))}
    </div>
  );
};

export default InputField;
