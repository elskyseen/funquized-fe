import { useEffect, useState } from "react";
import {
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { axiosInstance } from "../configs/axios";
import AppLayout from "../layouts/AppLayout";
import { IChallenge } from "../interfaces";
import Spiner from "../components/Spiner";
import { useMutation } from "@tanstack/react-query";
import ResultModal from "../components/Modal/ResultModal";
import AlertModal from "../components/Modal/AlertModal";
import BackButton from "../components/Button/BackButton";
import Title from "../components/Title/Title";

const Challenge = () => {
  const { categorie, level } = useParams<{
    categorie: string;
    level: string;
  }>();
  const [challenge, setChallenge] = useState<IChallenge>();
  const { state } = useLocation();
  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const navigate = useNavigate();
  const [answer, setAnswer] = useState<String>("");

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

  const postAnswer = async () => {
    try {
      const { data } = await axiosInstance.post("/challenges", {
        level,
        categorie,
        answer,
      });
      return data.data;
    } catch (error) {
      console.log(error);
    }
  };

  const { data, mutate, isPending } = useMutation({
    mutationKey: ["postAnswer"],
    mutationFn: postAnswer,
  });

  const handleShowModal = () => {
    setIsShowModal(!isShowModal);
  };

  const handleBackToPrevPage = () => {
    navigate(state.prevPath);
  };

  const handleAnswer = (choice: string) => {
    setAnswer(choice);
    mutate();
  };

  if (state === null) {
    return <Navigate to={"/"} />;
  }

  if (!isPending && answer !== "") {
    setTimeout(() => {
      navigate(state.prevPath);
    }, 5000);
  }

  return (
    <AppLayout>
      <AlertModal
        text={"are you sure, to leave from this challenge?"}
        isCancel={handleShowModal}
        isRedirect={handleBackToPrevPage}
        isShow={isShowModal}
      />
      <ResultModal isShow={!isPending && answer !== ""} data={data} />
      <div className="flex flex-col mt-16 mb:4 lg:my-16 items-center gap-4 relative px-4 lg:px-28">
        <BackButton isRedirect={handleShowModal} />
        <Title text={`${categorie} challenge`} />
        <p className="text-lg text-white capitalize font-extrabold -translate-y-9 lg:translate-y-0">
          level {level}
        </p>
      </div>
      <div className="flex justify-center items-center flex-col gap-10 px-4">
        <h1 className="text-xl lg:text-4xl font-semibold text-white text-center w-full max-w-[800px]">
          {challenge?.question}
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8">
          {challenge?.choices.map((choice, index) => {
            return (
              <button
                className="col-span-1 w-full flex items-center justify-center bg-primary rounded border-2 border-white px-40 py-4 cursor-pointer text-xl capitalize text-white font-semibold relative"
                key={index}
                onClick={() => handleAnswer(choice)}
                disabled={isPending}
              >
                {choice}
                {choice === answer && isPending && <Spiner />}
              </button>
            );
          })}
        </div>
      </div>
    </AppLayout>
  );
};

export default Challenge;
