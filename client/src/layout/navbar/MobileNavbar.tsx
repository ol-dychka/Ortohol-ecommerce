import { useState } from "react";
import { Category } from "../../models/Item";
import { Box, Divider, IconButton, Typography } from "@mui/material";
import Sticky from "react-sticky-el";
import {
  AppsRounded,
  CloseOutlined,
  ExpandLessOutlined,
  ExpandMoreOutlined,
  MenuOutlined,
} from "@mui/icons-material";
import { router } from "../Routes";
import CartIcon from "./CartIcon";
import Searchbar from "./Searchbar";
import LikedIcon from "./LikedIcon";
import FlexBetween from "../../reusable/FlexBetween";

type Props = {
  setCategory: (category: Category) => void;
};

const MobileNavbar = ({ setCategory }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);

  const handleNavigate = (destination: string) => {
    router.navigate(destination).then(() => setIsOpen(false));
  };

  return (
    <Box>
      {/* MOBILE MENU */}
      <Box
        display={isOpen ? "block" : "none"}
        bgcolor="rgba(0, 0, 0, 0.4)"
        position="fixed"
        zIndex={10}
        width="100%"
        height="100%"
        left="0"
        top="0"
        overflow="auto"
      >
        <Box
          position="fixed"
          left="0"
          bottom="0"
          width="max(320px, 30%)"
          height="100%"
          bgcolor="primary.main"
          padding="1rem 2rem"
          sx={{
            "& .MuiTypography-root": {
              color: "primary.contrastText",
              fontSize: "0.9rem",
              fontWeight: "700",
              marginTop: "1rem",
              marginBottom: "1rem",
            },
            "&:hover > .MuiTypography-root": {
              cursor: "pointer",
            },
          }}
        >
          <FlexBetween>
            <Typography>Menu</Typography>
            <IconButton onClick={() => setIsOpen(false)}>
              <CloseOutlined sx={{ color: "secondary.light" }} />
            </IconButton>
          </FlexBetween>
          <Box
            display="flex"
            alignItems="center"
            gap="1rem"
            onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
          >
            <AppsRounded sx={{ color: "primary.light", fontSize: "1.5rem" }} />
            <Typography>Categories</Typography>
            {isCategoriesOpen ? (
              <ExpandLessOutlined
                sx={{ color: "primary.light", fontSize: "0.9rem" }}
              />
            ) : (
              <ExpandMoreOutlined
                sx={{ color: "primary.light", fontSize: "0.9rem" }}
              />
            )}
          </Box>
          <Divider sx={{ bgcolor: "secondary.light" }} />

          {/* CATEGORY MENU */}
          {isCategoriesOpen ? (
            <>
              {Object.entries(Category).map(([key, category]) => (
                <Typography
                  key={key}
                  onClick={() =>
                    router
                      .navigate("/categories")
                      .then(() => setCategory(category))
                      .then(() => setIsOpen(false))
                  }
                >
                  {category}
                </Typography>
              ))}
            </>
          ) : (
            <>
              <Typography onClick={() => handleNavigate("/")}>Main</Typography>
              <Typography onClick={() => handleNavigate("/customer-info")}>
                Customer Information
              </Typography>
              <Typography onClick={() => handleNavigate("/contact")}>
                Contact
              </Typography>
              <Typography onClick={() => handleNavigate("/map")}>
                Map
              </Typography>
            </>
          )}
        </Box>
      </Box>

      {/* BOTTOM NAVBAR */}
      <Sticky>
        <Box
          bgcolor="primary.main"
          display="flex"
          alignItems="center"
          justifyContent="space-evenly"
          gap="1rem"
          padding="1.5rem 4rem"
          sx={{
            "& .MuiTypography-root": {
              color: "primary.contrastText",
              fontSize: "0.9rem",
              fontWeight: "700",
            },
          }}
          flexWrap="wrap"
        >
          <IconButton
            sx={{
              color: "primary.contrastText",
            }}
            onClick={() => setIsOpen(true)}
          >
            <MenuOutlined />
          </IconButton>
          <LikedIcon />
          <CartIcon />
          <Searchbar />
        </Box>
      </Sticky>
    </Box>
  );
};

export default MobileNavbar;
