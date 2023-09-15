/* eslint-disable react-refresh/only-export-components */
import { Box, Divider, IconButton, Typography } from "@mui/material";
import { useStore } from "../../stores/store";
import { observer } from "mobx-react-lite";
import FlexBetween from "../../reusable/FlexBetween";
import { CloseOutlined } from "@mui/icons-material";
import { useCallback, useEffect } from "react";
import CartItemCard from "./CartItemCard";

const CartMenu = () => {
  const {
    itemStore: { isOpen, cart, openCart },
  } = useStore();

  const escPress = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        openCart(false);
      }
    },
    [openCart]
  );

  const calculateTotal = () => {
    const total = cart.reduce((sum, cartItem) => {
      return (
        sum +
        cartItem.quantity *
          (cartItem.item.priceSale
            ? cartItem.item.priceSale
            : cartItem.item.price)
      );
    }, 0);
    return total;
  };

  useEffect(() => {
    document.addEventListener("keydown", escPress, false);

    return () => {
      document.removeEventListener("keydown", escPress, false);
    };
  }, [escPress]);

  return (
    <Box
      display={isOpen ? "block" : "none"}
      bgcolor="rgba(0, 0, 0, 0.4)"
      position="fixed"
      zIndex={10}
      width="100%"
      height="100%"
      left="0"
      top="0"
      overflow="auto"
    >
      <Box
        position="fixed"
        right="0"
        bottom="0"
        width="max(400px, 30%)"
        height="100%"
        bgcolor="white"
        padding="1rem 2rem"
      >
        <FlexBetween>
          <Typography variant="h3">Cart</Typography>
          <IconButton onClick={() => openCart(false)}>
            <CloseOutlined />
          </IconButton>
        </FlexBetween>
        <Divider />
        {cart.map((cartItem) => (
          <CartItemCard key={cartItem.item.id} cartItem={cartItem} />
        ))}
        <Divider />
        <FlexBetween>
          <Typography>Total:</Typography>
          <Typography color="primary.main">{calculateTotal()}</Typography>
        </FlexBetween>
      </Box>
    </Box>
  );
};
export default observer(CartMenu);
