import { SearchOutlined } from "@mui/icons-material";
import { Box, IconButton, InputBase } from "@mui/material";
import { useState } from "react";
import { router } from "../Routes";

const Searchbar = () => {
  const [searchWord, setSearchWord] = useState("");

  return (
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
      <InputBase
        placeholder="Search"
        fullWidth
        sx={{ marginLeft: "1rem", fontSize: 16 }}
        onChange={(e) => {
          if (e) setSearchWord(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") router.navigate(`/search/?s=${searchWord}`);
        }}
      />
      <IconButton
        sx={{
          bgcolor: "primary.main",
          "&:hover": {
            bgcolor: "primary.light",
          },
          color: "primary.contrastText",
        }}
        onClick={() => router.navigate(`/search/?s=${searchWord}`)}
        disabled={searchWord === ""}
      >
        <SearchOutlined />
      </IconButton>
    </Box>
  );
};

export default Searchbar;
