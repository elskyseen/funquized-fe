import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import App from "../pages/App";
import Chapters from "../pages/Chapter";
import Challenge from "../pages/Challenge";
import AuthMiddleware from "../middlewares/AuthMiddleware";
import GuestMiddleware from "../middlewares/GuestMiddleware";
import ValidProgresMiddleware from "../middlewares/ValidProgresMiddleware";

export const routes = createBrowserRouter([
  {
    element: <AuthMiddleware />,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "/chapters/:categorie",
        element: <Chapters />,
      },
      {
        element: <ValidProgresMiddleware />,
        children: [
          {
            path: "/chapters/:categorie/:level",
            element: <Challenge />,
          },
        ],
      },
    ],
  },
  {
    element: <GuestMiddleware />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
]);
