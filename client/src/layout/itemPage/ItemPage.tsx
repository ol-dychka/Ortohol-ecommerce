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
import { ItemOptions } from "../../models/Item";

const ItemPage = () => {
  const {
    itemStore: {
      loadItem,
      selectedItem: item,
      loading,
      clearSelectedItem,
      addToCart,
      openCart,
    },
  } = useStore();

  const { id } = useParams();

  const isMobile = useMediaQuery("(max-width:900px)");

  const [quantity, setQuantity] = useState(1);
  const [options, setOptions] = useState<ItemOptions>({
    size: "",
    color: "",
    gender: "",
    compressionClass: "",
  });

  const handleQuantityChange = (updatedQuantity: number) => {
    if (updatedQuantity < 1) return;
    setQuantity(updatedQuantity);
  };

  const handleAddToCart = () => {
    console.log(options);
    addToCart(new CartItem(item!, quantity, options));
  };

  useEffect(() => {
    if (id)
      loadItem(id).then((item) => {
        if (item) {
          setOptions({
            size: item.sizes[0],
            color: item.colors[0],
            gender: item.genders[0],
            compressionClass: item.compressionClasses[0],
          });
        }
      });
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
          <ButtonGroup sx={{ marginTop: "1rem", display: "block" }}>
            {item.colors.map((c) => (
              <Button
                key={c}
                onClick={() => setOptions({ ...options, color: c })}
                disabled={c === options.color}
              >
                {c}
              </Button>
            ))}
          </ButtonGroup>
          <ButtonGroup sx={{ marginTop: "1rem", display: "block" }}>
            {item.sizes.map((s) => (
              <Button
                key={s}
                onClick={() => setOptions({ ...options, size: s })}
                disabled={s === options.size}
              >
                {s}
              </Button>
            ))}
          </ButtonGroup>
          <ButtonGroup sx={{ marginTop: "1rem", display: "block" }}>
            {item.genders.map((g) => (
              <Button
                key={g}
                onClick={() => setOptions({ ...options, gender: g })}
                disabled={g === options.gender}
              >
                {g}
              </Button>
            ))}
          </ButtonGroup>
          <ButtonGroup sx={{ marginTop: "1rem", display: "block" }}>
            {item.compressionClasses.map((cc) => (
              <Button
                key={cc}
                onClick={() => setOptions({ ...options, compressionClass: cc })}
                disabled={cc === options.compressionClass}
              >
                {cc}
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
          <Box display="flex" alignItems="center">
            <IconButton onClick={() => handleQuantityChange(quantity - 1)}>
              <RemoveOutlined sx={{ fontSize: "1.5rem" }} />
            </IconButton>
            <Typography variant="h4">{quantity}</Typography>
            <IconButton onClick={() => handleQuantityChange(quantity + 1)}>
              <AddOutlined sx={{ fontSize: "1.5rem" }} />
            </IconButton>
          </Box>
          {item.added && <Typography color="primary">In Cart</Typography>}
          <Box display="flex" gap="1rem">
            <Button
              variant="contained"
              onClick={handleAddToCart}
              disabled={item.leftCount < 1}
            >
              Add to Cart
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
