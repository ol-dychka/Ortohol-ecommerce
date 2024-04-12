import { Box, CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { Outlet } from "react-router";
import Navbar from "./navbar/Navbar";
import { themeSettings } from "../theme";
import Footer from "./Footer";
import CartMenu from "./cart/CartMenu";
import ModalContainer from "../reusable/ModalContainer";
import { useStore } from "../stores/store";
import { useEffect } from "react";

function App() {
  const {
    userStore: { token, getUser },
  } = useStore();

  const theme = createTheme(themeSettings());

  useEffect(() => {
    if (token) {
      getUser();
    }
  }, [token, getUser]);

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

export default App;
