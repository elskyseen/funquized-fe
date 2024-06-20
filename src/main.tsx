import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { routes } from "./router/router";
import { QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import store from "./stores/store";
import { query } from "./configs/queryClient";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={query}>
        <RouterProvider router={routes} />
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>
);
