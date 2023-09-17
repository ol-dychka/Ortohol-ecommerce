import { RouteObject } from "react-router";
import App from "./App";
import { createBrowserRouter } from "react-router-dom";
import ItemsDashboard from "./itemsDashboard/ItemsDashboard";
import ItemPage from "./itemPage/ItemPage";
import Checkout from "./checkout/Checkout";
import Success from "./checkout/Success";
import Failure from "./checkout/Failure";
import Map from "./navbarInfo/Map";
import CustomerInformation from "./navbarInfo/CustomerInformation";
import Contact from "./navbarInfo/Contact";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <ItemsDashboard /> },
      { path: "/items/:id", element: <ItemPage /> },
      { path: "/checkout", element: <Checkout /> },
      { path: "/success", element: <Success /> },
      { path: "/failure", element: <Failure /> },
      { path: "/map", element: <Map /> },
      { path: "/customer-info", element: <CustomerInformation /> },
      { path: "/contact", element: <Contact /> },
    ],
  },
];

export const router = createBrowserRouter(routes);
