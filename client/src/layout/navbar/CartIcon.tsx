/* eslint-disable react-refresh/only-export-components */
import StyledBadge from "../../reusable/StyledBadge";
import FlexBetween from "../../reusable/FlexBetween";
import NavbarIconButton from "../../reusable/NavbarIconButton";
import { ShoppingCartOutlined } from "@mui/icons-material";
import { Typography, useTheme } from "@mui/material";
import { useStore } from "../../stores/store";
import { observer } from "mobx-react-lite";

const CartIcon = () => {
  const theme = useTheme();

  const {
    itemStore: { openCart, cart, wasCartOpened, cartTotal },
  } = useStore();

  return (
    <StyledBadge
      badgeContent={cart.length}
      color={wasCartOpened ? "secondary" : "error"}
    >
      <FlexBetween
        sx={{
          border: `0.25rem ${theme.palette.primary.main} solid`,
        }}
        borderRadius="6rem"
        bgcolor="primary.main"
        gap="1rem"
      >
        <NavbarIconButton onClick={() => openCart(true)}>
          <ShoppingCartOutlined />
        </NavbarIconButton>
        <Typography mr="0.5rem" color="primary.contrastText" fontWeight="700">
          {cartTotal} $
        </Typography>
      </FlexBetween>
    </StyledBadge>
  );
};

export default observer(CartIcon);
