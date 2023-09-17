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
  AppsOutlined,
  FavoriteBorderOutlined,
  MenuOutlined,
  PersonOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
} from "@mui/icons-material";
import Sticky from "react-sticky-el";
import StyledBadge from "../reusable/StyledBadge";
import FlexBetween from "../reusable/FlexBetween";
import NavbarIconButton from "../reusable/NavbarIconButton";
import { useStore } from "../stores/store";
import { observer } from "mobx-react-lite";
import { router } from "./Routes";
import MobileMenu from "./navbarInfo/MobileMenu";
import { useState } from "react";

const Navbar = () => {
  const theme = useTheme();

  const {
    itemStore: { openCart, cart, wasOpened },
  } = useStore();

  const isMobile = useMediaQuery("(max-width:900px)");

  const [isOpen, setIsOpen] = useState(false);

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
            <Box
              bgcolor="secondary.main"
              width="100%"
              height="3rem"
              borderRadius="1.75rem"
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              padding="0 0.25rem"
            >
              <Typography ml="1rem" color="secondary.dark">
                Search
              </Typography>
              <IconButton
                sx={{
                  bgcolor: "primary.main",
                  "&:hover": {
                    bgcolor: "primary.light",
                  },
                  color: "primary.contrastText",
                }}
              >
                <SearchOutlined />
              </IconButton>
            </Box>
            <Divider orientation="vertical" sx={{ height: "1rem" }} />
            <StyledBadge badgeContent={3} color="secondary">
              <IconButton
                sx={{
                  border: `0.25rem ${theme.palette.primary.main} solid`,
                }}
              >
                <FavoriteBorderOutlined />
              </IconButton>
            </StyledBadge>
            <Divider orientation="vertical" sx={{ height: "1rem" }} />
            <IconButton
              sx={{
                border: `0.25rem ${theme.palette.primary.main} solid`,
              }}
            >
              <PersonOutlined />
            </IconButton>
            <Divider orientation="vertical" sx={{ height: "1rem" }} />
            <StyledBadge
              badgeContent={cart.length}
              color={wasOpened ? "secondary" : "error"}
            >
              <FlexBetween
                sx={{
                  border: `0.25rem ${theme.palette.primary.main} solid`,
                }}
                borderRadius="6rem"
                bgcolor="primary.main"
                gap="1rem"
              >
                <NavbarIconButton onClick={() => openCart(true)}>
                  <ShoppingCartOutlined />
                </NavbarIconButton>
                <Typography
                  mr="0.5rem"
                  color="primary.contrastText"
                  fontWeight="700"
                >
                  0.00 $
                </Typography>
              </FlexBetween>
            </StyledBadge>
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
            <Box
              bgcolor="primary.light"
              width="100%"
              height="3rem"
              borderRadius="1.75rem"
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              padding="0 0.25rem"
            >
              <Typography ml="1rem" color="secondary.dark">
                Search
              </Typography>
              <IconButton
                sx={{
                  bgcolor: "primary.contrastText",
                  "&:hover": {
                    bgcolor: "secondary.main",
                  },
                  color: "primary.main",
                }}
              >
                <SearchOutlined />
              </IconButton>
            </Box>
            <StyledBadge
              badgeContent={cart.length}
              color={wasOpened ? "secondary" : "error"}
            >
              <IconButton
                sx={{
                  color: "primary.contrastText",
                }}
                onClick={() => openCart(true)}
              >
                <ShoppingCartOutlined />
              </IconButton>
            </StyledBadge>
          </Box>
        ) : (
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
              "&:hover > .MuiTypography-root": {
                cursor: "pointer",
              },
            }}
          >
            <FlexBetween>
              <AppsOutlined sx={{ color: "primary.light" }} />
              <Typography>Categories</Typography>
            </FlexBetween>
            <Divider
              orientation="vertical"
              sx={{ height: "1rem", bgcolor: "primary.contrastText" }}
            />
            <Typography onClick={() => router.navigate("/")}>Main</Typography>
            <Typography>Our Goods</Typography>
            <Typography onClick={() => router.navigate("/customer-info")}>
              Customer Information
            </Typography>
            <Typography onClick={() => router.navigate("/contact")}>
              Contact
            </Typography>
            <Typography onClick={() => router.navigate("/map")}>Map</Typography>
          </Box>
        )}
      </Sticky>
    </Box>
  );
};
export default observer(Navbar);
