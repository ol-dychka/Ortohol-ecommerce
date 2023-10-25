import { Box, Typography } from "@mui/material";

type Props = {
  action: () => void;
  text: string;
  isActive: boolean;
};
const CategoryButton = ({ action, text, isActive }: Props) => {
  return (
    <Box
      sx={{
        "&:hover": {
          cursor: "pointer",
          "& .MuiTypography-root": {
            color: "#000",
          },
        },
      }}
      color={isActive ? "#000" : "secondary.dark"}
      onClick={action}
      width="300px"
      padding="1rem"
    >
      <Typography fontWeight={isActive ? "700" : "400"}>{text}</Typography>
    </Box>
  );
};
export default CategoryButton;
