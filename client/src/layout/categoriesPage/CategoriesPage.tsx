/* eslint-disable react-refresh/only-export-components */
import { observer } from "mobx-react-lite";
import { useStore } from "../../stores/store";
import { Box, Button, Slider, Typography } from "@mui/material";
import ItemCard from "../itemsDashboard/ItemCard";
import FlexBetween from "../../reusable/FlexBetween";
import { PagingParams } from "../../models/Pagination";
import { useEffect, useState } from "react";
import { Category } from "../../models/Item";
import CategoryButton from "./CategoryButton";
import PriceRange from "../../models/PriceRange";

const CategoriesPage = () => {
  const {
    categoriesStore: {
      items,
      loadItems,
      loadPriceRange,
      loading,
      category,
      setCategory,
      setPagingParams,
      pagination,
      priceRange,
    },
  } = useStore();

  const getPage = (pageNumber: number) => {
    setPagingParams(new PagingParams(pageNumber));
    loadItems();
  };

  const [price, setPrice] = useState([0, 0]);

  const handlePriceChange = (_: Event, newValue: number | number[]) => {
    setPrice(newValue as number[]);
    console.log(price);
  };

  const applyPriceChange = () => {
    loadItems(new PriceRange(price[0], price[1]));
  };

  useEffect(() => {
    loadItems();
    loadPriceRange().then((priceRange) => {
      if (priceRange) setPrice([priceRange.min, priceRange.max]);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadItems, category]);

  return (
    <Box display="grid" gridTemplateColumns="repeat(4, 1fr)" gap="1rem">
      <Box display="flex" flexDirection="column">
        {priceRange && (
          <Box>
            <Box paddingX="1rem">
              <Slider
                value={price}
                min={priceRange.min}
                max={priceRange.max}
                onChange={handlePriceChange}
                valueLabelDisplay="auto"
              />
            </Box>
            <FlexBetween>
              <Typography>{priceRange.min}$</Typography>
              <Button variant="contained" onClick={applyPriceChange}>
                Apply
              </Button>
              <Typography>{priceRange.max}$</Typography>
            </FlexBetween>
          </Box>
        )}
        {Object.entries(Category).map(([key, c]) => (
          <CategoryButton
            key={key}
            action={() => setCategory(c)}
            text={c}
            isActive={c === category}
          />
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
