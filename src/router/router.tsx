import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import App from "../pages/App";
import Chapters from "../pages/Chapter";
import Challenge from "../pages/Challenge";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/chapters/:categorie",
    element: <Chapters />,
  },
  {
    path: "/chapters/:categorie/:level",
    element: <Challenge />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);
