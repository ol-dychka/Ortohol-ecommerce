import { Box, Typography, Divider, IconButton } from "@mui/material";
import FlexBetween from "../../reusable/FlexBetween";
import { AppsOutlined, CloseOutlined } from "@mui/icons-material";

type Props = {
  isOpen: boolean;
  handleNavigate: (destination: string) => void;
  close: () => void;
};
const MobileMenu = ({ isOpen, handleNavigate, close }: Props) => {
  return (
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
        width="max(400px, 30%)"
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
          <IconButton onClick={close}>
            <CloseOutlined sx={{ color: "secondary.light" }} />
          </IconButton>
        </FlexBetween>
        <Box display="flex" alignItems="center" gap="1rem">
          <AppsOutlined sx={{ color: "secondary.light" }} />
          <Typography>Categories</Typography>
        </Box>
        <Divider sx={{ bgcolor: "secondary.light" }} />
        <Typography onClick={() => handleNavigate("/")}>Main</Typography>
        <Typography>Our Goods</Typography>
        <Typography>Favorite</Typography>
        <Typography>Profile</Typography>
        <Typography onClick={() => handleNavigate("/customer-info")}>
          Customer Information
        </Typography>
        <Typography onClick={() => handleNavigate("/contact")}>
          Contact
        </Typography>
        <Typography onClick={() => handleNavigate("/map")}>Map</Typography>
      </Box>
    </Box>
  );
};
export default MobileMenu;
