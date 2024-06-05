import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../configs/axios";
import { Outlet, useLocation, useOutletContext } from "react-router-dom";
import { INavbar } from "../interfaces";
import App from "../pages/App";

const ValidProgresMiddleware = () => {
  const user: INavbar = useOutletContext();
  const { pathname } = useLocation();
  const categorie = pathname.split("/")[2];
  const level = pathname.split("/")[3];

  const getChallenge = async (
    level: string,
    categorie: string,
    username: string
  ) => {
    const { data } = await axiosInstance.get("/user_progres", {
      params: {
        level,
        categorie,
        username,
      },
    });
    return data;
  };

  const { data, isLoading } = useQuery({
    queryKey: ["getProgres"],
    queryFn: () => getChallenge(level, categorie, user.username),
  });

  if (!isLoading) {
    return data.valid_level ? <Outlet context={user} /> : <App />;
  }
};

export default ValidProgresMiddleware;
