import { Field } from "formik";
import React from "react";

interface IInput {
  icon: string;
  type: string;
  placeholder: string;
  name?: string;
  value?: string;
  isError?: string;
}

const Input: React.FC<IInput> = ({
  icon,
  type,
  placeholder,
  name,
  value,
  isError,
}) => {
  return (
    <div className="flex flex-col mb-4">
      <div className="flex mb-1">
        <img src={icon} alt="icon" className="bg-primary p-1 rounded-l" />
        <Field
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          className="w-full p-2 border-2 border-primary rounded-r text-primary placeholder:text-primary outline-none"
        />
      </div>
      {isError && <div className="text-red-500">{isError}</div>}
    </div>
  );
};

export default Input;
