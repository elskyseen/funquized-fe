import React from "react";

interface ICardCenterIcon {
  children?: any;
  icon: string;
  title?: string;
  isError?: string;
}

const CardCenterIcon: React.FC<ICardCenterIcon> = ({
  children,
  icon,
  title = "FunQuized",
  isError,
}) => {
  return (
    <div className="px-28 py-10 flex flex-col justify-center items-center rounded-2xl border-8 border-primary bg-white relative">
      <img
        src={icon}
        alt="icon"
        className="-translate-y-4"
      />
      <h1 className="text-5xl font-extrabold text-primary text-center mb-8 -translate-y-3">
        {title}
      </h1>
      {isError && (
        <div className="text-red-500 font-semibold text-center mb-2">
          {isError}
        </div>
      )}

      {children}
    </div>
  );
};

export default CardCenterIcon;
