import { RouteObject } from "react-router-dom";
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
import CategoriesPage from "./categoriesPage/CategoriesPage";
import OrdersPage from "./ordersPage/OrdersPage";
import RequireAuthentification from "./RequireAuthentification";
import SearchPage from "./searchPage/SearchPage";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        element: <RequireAuthentification />,
        children: [
          { path: "/orders", element: <OrdersPage /> },
          { path: "/checkout", element: <Checkout /> },
          { path: "/success", element: <Success /> },
          { path: "/failure", element: <Failure /> },
        ],
      },
      { path: "/", element: <ItemsDashboard /> },
      { path: "/items/:id", element: <ItemPage /> },
      { path: "/map", element: <Map /> },
      { path: "/customer-info", element: <CustomerInformation /> },
      { path: "/contact", element: <Contact /> },
      { path: "/categories", element: <CategoriesPage /> },
      { path: "/search", element: <SearchPage /> },
    ],
  },
];

export const router = createBrowserRouter(routes);
