import { Box, IconButton } from "@mui/material";
import {
  CallRounded,
  CloseOutlined,
  ContactSupportOutlined,
} from "@mui/icons-material";
import { useState } from "react";

const MessageWidget = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Box display="flex" flexDirection="column" gap="1rem">
      {isOpen && (
        <>
          <IconButton
            sx={{
              bgcolor: "#59267c",
              color: "primary.contrastText",
              "&:hover": {
                bgcolor: "#6a378d",
              },
            }}
          >
            <img src="viber-icon.svg" alt="viber" width="32px" height="40px" />
          </IconButton>

          <IconButton
            sx={{
              bgcolor: "#28D146",
              color: "primary.contrastText",
              "&:hover": {
                bgcolor: "#39e257",
              },
            }}
          >
            <CallRounded sx={{ fontSize: "2rem", margin: "0.25rem" }} />
          </IconButton>
        </>
      )}
      <IconButton
        sx={{
          bgcolor: "primary.main",
          color: "primary.contrastText",
          "&:hover": {
            bgcolor: "primary.light",
          },
        }}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <CloseOutlined sx={{ fontSize: "2rem", margin: "0.25rem" }} />
        ) : (
          <ContactSupportOutlined
            sx={{ fontSize: "2rem", margin: "0.25rem" }}
          />
        )}
      </IconButton>
    </Box>
  );
};
export default MessageWidget;
