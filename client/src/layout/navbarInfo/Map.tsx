import { Box, Typography } from "@mui/material";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { useMemo } from "react";

const Map = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: `${import.meta.env.VITE_GOOGLEMAPS_API_KEY}`,
  });
  const center = useMemo(
    () => ({ lat: 43.64257307562227, lng: -79.38705701377728 }),
    []
  );

  if (!isLoaded) return <div>loading...</div>;
  return (
    <Box>
      <Typography variant="h2" color="primary.main">
        Our Location
      </Typography>
      <Typography variant="h4">123 Yonge, unit #123</Typography>
      <Typography variant="h5">Toronto, ON, Canada</Typography>
      <Box height="600px" width="100%" mt="1rem">
        <GoogleMap
          mapContainerStyle={{ width: "100%", height: "100%" }}
          center={center}
          zoom={15}
        >
          <Marker
            position={{ lat: 43.64257307562227, lng: -79.38705701377728 }}
          />
        </GoogleMap>
      </Box>
    </Box>
  );
};
export default Map;
