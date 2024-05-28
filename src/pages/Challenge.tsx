import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../configs/axios";
import AppLayout from "../layouts/AppLayout";
import { IChallenge } from "../interfaces";

const Challenge = () => {
  const { categorie, level } = useParams<{
    categorie: string;
    level: string;
  }>();
  const [challenge, setChallenge] = useState<IChallenge>();

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

  return (
    <AppLayout>
      <div className="flex flex-col mb-16 items-center gap-4">
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
