/* eslint-disable react-refresh/only-export-components */
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useStore } from "../../stores/store";
import ItemCard from "../itemsDashboard/ItemCard";
import { Box, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import PaginationPanel from "../../reusable/PaginationPanel";
import { PagingParams } from "../../models/Pagination";

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const searchWord = searchParams.get("s") + "";

  const {
    searchStore: {
      items,
      loading,
      loadItems,
      clearItems,
      setPagingParams,
      pagination,
    },
  } = useStore();

  const getPage = (pageNumber: number) => {
    setPagingParams(new PagingParams(pageNumber));
    loadItems(searchWord);
  };

  useEffect(() => {
    loadItems(searchWord);
    return () => clearItems();
  }, [loadItems, searchWord, clearItems]);

  if (loading) return <div>loading...</div>;

  return (
    <Box>
      <Typography variant="h3">Search results by "{searchWord}"</Typography>
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
      {pagination && (
        <PaginationPanel getPage={getPage} pagination={pagination} />
      )}
    </Box>
  );
};

export default observer(SearchPage);
