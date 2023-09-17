/* eslint-disable react-refresh/only-export-components */
import { useEffect, useState } from "react";
import { useStore } from "../../stores/store";
import { useParams } from "react-router";
import {
  Box,
  Button,
  ButtonGroup,
  IconButton,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { observer } from "mobx-react-lite";
import {
  AddOutlined,
  CheckOutlined,
  RemoveOutlined,
} from "@mui/icons-material";
import { CartItem } from "../../models/CartItem";
import ItemDetails from "./ItemDetails";
import ItemImages from "./ItemImages";

const ItemPage = () => {
  const {
    itemStore: {
      loadItem,
      selectedItem: item,
      loading,
      clearSelectedItem,
      updateCart,
      openCart,
    },
  } = useStore();

  const { id } = useParams();

  const isMobile = useMediaQuery("(max-width:900px)");

  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");

  const handleQuantityChange = (updatedQuantity: number) => {
    if (updatedQuantity < 1) return;
    setQuantity(updatedQuantity);
  };

  const handleAddToCart = () => {
    console.log(color);
    console.log(size);
    updateCart(new CartItem(item!, quantity, size, color));
  };

  useEffect(() => {
    if (id)
      loadItem(id).then((item) => {
        if (item) {
          setSize(item.sizes[0]);
          setColor(item.colors[0]);
        }
      });
    console.log(size);
    console.log(color);
    return () => clearSelectedItem();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, clearSelectedItem, loadItem]);

  if (loading || !item) return <div>loading...</div>;
  return (
    <Box>
      <Box
        width="100%"
        display={isMobile ? "block" : "flex"}
        gap="1rem"
        justifyContent="space-between"
      >
        {/* IMAGE & DESCRIPTION */}
        <Box flexBasis={isMobile ? undefined : "50%"}>
          <ItemImages images={item.images} />
        </Box>
        <Box flexBasis="45%" mb="2rem">
          <Typography variant="h2" fontWeight="500">
            {item.name}
          </Typography>
          {item.priceSale ? (
            <Box>
              <Typography
                variant="h3"
                color="secondary.dark"
                sx={{ textDecoration: "line-through" }}
              >
                {item.price}
              </Typography>
              <Typography color="primary.main" fontWeight="700" variant="h3">
                {item.priceSale}$
              </Typography>
            </Box>
          ) : (
            <Typography color="primary.main" fontWeight="700" variant="h3">
              {item.price}$
            </Typography>
          )}

          {/* SIZE & COLOR CONFIG */}
          <Box mt="1rem" />
          <ButtonGroup>
            {item.sizes.map((s) => (
              <Button key={s} onClick={() => setSize(s)} disabled={s === size}>
                {s}
              </Button>
            ))}
          </ButtonGroup>
          <Box />
          <ButtonGroup sx={{ marginTop: "1rem" }}>
            {item.colors.map((c) => (
              <Button
                key={c}
                onClick={() => setColor(c)}
                disabled={c === color}
              >
                {c}
              </Button>
            ))}
          </ButtonGroup>

          {/* CART MENU */}
          <Box display="flex" mt="1rem">
            {item.leftCount > 0 ? (
              <>
                <CheckOutlined />
                <Typography variant="h5">In Store</Typography>
                <Typography variant="h5" color="secondary.dark" ml="1rem">
                  {item.leftCount} Remaining
                </Typography>
              </>
            ) : (
              <Typography variant="h5">Not In Store</Typography>
            )}
          </Box>
          <Box
            display="flex"
            alignItems="center"
            sx={{
              pointerEvents: item.added ? "none" : "auto",
              opacity: item.added ? 0.5 : 1,
            }}
          >
            <IconButton onClick={() => handleQuantityChange(quantity - 1)}>
              <RemoveOutlined sx={{ fontSize: "1.5rem" }} />
            </IconButton>
            <Typography variant="h4">{quantity}</Typography>
            <IconButton onClick={() => handleQuantityChange(quantity + 1)}>
              <AddOutlined sx={{ fontSize: "1.5rem" }} />
            </IconButton>
          </Box>
          <Box display="flex" gap="1rem">
            <Button
              color={item.added ? "error" : "primary"}
              variant="contained"
              onClick={handleAddToCart}
              disabled={item.leftCount < 1}
            >
              {item.added ? "Remove from Cart" : "Add to Cart"}
            </Button>
            {!item.added && (
              <Button
                color="success"
                variant="contained"
                onClick={() => {
                  handleAddToCart();
                  openCart(true);
                }}
                disabled={item.leftCount < 1}
              >
                Buy Now
              </Button>
            )}
          </Box>
        </Box>
      </Box>
      <Box>
        <Typography variant="h5">{item.description}</Typography>
        <ItemDetails details={item.details} />
      </Box>
    </Box>
  );
};
export default observer(ItemPage);
