/* eslint-disable react-refresh/only-export-components */
import { Box, Button, Divider, IconButton, Typography } from "@mui/material";
import { useStore } from "../../stores/store";
import { observer } from "mobx-react-lite";
import FlexBetween from "../../reusable/FlexBetween";
import { CloseOutlined } from "@mui/icons-material";
import { useCallback, useEffect } from "react";
import CartItemCard from "./CartItemCard";
import { router } from "../Routes";
import LoginForm from "../users/LoginForm";

const CartMenu = () => {
  const {
    itemStore: { isCartOpen, cart, openCart },
    userStore: { isLoggedIn },
    modalStore: { openModal },
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
      display={isCartOpen ? "block" : "none"}
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
        width="min(520px, 100%)"
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
          <CartItemCard key={cartItem.getId()} cartItem={cartItem} />
        ))}
        <Divider />
        <FlexBetween mt="0.5rem" mb="1rem">
          <Typography variant="h5">Total:</Typography>
          <Typography variant="h5" color="primary.main">
            {calculateTotal()}
          </Typography>
        </FlexBetween>
        {cart.length > 0 && (
          <Button
            fullWidth
            variant="contained"
            onClick={() =>
              router.navigate("/checkout").then(() => openCart(false))
            }
            disabled={!isLoggedIn}
          >
            Checkout
          </Button>
        )}
        {!isLoggedIn && (
          <Typography
            color="primary"
            onClick={() => openModal(<LoginForm />)}
            textAlign="center"
            sx={{ cursor: "pointer" }}
          >
            Log in to Proceed
          </Typography>
        )}
      </Box>
    </Box>
  );
};
export default observer(CartMenu);
