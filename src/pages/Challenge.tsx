import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { axiosInstance } from "../configs/axios";
import AppLayout from "../layouts/AppLayout";
import backIcon from "../assets/back_icon.svg";
import { IChallenge } from "../interfaces";
import ModalLayout from "../layouts/ModalLayout";
import Button from "../components/Button";

const Challenge = () => {
  const { categorie, level } = useParams<{
    categorie: string;
    level: string;
  }>();
  const [challenge, setChallenge] = useState<IChallenge>();
  const { state } = useLocation();
  const [isShowModal, setIsShowModal] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    getChallenge();
  }, []);

  const getChallenge = async () => {
    try {
      const { data } = await axiosInstance.get("/challenges", {
        params: {
          level,
          categorie,
        },
      });
      setChallenge(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleShowModal = () => {
    setIsShowModal(!isShowModal);
  };

  const handleBackToPrevPage = () => {
    navigate(state.prevPath);
  };

  return (
    <AppLayout>
      <ModalLayout isShow={isShowModal}>
        <h1 className="text-2xl text-primary font-semibold capitalize mb-10">
          are you sure, to leave from this challenge?
        </h1>
        <div className="flex gap-20">
          <Button isPrimary={false} text="cancel" onClick={handleShowModal} />
          <Button text="leave" onClick={handleBackToPrevPage} />
        </div>
      </ModalLayout>
      <div className="flex flex-col my-16 items-center gap-4 relative px-28">
        <button className="absolute left-0 top-2" onClick={handleShowModal}>
          <img src={backIcon} alt="icon" className="w-20" />
        </button>
        <h1 className="text-6xl capitalize text-white font-extrabold">
          {categorie} challenge
        </h1>
        <p className="text-lg text-white capitalize font-extrabold">
          level {level}
        </p>
      </div>
      <div className="flex justify-center items-center flex-col gap-10">
        <h1 className="text-4xl font-semibold text-white text-center max-w-[800px]">
          {challenge?.question}
        </h1>
        <div className="grid grid-cols-2 gap-8">
          {challenge?.choices.map((choice, index) => {
            return (
              <div
                className="col-span-1 w-full flex items-center justify-center bg-primary rounded border-2 border-white px-40 py-4 cursor-pointer text-xl capitalize text-white font-semibold"
                key={index}
              >
                {choice}
              </div>
            );
          })}
        </div>
      </div>
    </AppLayout>
  );
};

export default Challenge;
