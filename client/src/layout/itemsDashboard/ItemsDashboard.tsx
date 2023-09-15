/* eslint-disable react-refresh/only-export-components */
import {
  Box,
  Button,
  ButtonGroup,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useEffect } from "react";
import { useStore } from "../../stores/store";
import { observer } from "mobx-react-lite";
import MessageWidget from "../MessageWidget";
import FlexBetween from "../../reusable/FlexBetween";
import ItemCard from "./ItemCard";

const ItemsDashboard = () => {
  const isMobile = useMediaQuery("(max-width:900px)");

  const {
    itemStore: { loadItems, loading, items },
  } = useStore();

  useEffect(() => {
    loadItems();
  }, [loadItems]);

  if (loading) return <div>loading...</div>;
  return (
    <Box>
      <Box padding="2rem">
        <img
          src="main-banner.webp"
          alt="main-banner"
          height="100%"
          width="100%"
        />
      </Box>

      <FlexBetween flexDirection={isMobile ? "column" : "row"}>
        <Typography variant="h3">Recommended</Typography>
        <ButtonGroup variant="text">
          <Button>All</Button>
          <Button>Featured</Button>
          <Button>Top Sellers</Button>
        </ButtonGroup>
      </FlexBetween>
      <Box
        margin="1rem auto"
        display="grid"
        gridTemplateColumns="repeat(auto-fill, 220px)"
        justifyContent="space-around"
        rowGap="20px"
        columnGap="1.33%"
      >
        {items.map((item) => (
          <ItemCard key={item.id} item={item} />
        ))}
      </Box>

      <Box position="fixed" bottom="1rem" left="2rem">
        <MessageWidget />
      </Box>
    </Box>
  );
};
export default observer(ItemsDashboard);
