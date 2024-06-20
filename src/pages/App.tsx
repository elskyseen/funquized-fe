import Navbar from "../components/Navbar";
import { useAppSelector } from "../hooks/hooks";
import { AppState } from "../stores/store";
import { axiosInstance } from "../configs/axios";
import { useEffect, useState } from "react";
import { ICategorie, INavbar } from "../interfaces";
import { Link, useOutletContext } from "react-router-dom";
import Spiner from "../components/Spiner";

const App = () => {
  const { token } = useAppSelector((state: AppState) => state.token);
  const [categories, setCategories] = useState<ICategorie[]>([]);
  const user: INavbar = useOutletContext();
  const [isGetData, setIsGetData] = useState<boolean>(false);

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    setIsGetData(true);
    try {
      const { data } = await axiosInstance.get("/categories", {
        headers: {
          Authorization: `Bearier ${token}`,
        },
      });
      setCategories(data.data);
      setIsGetData(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar
        image_url={user.image_url}
        point={user.point}
        username={user.username}
      />
      {isGetData ? (
        <div className="w-full min-h-dvh flex justify-center items-center">
          <Spiner />
        </div>
      ) : (
        <div className="w-full min-h-full py-24 px-4 lg:px-12 grid grid-cols-3 lg:grid-cols-12 gap-4 font-extrabold text-primary">
          {categories.map(({ category_name, url_image, challenges, id }) => {
            return (
              <Link
                to={`/chapters/${category_name}`}
                key={id}
                className="col-span-3 flex flex-col justify-center items-center gap-4 rounded border-2 border-primary h-full pt-12 pb-2 px-[52px] text-center cursor-pointer"
              >
                <img src={url_image} alt="icon" className="max-w-36" />
                <h1 className="text-5xl capitalize">{category_name}</h1>
                <p className="text-lg">
                  earn{" "}
                  {challenges.reduce(
                    (total, question) => total + question.point,
                    0
                  )}{" "}
                  point when clear all chapter
                </p>
              </Link>
            );
          })}
        </div>
      )}
    </>
  );
};

export default App;
