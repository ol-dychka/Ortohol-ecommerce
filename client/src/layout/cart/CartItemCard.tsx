import { Box, IconButton, MenuItem, Select, Typography } from "@mui/material";
import FlexBetween from "../../reusable/FlexBetween";
import { CartItem } from "../../models/CartItem";
import { useStore } from "../../stores/store";
import {
  RemoveOutlined,
  AddOutlined,
  DeleteOutlined,
} from "@mui/icons-material";

type Props = { cartItem: CartItem };
const CartItemCard = ({ cartItem }: Props) => {
  const {
    itemStore: { updateCartQuantity, updateCartOptions, deleteFromCart },
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
        <FlexBetween>
          <Typography>{cartItem.item.name}</Typography>
          <IconButton onClick={() => deleteFromCart(cartItem)}>
            <DeleteOutlined />
          </IconButton>
        </FlexBetween>
        <Box>
          <Select
            variant="standard"
            fullWidth
            value={cartItem.color}
            onChange={(e) =>
              updateCartOptions(
                cartItem,
                cartItem.size!,
                e.target.value,
                cartItem.gender!,
                cartItem.compressionClass!
              )
            } //item, size, color, gender, compClass
          >
            {cartItem.item.colors.map((c) => (
              <MenuItem key={c} value={c}>
                {c}
              </MenuItem>
            ))}
          </Select>
          <Select
            variant="standard"
            fullWidth
            value={cartItem.size}
            onChange={(e) =>
              updateCartOptions(
                cartItem,
                e.target.value,
                cartItem.color!,
                cartItem.gender!,
                cartItem.compressionClass!
              )
            } //item, size, color, gender, compClass
          >
            {cartItem.item.sizes.map((s) => (
              <MenuItem key={s} value={s}>
                {s}
              </MenuItem>
            ))}
          </Select>
          <Select
            variant="standard"
            fullWidth
            value={cartItem.gender}
            onChange={(e) =>
              updateCartOptions(
                cartItem,
                cartItem.size!,
                cartItem.color!,
                e.target.value,
                cartItem.compressionClass!
              )
            } //item, size, color, gender, compClass
          >
            {cartItem.item.genders.map((s) => (
              <MenuItem key={s} value={s}>
                {s}
              </MenuItem>
            ))}
          </Select>
          <Select
            variant="standard"
            fullWidth
            value={cartItem.compressionClass}
            onChange={(e) =>
              updateCartOptions(
                cartItem,
                cartItem.size!,
                cartItem.color!,
                cartItem.gender!,
                e.target.value
              )
            } //item, size, color, gender, compClass
          >
            {cartItem.item.compressionClasses.map((s) => (
              <MenuItem key={s} value={s}>
                {s}
              </MenuItem>
            ))}
          </Select>
        </Box>
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
