/* eslint-disable react-refresh/only-export-components */
import {
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  useTheme,
} from "@mui/material";
import {
  Close,
  FavoriteBorderOutlined,
  FavoriteOutlined,
} from "@mui/icons-material";
import React from "react";
import { useStore } from "../../stores/store";
import { observer } from "mobx-react-lite";
import StyledBadge from "../../reusable/StyledBadge";
import FlexBetween from "../../reusable/FlexBetween";
import { router } from "../Routes";
import NavbarIconButton from "../../reusable/NavbarIconButton";

const LikedIcon = () => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const {
    userStore: { isLoggedIn },
    itemStore: { liked, likedLoading, setLiked },
  } = useStore();

  return (
    <div>
      <StyledBadge
        badgeContent={likedLoading ? 0 : liked.length}
        color="secondary"
      >
        <NavbarIconButton
          disabled={!isLoggedIn}
          sx={{
            border: `0.25rem ${theme.palette.primary.main} solid`,
          }}
          id="demo-positioned-button"
          aria-controls={open ? "demo-positioned-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          <FavoriteBorderOutlined />
        </NavbarIconButton>
      </StyledBadge>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <MenuItem
          onClick={handleClose}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <Close color="primary" />
        </MenuItem>
        <Divider />

        {liked.map((item) => (
          <MenuItem key={item.id}>
            <FlexBetween gap="1rem">
              <img
                src={item.images[0] || "/img-placeholder.png"}
                alt="img"
                width="40px"
              />
              <Typography
                fontWeight="700"
                onClick={() => router.navigate(`/items/${item.id}`)}
                width="10rem"
                noWrap
                sx={{
                  cursor: "pointer",
                  textAlign: "center",
                  ":hover": {
                    textDecoration: "underline",
                  },
                }}
              >
                {item.name}
              </Typography>
              <IconButton onClick={() => setLiked(item, true)}>
                <FavoriteOutlined color="primary" />
              </IconButton>
            </FlexBetween>
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default observer(LikedIcon);
