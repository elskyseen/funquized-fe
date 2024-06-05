import React from "react";
import ModalLayout from "../../layouts/ModalLayout";
import Button from "../Button";

interface IAlert {
  isShow: boolean;
  text: String;
  isCancel: () => void;
  isRedirect: () => void;
}

const AlertModal: React.FC<IAlert> = ({
  isShow,
  isCancel,
  isRedirect,
  text,
}) => {
  return (
    <ModalLayout isShow={isShow}>
      <h1 className="text-2xl text-primary font-semibold capitalize mb-10">
        {text}
      </h1>
      <div className="flex gap-20">
        <Button isPrimary={false} text="cancel" onClick={isCancel} />
        <Button text="leave" onClick={isRedirect} />
      </div>
    </ModalLayout>
  );
};

export default AlertModal;
