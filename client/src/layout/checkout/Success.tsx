import { Box, Button, Typography } from "@mui/material";
import { router } from "../Routes";
import { useStore } from "../../stores/store";

const Success = () => {
  const {
    itemStore: { emptyCart },
  } = useStore();

  return (
    <Box>
      <Box textAlign="center">
        <Typography variant="h2">Sucess!</Typography>
      </Box>
      <Box display="flex" justifyContent="center">
        <Button onClick={() => router.navigate("/").then(() => emptyCart())}>
          Back to Shopping
        </Button>
      </Box>
    </Box>
  );
};
export default Success;
