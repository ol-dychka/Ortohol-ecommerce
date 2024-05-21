/* eslint-disable react-refresh/only-export-components */
import {
  Box,
  Divider,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  AppsRounded,
  ExpandMoreOutlined,
  MenuOutlined,
} from "@mui/icons-material";
import Sticky from "react-sticky-el";
import FlexBetween from "../../reusable/FlexBetween";
import { useStore } from "../../stores/store";
import { observer } from "mobx-react-lite";
import { router } from "../Routes";
import MobileMenu from "../navbarInfo/MobileMenu";
import { useState } from "react";
import NavbarCategoryOption from "../../reusable/NavbarCategoryOption";
import { Category } from "../../models/Item";
import ProfileIcon from "./ProfileIcon";
import LikedIcon from "./LikedIcon";
import Searchbar from "./Searchbar";
import CartIcon from "./CartIcon";

const Navbar = () => {
  // const theme = useTheme();

  const {
    categoriesStore: { setCategory },
  } = useStore();

  const isMobile = useMediaQuery("(max-width:900px)");

  const [isOpen, setIsOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);

  const handleMobileMenuNavigate = (destination: string) => {
    router.navigate(destination).then(() => setIsOpen(false));
  };

  return (
    <Box zIndex={10} position="relative">
      <Box
        display="flex"
        alignItems="center"
        gap="0.5rem"
        padding="0 4rem"
        justifyContent={isMobile ? "center" : "left"}
      >
        <Typography
          variant={isMobile ? "h5" : "h3"}
          fontWeight="500"
          color="primary.main"
          margin={isMobile ? "1rem" : "2rem 4rem"}
          onClick={() => router.navigate("/")}
          sx={{ cursor: "pointer" }}
        >
          ORTOHALL
        </Typography>
        {!isMobile && (
          <>
            <Searchbar />
            <Divider orientation="vertical" sx={{ height: "1rem" }} />
            <LikedIcon />
            <Divider orientation="vertical" sx={{ height: "1rem" }} />
            <ProfileIcon />
            <Divider orientation="vertical" sx={{ height: "1rem" }} />
            <CartIcon />
          </>
        )}
      </Box>

      {/* MOBILE MENU */}
      {isMobile && (
        <MobileMenu
          isOpen={isOpen}
          handleNavigate={handleMobileMenuNavigate}
          close={() => setIsOpen(false)}
        />
      )}

      {/* BOTTOM NAVBAR */}
      <Sticky>
        {isMobile ? (
          <Box
            bgcolor="primary.main"
            display="flex"
            alignItems="center"
            gap="1rem"
            padding="1.5rem 4rem"
            sx={{
              "& .MuiTypography-root": {
                color: "primary.contrastText",
                fontSize: "0.9rem",
                fontWeight: "700",
              },
            }}
          >
            <IconButton
              sx={{
                color: "primary.contrastText",
              }}
              onClick={() => setIsOpen(true)}
            >
              <MenuOutlined />
            </IconButton>
            <Searchbar />
            <CartIcon />
          </Box>
        ) : (
          // PC view
          <Box
            bgcolor="primary.main"
            display="flex"
            alignItems="center"
            gap="2rem"
            padding="1.5rem 4rem"
            sx={{
              "& .MuiTypography-root": {
                color: "primary.contrastText",
                fontSize: "0.9rem",
                fontWeight: "700",
                // letterSpacing: "1px",
              },
              "&:hover .MuiTypography-root": {
                cursor: "pointer",
              },
            }}
            onMouseLeave={() => setIsCategoriesOpen(false)}
          >
            <FlexBetween
              gap="0.2rem"
              position="relative"
              onMouseEnter={() => setIsCategoriesOpen(true)}
            >
              <AppsRounded
                sx={{ color: "primary.light", fontSize: "1.5rem" }}
              />
              <Typography>Categories</Typography>
              <ExpandMoreOutlined
                sx={{ color: "primary.light", fontSize: "0.9rem" }}
              />
              {isCategoriesOpen && (
                <Box position="absolute" top="3rem">
                  <Box
                    display="flex"
                    flexDirection="column"
                    flexWrap="wrap"
                    maxHeight="550px"
                  >
                    {Object.entries(Category).map(([key, category]) => (
                      <NavbarCategoryOption
                        key={key}
                        name={category}
                        action={() =>
                          router
                            .navigate("/categories")
                            .then(() => setCategory(category))
                            .then(() => setIsCategoriesOpen(false))
                        }
                      />
                    ))}
                  </Box>
                </Box>
              )}
            </FlexBetween>
            <Divider
              orientation="vertical"
              sx={{ height: "1rem", bgcolor: "primary.light" }}
            />
            <Typography onClick={() => router.navigate("/")}>Home</Typography>
            {/* <Typography>Our Products</Typography> */}
            <Typography onClick={() => router.navigate("/customer-info")}>
              Customer Information
            </Typography>
            <Typography onClick={() => router.navigate("/contact")}>
              Our Contacts
            </Typography>
            <Typography onClick={() => router.navigate("/map")}>
              About Us
            </Typography>
          </Box>
        )}
      </Sticky>
    </Box>
  );
};
export default observer(Navbar);
