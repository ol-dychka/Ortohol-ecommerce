import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { Item } from "../../models/Item";
import FlexBetween from "../../reusable/FlexBetween";
import {
  AddOutlined,
  CheckOutlined,
  FavoriteBorderOutlined,
  RemoveOutlined,
} from "@mui/icons-material";
import { useState } from "react";
import { useStore } from "../../stores/store";
import { CartItem } from "../../models/CartItem";

type Props = {
  item: Item;
};
const ItemCard = ({ item }: Props) => {
  const theme = useTheme();

  const {
    itemStore: { updateCart },
  } = useStore();

  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (updatedQuantity: number) => {
    if (updatedQuantity < 1) return;
    setQuantity(updatedQuantity);
  };

  const handleAddToCart = () => {
    console.log(item.added);
    updateCart(new CartItem(item, quantity));
    console.log(item.added);
  };

  return (
    <FlexBetween
      flexDirection="column"
      border={`1px ${theme.palette.secondary.dark} solid`}
      height="370px"
      padding="5px"
    >
      <FlexBetween flexDirection="column">
        <FlexBetween flexDirection="column" position="relative">
          <img
            src={item.images[0] || "img-placeholder.png"}
            alt="img"
            width="200px"
          />
          <Box position="absolute" top="8%" right="8%">
            <IconButton>
              <FavoriteBorderOutlined />
            </IconButton>
          </Box>
        </FlexBetween>
        <Typography fontWeight="700">{item.name}</Typography>
        <Typography>{item.category}</Typography>
      </FlexBetween>
      <FlexBetween flexDirection="column">
        <FlexBetween>
          <CheckOutlined />
          <Typography>In Store</Typography>
        </FlexBetween>
        {item.priceSale ? (
          <Box display="flex" justifyContent="center">
            <Typography
              color="secondary.dark"
              sx={{ textDecoration: "line-through" }}
              fontSize="0.7rem"
            >
              {item.price}
            </Typography>
            <Typography color="primary.main" fontWeight="700">
              {item.priceSale}$
            </Typography>
          </Box>
        ) : (
          <Typography color="primary.main" fontWeight="700">
            {item.price}$
          </Typography>
        )}
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{
            pointerEvents: item.added ? "none" : "auto",
            opacity: item.added ? 0.5 : 1,
          }}
        >
          <IconButton onClick={() => handleQuantityChange(quantity - 1)}>
            <RemoveOutlined />
          </IconButton>
          <Typography>{quantity}</Typography>
          <IconButton onClick={() => handleQuantityChange(quantity + 1)}>
            <AddOutlined />
          </IconButton>
        </Box>
        <Button
          color={item.added ? "error" : "primary"}
          variant="contained"
          onClick={handleAddToCart}
        >
          {item.added ? "Remove from Cart" : "Add to Cart"}
        </Button>
      </FlexBetween>
    </FlexBetween>
  );
};
export default ItemCard;
