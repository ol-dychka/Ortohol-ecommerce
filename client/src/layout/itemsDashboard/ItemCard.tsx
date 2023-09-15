import {
  Box,
  Button,
  IconButton,
  MenuItem,
  Select,
  Typography,
  useTheme,
} from "@mui/material";
import { Item } from "../../models/Item";
import FlexBetween from "../../reusable/FlexBetween";
import {
  AddOutlined,
  CheckOutlined,
  FavoriteBorderOutlined,
  KeyboardArrowDownOutlined,
  KeyboardArrowUpOutlined,
  RemoveOutlined,
} from "@mui/icons-material";
import { useState } from "react";
import { useStore } from "../../stores/store";
import { CartItem } from "../../models/CartItem";
import { router } from "../Routes";

type Props = {
  item: Item;
};
const ItemCard = ({ item }: Props) => {
  const theme = useTheme();

  const {
    itemStore: { updateCart },
  } = useStore();

  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState(item.sizes[0]);
  const [color, setColor] = useState(item.colors[0]);
  const [open, setOpen] = useState(false);

  const handleQuantityChange = (updatedQuantity: number) => {
    if (updatedQuantity < 1) return;
    setQuantity(updatedQuantity);
  };

  const handleAddToCart = () => {
    if (size && color) updateCart(new CartItem(item, quantity, size, color));
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
            src={item.images[0] || "/img-placeholder.png"}
            alt="img"
            width="200px"
          />
          <Box position="absolute" top="8%" right="8%">
            <IconButton>
              <FavoriteBorderOutlined />
            </IconButton>
          </Box>
        </FlexBetween>
        <Typography
          fontWeight="700"
          onClick={() => router.navigate(`/items/${item.id}`)}
          sx={{ cursor: "pointer" }}
        >
          {item.name}
        </Typography>
        <Typography>{item.category}</Typography>
      </FlexBetween>
      <FlexBetween flexDirection="column" position="relative">
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

        {/* SIZE & COLOR SELECTION */}
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{
            pointerEvents: item.added ? "none" : "auto",
            opacity: item.added ? 0.5 : 1,
          }}
        >
          {item.sizes.length > 1 || item.colors.length > 1 ? (
            <>
              <Typography>Select...</Typography>
              <IconButton onClick={() => setOpen(!open)}>
                {open ? (
                  <KeyboardArrowUpOutlined />
                ) : (
                  <KeyboardArrowDownOutlined />
                )}
              </IconButton>
            </>
          ) : (
            <>
              <IconButton onClick={() => handleQuantityChange(quantity - 1)}>
                <RemoveOutlined />
              </IconButton>
              <Typography>{quantity}</Typography>
              <IconButton onClick={() => handleQuantityChange(quantity + 1)}>
                <AddOutlined />
              </IconButton>
            </>
          )}
        </Box>
        <Box
          position="absolute"
          top="78px"
          zIndex={10}
          display={open ? "block" : "none"}
          bgcolor="#fff"
          boxShadow="0px 0px 10px #333333"
          padding="0.25rem"
        >
          <FlexBetween gap="1rem">
            <Typography>Size</Typography>
            <Select
              value={size}
              onChange={(e) => setSize(e.target.value)}
              variant="standard"
            >
              {item.sizes.map((s) => (
                <MenuItem key={s} value={s}>
                  {s}
                </MenuItem>
              ))}
            </Select>
          </FlexBetween>
          <FlexBetween gap="1rem">
            <Typography>Color</Typography>
            <Select
              value={color}
              onChange={(e) => setColor(e.target.value)}
              variant="standard"
            >
              {item.colors.map((c) => (
                <MenuItem key={c} value={c}>
                  {c}
                </MenuItem>
              ))}
            </Select>
          </FlexBetween>
          <FlexBetween>
            <IconButton onClick={() => handleQuantityChange(quantity - 1)}>
              <RemoveOutlined />
            </IconButton>
            <Typography>{quantity}</Typography>
            <IconButton onClick={() => handleQuantityChange(quantity + 1)}>
              <AddOutlined />
            </IconButton>
          </FlexBetween>
        </Box>

        {/* CART MENU */}
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
