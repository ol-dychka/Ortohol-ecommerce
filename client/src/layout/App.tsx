/* eslint-disable react-refresh/only-export-components */
import { Box, CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { Outlet } from "react-router-dom";
import Navbar from "./navbar/Navbar";
import { themeSettings } from "../theme";
import Footer from "./Footer";
import CartMenu from "./cart/CartMenu";
import ModalContainer from "../reusable/ModalContainer";
import { useStore } from "../stores/store";
import { useEffect } from "react";
import { observer } from "mobx-react-lite";

function App() {
  const {
    userStore: { token, getUser, appLoaded, setAppLoaded },
    itemStore: { getLiked },
  } = useStore();

  const theme = createTheme(themeSettings());

  useEffect(() => {
    if (token) {
      getUser().finally(() => setAppLoaded());
      getLiked();
    } else {
      setAppLoaded();
    }
  }, [token, getUser, getLiked, appLoaded, setAppLoaded]);

  if (!appLoaded) return <Box>loading...</Box>;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ModalContainer />
      <Navbar />
      <Box padding="2rem 3rem">
        <Outlet />
      </Box>
      <CartMenu />
      <Footer />
    </ThemeProvider>
  );
}

export default observer(App);
