/* eslint-disable react-refresh/only-export-components */
import {
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  useTheme,
} from "@mui/material";
import { Close, PersonOutlined } from "@mui/icons-material";
import React from "react";
import { useStore } from "../../stores/store";
import { observer } from "mobx-react-lite";
import LoginForm from "../users/LoginForm";
import { router } from "../Routes";

const ProfileIcon = () => {
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
    userStore: { isLoggedIn, user, logout },
    modalStore: { openModal },
  } = useStore();

  return (
    <div>
      <IconButton
        sx={{
          border: `0.25rem ${theme.palette.primary.main} solid`,
        }}
        id="demo-positioned-button"
        aria-controls={open ? "demo-positioned-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <PersonOutlined />
      </IconButton>
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
        {isLoggedIn && (
          <MenuItem>
            <Typography fontWeight="bold">
              Logged in as {user?.displayName}
            </Typography>
          </MenuItem>
        )}
        <Divider />
        {isLoggedIn && (
          <MenuItem
            onClick={() => router.navigate("/orders").then(() => handleClose())}
          >
            <Typography fontWeight="bold">My Orders</Typography>
          </MenuItem>
        )}
        <Divider />
        {isLoggedIn && (
          <MenuItem
            onClick={() => {
              logout();
              handleClose();
            }}
          >
            <Typography color="primary" padding="0.5rem">
              Log Out
            </Typography>
          </MenuItem>
        )}
        {!isLoggedIn && (
          <MenuItem
            onClick={() => {
              openModal(<LoginForm />);
              handleClose();
            }}
          >
            <Typography color="primary" padding="0.5rem">
              Log In
            </Typography>
          </MenuItem>
        )}
      </Menu>
    </div>
  );
};

export default observer(ProfileIcon);
