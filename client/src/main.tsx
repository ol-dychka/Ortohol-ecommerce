import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "react-image-gallery/styles/css/image-gallery.css";
import { StoreContext, store } from "./stores/store.ts";
import { router } from "./layout/Routes.tsx";
import { RouterProvider } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <StoreContext.Provider value={store}>
      <RouterProvider router={router} />
    </StoreContext.Provider>
  </React.StrictMode>
);
