import { Box, CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { Outlet } from "react-router";
import Navbar from "./Navbar";
import { themeSettings } from "../theme";
import Footer from "./Footer";
import CartMenu from "./CartMenu";

function App() {
  const theme = createTheme(themeSettings());

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar />
      <Box padding="0 3rem">
        <Outlet />
      </Box>
      <CartMenu />
      <Footer />
    </ThemeProvider>
  );
}

export default App;
