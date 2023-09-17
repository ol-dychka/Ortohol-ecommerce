import { Box, Button, Typography } from "@mui/material";
import { router } from "../Routes";

const Success = () => {
  return (
    <Box>
      <Box textAlign="center">
        <Typography variant="h2">Sorry! Payment Failed!</Typography>
      </Box>
      <Box display="flex" justifyContent="center">
        <Button onClick={() => router.navigate("/")}>Back to Main Page</Button>
      </Box>
    </Box>
  );
};
export default Success;
