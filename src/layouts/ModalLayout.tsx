import React from "react";

const ModalLayout: React.FC<{ children: any; isShow: boolean }> = ({
  children,
  isShow,
}) => {
  return (
    <div
      className={
        (isShow ? "block" : "hidden") +
        " w-full min-h-dvh bg-white/40 absolute top-0 left-0 z-10 flex justify-center items-center backdrop-blur-md px-4"
      }
    >
      <div className="p-11 rounded-lg border-4 border-primary bg-white">
        {children}
      </div>
    </div>
  );
};

export default ModalLayout;
