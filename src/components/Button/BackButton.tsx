import React from "react";

import backIcon from "../../assets/back_icon.svg";
import { useNavigate } from "react-router-dom";

const BackButton: React.FC<{ isRedirect?: () => void; link?: string }> = ({
  isRedirect,
  link,
}) => {
  const navigate = useNavigate();
  return (
    <button
      className="absolute -left-10 lg:left-0 top-2"
      onClick={!isRedirect ? () => navigate(link || "/") : isRedirect}
    >
      <img src={backIcon} alt="icon" className="w-10 lg:w-20" />
    </button>
  );
};

export default BackButton;
