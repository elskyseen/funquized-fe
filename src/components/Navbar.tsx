import React from "react";
import userIcon from "../assets/user_icon.svg";
import { INavbar } from "../interfaces";
import powerOffIcon from "../assets/power-off_icon.svg";
import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../configs/axios";
import { useNavigate } from "react-router-dom";
import Spiner from "./Spiner";

const Navbar: React.FC<INavbar> = ({ image_url, username, point }) => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      const result = await axiosInstance.delete("/logout", {
        data: { username },
      });
      window.localStorage.clear();
      return result.status === 200 && navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  const { mutate, isPending } = useMutation({
    mutationKey: ["logout"],
    mutationFn: handleLogout,
  });

  return (
    <nav className="px-10 py-3 bg-primary flex justify-between text-white font-extrabold fixed top-0 left-0 w-full">
      <div className="flex items-center gap-3">
        <img
          src={image_url ? image_url : userIcon}
          alt="profile"
          className="max-w-12 border-2 border-white rounded-lg"
        />
        <div>
          <h1>{username}</h1>
          <p>{point} point</p>
        </div>
      </div>
      <div className="flex justify-center items-center">
        {isPending ? (
          <Spiner />
        ) : (
          <button onClick={() => mutate()}>
            <img src={powerOffIcon} alt="icon" className="w-7" />
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
