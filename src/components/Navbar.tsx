import React from "react";
import userIcon from "../assets/user_icon.svg";

interface INavbar {
  image: string;
  username: string;
  point: number;
}

const Navbar: React.FC<INavbar> = ({ image, username, point }) => {
  return (
    <nav className="px-10 py-3 bg-primary flex justify-between text-white font-extrabold">
      <div className="flex items-center gap-3">
        <img
          src={image ? image : userIcon}
          alt="profile"
          className="max-w-12 border-2 border-white rounded-lg"
        />
        <div>
          <h1>{username}</h1>
          <p>{point} point</p>
        </div>
      </div>
      <button>logout</button>
    </nav>
  );
};

export default Navbar;
