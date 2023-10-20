/* eslint-disable react-refresh/only-export-components */
import { observer } from "mobx-react-lite";
import { useStore } from "../../stores/store";
import { Box, Button, Typography } from "@mui/material";
import ItemCard from "../itemsDashboard/ItemCard";
import FlexBetween from "../../reusable/FlexBetween";
import { PagingParams } from "../../models/Pagination";
import { useEffect } from "react";
import { Category } from "../../models/Item";

const CategoriesPage = () => {
  const {
    categoriesStore: {
      items,
      loadItems,
      loading,
      category,
      setCategory,
      setPagingParams,
      pagination,
    },
  } = useStore();

  const getPage = (pageNumber: number) => {
    setPagingParams(new PagingParams(pageNumber));
    loadItems();
  };

  useEffect(() => {
    loadItems();
  }, [loadItems, category]);

  return (
    <Box display="grid" gridTemplateColumns="repeat(4, 1fr)" gap="1rem">
      <Box display="flex" flexDirection="column">
        {Object.entries(Category).map(([key, category]) => (
          <Button key={key} onClick={() => setCategory(category)}>
            {category}
          </Button>
        ))}
      </Box>
      <Box gridColumn="span 3">
        {loading ? (
          <Box p="10rem">loading...</Box>
        ) : (
          <>
            <Typography color="#000">{category}</Typography>
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
            )}
          </>
        )}
      </Box>
    </Box>
  );
};
export default observer(CategoriesPage);
