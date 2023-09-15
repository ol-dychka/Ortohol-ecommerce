import { RouteObject } from "react-router";
import App from "./App";
import { createBrowserRouter } from "react-router-dom";
import ItemsDashboard from "./itemsDashboard/ItemsDashboard";
import ItemPage from "./itemPage/ItemPage";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <ItemsDashboard /> },
      { path: "/items/:id", element: <ItemPage /> },
    ],
  },
];

export const router = createBrowserRouter(routes);
