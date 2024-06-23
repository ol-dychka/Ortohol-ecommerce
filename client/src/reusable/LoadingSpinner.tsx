import { Box, CircularProgress } from "@mui/material";

const LoadingSpinner = () => {
  return (
    <Box display="flex" justifyContent="center" padding="2rem">
      <CircularProgress />
    </Box>
  );
};

export default LoadingSpinner;
