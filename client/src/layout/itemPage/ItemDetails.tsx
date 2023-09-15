import { Box, Divider, Typography } from "@mui/material";

type Props = {
  details: string;
};
const ItemDetails = ({ details }: Props) => {
  const parsed = JSON.parse(details);
  return (
    <Box mt="2rem">
      {Object.entries(parsed).map(([key, value]) => {
        return (
          <Box
            display="flex"
            justifyContent="space-between"
            key={key}
            gap="1rem"
            mb="1rem"
          >
            <Typography variant="h5">{key}</Typography>

            <Box width="100%" height="1rem" mt="0.6rem">
              <Divider />
            </Box>
            <Box>
              {Array.isArray(value) ? (
                value.map((v) => (
                  <Typography
                    key={v}
                    variant="h5"
                    mb="0.5rem"
                    color="primary.main"
                  >
                    {v}
                  </Typography>
                ))
              ) : typeof value === "string" ? (
                <Typography variant="h5" color="primary.main">
                  {value}
                </Typography>
              ) : (
                <div />
              )}
            </Box>
          </Box>
        );
      })}
    </Box>
  );
};
export default ItemDetails;
