import React from "react";
import { IButton } from "../interfaces";

const Button: React.FC<IButton> = ({ isPrimary = true, text, type }) => {
  return (
    <button
      type={type}
      className={
        (isPrimary ? "bg-primary text-white" : "bg-white text-primary") +
        " w-full py-2 capitalize border-2 border-primary rounded font-extrabold mb-3 relative"
      }
    >
      <div className="flex justify-center items-center">{text}</div>
    </button>
  );
};

export default Button;
