import { Box, Divider, Typography } from "@mui/material";
import { useState } from "react";
import { router } from "../Routes";
import CartIcon from "./CartIcon";
import LikedIcon from "./LikedIcon";
import ProfileIcon from "./ProfileIcon";
import Searchbar from "./Searchbar";
import Sticky from "react-sticky-el";
import FlexBetween from "../../reusable/FlexBetween";
import { AppsRounded, ExpandMoreOutlined } from "@mui/icons-material";
import NavbarCategoryOption from "../../reusable/NavbarCategoryOption";
import { Category } from "../../models/Item";

type Props = {
  setCategory: (category: Category) => void;
};

const DefaultNavbar = ({ setCategory }: Props) => {
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);

  return (
    <Sticky>
      {/* UPPER NAVBAR */}
      <Box
        display="flex"
        alignItems="center"
        gap="2rem"
        padding="0.5rem 4rem"
        justifyContent="space-between"
        bgcolor="white"
      >
        <Typography
          variant="h3"
          fontWeight="500"
          color="primary.main"
          margin="0 4rem"
          onClick={() => router.navigate("/")}
          sx={{ cursor: "pointer" }}
        >
          ORTOHALL
        </Typography>
        <Searchbar />
        <Box
          display="flex"
          justifyContent="center"
          gap="0.5rem"
          alignItems="center"
        >
          <LikedIcon />
          <Divider orientation="vertical" sx={{ height: "1rem" }} />
          <ProfileIcon />
          <Divider orientation="vertical" sx={{ height: "1rem" }} />
          <CartIcon />
        </Box>
      </Box>

      {/* BOTTOM NAVBAR */}
      <Box
        bgcolor="primary.main"
        display="flex"
        alignItems="center"
        gap="2rem"
        padding="1rem 4rem"
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
          <AppsRounded sx={{ color: "primary.light", fontSize: "1.5rem" }} />
          <Typography>Categories</Typography>
          <ExpandMoreOutlined
            sx={{ color: "primary.light", fontSize: "0.9rem" }}
          />
          {isCategoriesOpen && (
            <Box position="absolute" top="2.5rem">
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
    </Sticky>
  );
};

export default DefaultNavbar;
