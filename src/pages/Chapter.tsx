import { Link, useParams } from "react-router-dom";
import AppLayout from "../layouts/AppLayout";
import { axiosInstance } from "../configs/axios";
import { useEffect, useState } from "react";
import { useAppSelector } from "../hooks/hooks";
import { AppState } from "../stores/store";
import { IChapter } from "../interfaces";
import lockIcon from "../assets/lock_icon.svg";
import BackButton from "../components/Button/BackButton";

const Chapters = () => {
  const { token } = useAppSelector((state: AppState) => state.token);
  const { categorie } = useParams();
  const [chapters, setChapters] = useState<IChapter[]>([]);
  const [progres, setProgres] = useState<{ current_level: number }>();

  useEffect(() => {
    getChapters();
  }, []);

  const getChapters = async () => {
    const { data } = await axiosInstance.get("/chapters", {
      headers: {
        Authorization: `Bearier ${token}`,
      },
      params: {
        categorie,
      },
    });
    setChapters(data.data);
    setProgres(data.progres);
  };

  return (
    <AppLayout>
      <div className="flex gap-10 relative px-28 mt-8">
        <BackButton link="/" />
        <h1 className="text-6xl text-white font-extrabold capitalize mb-10">
          {categorie} challenge
        </h1>
      </div>
      <div className="grid grid-cols-5 gap-12">
        {chapters.map(({ level, point }, index) => {
          return progres && level <= progres.current_level ? (
            <Link
              to={`/chapters/${categorie}/${level}`}
              state={{ prevPath: location.pathname }}
              key={index}
              className="col-span-1 p-4 flex flex-col justify-center items-center border-2 border-white rounded text-white font-extrabold"
            >
              <h1 className="text-4xl">{level}</h1>
              <p className="text-lg">{point} point</p>
            </Link>
          ) : (
            <div
              key={index}
              className="col-span-1 p-4 flex flex-col justify-center items-center border-2 border-white rounded text-white font-extrabold cursor-not-allowed"
            >
              <img src={lockIcon} alt="icon" className="w-16" />
            </div>
          );
        })}
      </div>
    </AppLayout>
  );
};

export default Chapters;
