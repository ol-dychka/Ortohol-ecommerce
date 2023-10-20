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
import { PagingParams } from "../../models/Pagination";

const ItemsDashboard = () => {
  const isMobile = useMediaQuery("(max-width:900px)");

  const {
    itemStore: { loadItems, loading, items, setPagingParams, pagination },
    // make an arrow to go to next/prev pages and
    // trigger setPagingParams with argument pagination[page] +- 1
  } = useStore();

  const getPage = (pageNumber: number) => {
    setPagingParams(new PagingParams(pageNumber));
    loadItems();
  };

  useEffect(() => {
    loadItems();
  }, [loadItems]);

  // if (loading || !pagination) return <Box p="10rem">loading...</Box>;
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
      {loading || !pagination ? (
        <Box p="10rem">loading...</Box>
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
          <FlexBetween gap="1rem">
            <Button
              variant="contained"
              onClick={() => getPage(pagination!.currentPage - 1)}
              disabled={pagination.currentPage === 1}
            >
              {"<"}
            </Button>
            <FlexBetween gap="0.5rem">
              {Array.from(
                { length: pagination!.totalPages },
                (_, i) => i + 1
              ).map((pageNumber) => (
                <Button
                  key={pageNumber}
                  variant="contained"
                  onClick={() => getPage(pageNumber)}
                >
                  {pageNumber}
                </Button>
              ))}
            </FlexBetween>
            <Button
              variant="contained"
              onClick={() => getPage(pagination!.currentPage + 1)}
              disabled={pagination.currentPage === pagination.totalPages}
            >
              {">"}
            </Button>
          </FlexBetween>
        </>
      )}

      <Box position="fixed" bottom="1rem" left="2rem">
        <MessageWidget />
      </Box>
    </Box>
  );
};
export default observer(ItemsDashboard);
