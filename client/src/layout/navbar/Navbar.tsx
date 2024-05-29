/* eslint-disable react-refresh/only-export-components */
import { Box, useMediaQuery } from "@mui/material";
import { useStore } from "../../stores/store";
import { observer } from "mobx-react-lite";
import DefaultNavbar from "./DefaultNavbar";
import MobileNavbar from "./MobileNavbar";

const Navbar = () => {
  // const theme = useTheme();

  const {
    categoriesStore: { setCategory },
  } = useStore();

  const isMobile = useMediaQuery("(max-width:900px)");

  return (
    <Box zIndex={10} position="relative">
      {isMobile ? (
        <MobileNavbar setCategory={setCategory} />
      ) : (
        <DefaultNavbar setCategory={setCategory} />
      )}
    </Box>
  );
};
export default observer(Navbar);
