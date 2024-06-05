import React from "react";
import ModalLayout from "../../layouts/ModalLayout";
import ResultTitle from "../Title/ResultTitle";
import Redirect from "../Redirect";
import checkIcon from "../../assets/check_icon.svg";
import xmarkIcon from "../../assets/xmark-icon.svg";
import { IResult } from "../../interfaces";

const ResultModal: React.FC<{ data: IResult; isShow: boolean }> = ({
  data,
  isShow,
}) => {
  return (
    <ModalLayout isShow={isShow}>
      <h1 className="px-14 lg:px-60 text-4xl font-extrabold text-primary mb-4">
        {data?.current_level}
      </h1>
      <ResultTitle title="your answer" answer={data?.answer_user} />
      <ResultTitle title="answer" answer={data?.answer} />
      <div className="flex justify-end mt-16 mb-8">
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center gap-2">
            <img src={data?.is_correct ? checkIcon : xmarkIcon} alt="icon" />
            <p className="text-xl lg:text-3xl font-extrabold text-primary">
              {data?.is_correct ? "passed" : "failed"}
            </p>
          </div>
          <hr className="min-w-full h-2 bg-primary rounded-full" />
          <p className="text-sm lg:text-base font-extrabold text-primary">
            earn {data?.earn_point} point
          </p>
        </div>
      </div>
      <div className="flex justify-center text-primary">
        <Redirect />
      </div>
    </ModalLayout>
  );
};

export default ResultModal;
