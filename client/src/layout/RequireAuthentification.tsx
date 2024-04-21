/* eslint-disable react-refresh/only-export-components */
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { useStore } from "../stores/store";

const RequireAuthentication = () => {
  const {
    userStore: { isLoggedIn },
  } = useStore();

  const location = useLocation();

  if (!isLoggedIn) return <Navigate to="/" state={{ from: location }} />;
  return <Outlet />;
};

export default observer(RequireAuthentication);
