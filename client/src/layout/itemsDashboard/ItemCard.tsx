import {
  Box,
  Button,
  IconButton,
  MenuItem,
  Select,
  Typography,
  useTheme,
} from "@mui/material";
import { Item, ItemOptions } from "../../models/Item";
import FlexBetween from "../../reusable/FlexBetween";
import {
  AddOutlined,
  CheckOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
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
    itemStore: { addToCart, setLiked },
  } = useStore();

  const [quantity, setQuantity] = useState(1);
  const [options, setOptions] = useState<ItemOptions>({
    size: item.sizes[0],
    color: item.colors[0],
    gender: item.genders[0],
    compressionClass: item.compressionClasses[0],
  });
  const [open, setOpen] = useState(false);
  const handleQuantityChange = (updatedQuantity: number) => {
    if (updatedQuantity < 1) return;
    setQuantity(updatedQuantity);
  };

  const handleAddToCart = () => {
    addToCart(new CartItem(item, quantity, options));
  };

  return (
    <FlexBetween
      flexDirection="column"
      border={`1px ${theme.palette.secondary.dark} solid`}
      height="420px"
      padding="5px"
    >
      <FlexBetween flexDirection="column">
        <FlexBetween flexDirection="column" position="relative">
          <img
            src={item.images[0] || "/img-placeholder.png"}
            alt="img"
            width="200px"
            height="200px"
            style={{ objectFit: "contain" }}
          />
          <Box position="absolute" top="8%" right="8%">
            <IconButton onClick={() => setLiked(item, item.liked)}>
              {item.liked ? (
                <FavoriteOutlined color="primary" />
              ) : (
                <FavoriteBorderOutlined />
              )}
            </IconButton>
          </Box>
        </FlexBetween>
        <Typography
          fontWeight="700"
          onClick={() => router.navigate(`/items/${item.id}`)}
          sx={{
            cursor: "pointer",
            textAlign: "center",
            ":hover": {
              textDecoration: "underline",
            },
          }}
        >
          {item.name}
        </Typography>
        <Typography sx={{ textAlign: "center" }}>{item.category}</Typography>
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
        <Box display="flex" justifyContent="center" alignItems="center">
          <FlexBetween gap="1rem">
            <Typography>Choose...</Typography>
            <IconButton onClick={() => setOpen(!open)}>
              {open ? (
                <KeyboardArrowUpOutlined />
              ) : (
                <KeyboardArrowDownOutlined />
              )}
            </IconButton>
          </FlexBetween>
        </Box>
        {/* DROPDOWN SELECTS */}
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
              value={options.size}
              onChange={(e) => setOptions({ ...options, size: e.target.value })}
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
              value={options.color}
              onChange={(e) =>
                setOptions({ ...options, color: e.target.value })
              }
              variant="standard"
            >
              {item.colors.map((c) => (
                <MenuItem key={c} value={c}>
                  {c}
                </MenuItem>
              ))}
            </Select>
          </FlexBetween>
          <FlexBetween gap="1rem">
            <Typography>Sex</Typography>
            <Select
              value={options.gender}
              onChange={(e) =>
                setOptions({ ...options, gender: e.target.value })
              }
              variant="standard"
            >
              {item.genders.map((s) => (
                <MenuItem key={s} value={s}>
                  {s}
                </MenuItem>
              ))}
            </Select>
          </FlexBetween>
          <FlexBetween gap="1rem">
            <Typography>Compression</Typography>
            <Select
              value={options.compressionClass}
              onChange={(e) =>
                setOptions({ ...options, compressionClass: e.target.value })
              }
              variant="standard"
            >
              {item.compressionClasses.map((s) => (
                <MenuItem key={s} value={s}>
                  {s}
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
        {item.added && <Typography color="primary">In Cart</Typography>}
        <Button variant="contained" onClick={handleAddToCart}>
          {item.added ? "Add More" : "Add to Cart"}
        </Button>
      </FlexBetween>
    </FlexBetween>
  );
};
export default ItemCard;
