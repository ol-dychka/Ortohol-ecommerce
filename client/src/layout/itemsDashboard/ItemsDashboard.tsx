/* eslint-disable react-refresh/only-export-components */
import {
  Box,
  Button,
  ButtonGroup,
  CircularProgress,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useEffect } from "react";
import { useStore } from "../../stores/store";
import { observer } from "mobx-react-lite";
import MessageWidget from "../MessageWidget";
import FlexBetween from "../../reusable/FlexBetween";
import ItemCard from "./ItemCard";
import { PagingParams } from "../../models/Pagination";
import PaginationPanel from "../../reusable/PaginationPanel";

const ItemsDashboard = () => {
  const isMobile = useMediaQuery("(max-width:900px)");

  const {
    itemStore: { loadItems, loading, items, setPagingParams, pagination },
  } = useStore();

  const getPage = (pageNumber: number) => {
    setPagingParams(new PagingParams(pageNumber));
    loadItems();
  };

  useEffect(() => {
    loadItems();
  }, [loadItems]);

  return (
    <Box>
      <Box position="relative">
        <img
          src="Orthopedics.png"
          alt="main-banner"
          height="100%"
          width="100%"
        />
        <Box
          position="absolute"
          width="100%"
          height="100%"
          display="flex"
          justifyContent="center"
          alignItems="center"
          top="0"
        >
          <Typography
            color="white"
            sx={{ fontSize: "9rem", fontWeight: "semibold" }}
          >
            ORTOHALL
          </Typography>
        </Box>
      </Box>

      <FlexBetween flexDirection={isMobile ? "column" : "row"}>
        <Typography variant="h3">Recommended Items</Typography>
      </FlexBetween>
      {loading || !pagination ? (
        <Box height="900px" flex="center" alignItems="center" width="100%">
          <CircularProgress />
        </Box>
      ) : (
        <>
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
          <PaginationPanel getPage={getPage} pagination={pagination} />
        </>
      )}

      <Box position="fixed" bottom="1rem" left="2rem">
        <MessageWidget />
      </Box>
    </Box>
  );
};
export default observer(ItemsDashboard);
