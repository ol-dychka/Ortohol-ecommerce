import { Box, IconButton, MenuItem, Select, Typography } from "@mui/material";
import FlexBetween from "../../reusable/FlexBetween";
import { CartItem } from "../../models/CartItem";
import { useStore } from "../../stores/store";
import { RemoveOutlined, AddOutlined } from "@mui/icons-material";

type Props = { cartItem: CartItem };
const CartItemCard = ({ cartItem }: Props) => {
  const {
    itemStore: { updateCartQuantity, updateCartColor, updateCartSize },
  } = useStore();

  const handleQuantityChange = (q: number) => {
    updateCartQuantity(cartItem, q);
  };
  return (
    <FlexBetween padding="1rem">
      <img
        src={cartItem.item.images[0] || "/img-placeholder.png"}
        alt="img"
        width="150px"
      />
      <Box flexBasis="40%">
        <Typography>{cartItem.item.name}</Typography>
        <FlexBetween>
          <Select
            value={cartItem.color}
            onChange={(e) => updateCartColor(cartItem, e.target.value)}
          >
            {cartItem.item.colors.map((c) => (
              <MenuItem key={c} value={c}>
                {c}
              </MenuItem>
            ))}
          </Select>
          <Select
            value={cartItem.size}
            onChange={(e) => updateCartSize(cartItem, e.target.value)}
          >
            {cartItem.item.sizes.map((s) => (
              <MenuItem key={s} value={s}>
                {s}
              </MenuItem>
            ))}
          </Select>
        </FlexBetween>
        <Box display="flex" justifyContent="center" alignItems="center">
          <IconButton
            onClick={() => handleQuantityChange(cartItem.quantity - 1)}
          >
            <RemoveOutlined />
          </IconButton>
          <Typography>{cartItem.quantity}</Typography>
          <IconButton
            onClick={() => handleQuantityChange(cartItem.quantity + 1)}
          >
            <AddOutlined />
          </IconButton>
        </Box>
        <Typography>
          {(cartItem.item.priceSale
            ? cartItem.item.priceSale
            : cartItem.item.price) * cartItem.quantity}
          $
        </Typography>
      </Box>
    </FlexBetween>
  );
};
export default CartItemCard;
