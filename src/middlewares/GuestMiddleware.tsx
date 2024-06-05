import { Navigate, Outlet } from "react-router-dom";

const GuestMiddleware = () => {
  const cookie = document.cookie;
  return cookie.includes("isLogin") ? <Navigate to={"/"} /> : <Outlet />;
};

export default GuestMiddleware;
