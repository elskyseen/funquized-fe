import Navbar from "../components/Navbar";
import { useAppSelector } from "../hooks/hooks";
import { AppState } from "../stores/store";
import { axiosInstance } from "../configs/axios";
import { useEffect, useState } from "react";
import { ICategorie } from "../interfaces";

const App = () => {
  const { token } = useAppSelector((state: AppState) => state.token);
  const [categories, setCategories] = useState<ICategorie[]>([]);

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    try {
      const { data } = await axiosInstance.get("/categories", {
        headers: {
          Authorization: `Bearier ${token}`,
        },
      });
      setCategories(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar username="leo marselio" point={0} image="" />
      <div className="w-full min-h-full p-12 grid grid-cols-12 gap-4 font-extrabold text-primary">
        {categories.map(({ category_name, url_image, id }) => {
          return (
            <div
              key={id}
              className="col-span-3 flex flex-col justify-center items-center gap-4 rounded border-2 border-primary h-full pt-12 pb-2 px-[52px] text-center cursor-pointer"
            >
              <img src={url_image} alt="icon" className="max-w-36" />
              <h1 className="text-5xl capitalize">{category_name}</h1>
              <p className="text-lg">earn point when clear all chapter</p>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default App;
