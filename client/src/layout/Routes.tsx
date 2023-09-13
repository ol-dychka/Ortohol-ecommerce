import { RouteObject } from "react-router";
import App from "./App";
import { createBrowserRouter } from "react-router-dom";
import ItemsDashboard from "./itemsDashboard/ItemsDashboard";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    children: [{ path: "/", element: <ItemsDashboard /> }],
  },
];

export const router = createBrowserRouter(routes);
