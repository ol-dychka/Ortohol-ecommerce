import { Box, Typography } from "@mui/material";

type Props = {
  name: string;
  action: () => void;
};
const NavbarCategoryOption = ({ name, action }: Props) => {
  return (
    <Box
      bgcolor="primary.main"
      sx={{
        "&:hover": {
          backgroundColor: "primary.contrastText",
          cursor: "pointer",
          "& .MuiTypography-root": {
            color: "#000",
          },
        },
      }}
      color="primary.contrastText"
      onClick={action}
      width="300px"
      padding="1rem"
    >
      <Typography>{name}</Typography>
    </Box>
  );
};
export default NavbarCategoryOption;
