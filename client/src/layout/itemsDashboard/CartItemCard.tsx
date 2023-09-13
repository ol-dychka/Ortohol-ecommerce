import { Box, IconButton, Typography } from "@mui/material";
import FlexBetween from "../../reusable/FlexBetween";
import { CartItem } from "../../models/CartItem";
import { useStore } from "../../stores/store";
import { RemoveOutlined, AddOutlined } from "@mui/icons-material";

type Props = { cartItem: CartItem };
const CartItemCard = ({ cartItem }: Props) => {
  const {
    itemStore: { updateCartQuantity },
  } = useStore();

  const handleQuantityChange = (q: number) => {
    updateCartQuantity(cartItem, q);
  };
  return (
    <FlexBetween>
      <img
        src={cartItem.item.images[0] || "img-placeholder.png"}
        alt="img"
        width="200px"
      />
      <Box>
        <Typography>{cartItem.item.name}</Typography>
        <Typography>{cartItem.item.added.toString()}</Typography>
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
