/* eslint-disable react-refresh/only-export-components */
import { useEffect, useState } from "react";
import { useStore } from "../../stores/store";
import { useParams } from "react-router";
import {
  Box,
  Button,
  IconButton,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { observer } from "mobx-react-lite";
import {
  AddOutlined,
  CheckOutlined,
  FullscreenExitOutlined,
  FullscreenOutlined,
  NavigateBeforeOutlined,
  NavigateNextOutlined,
  RemoveOutlined,
} from "@mui/icons-material";
import { CartItem } from "../../models/CartItem";
import ImageGallery from "react-image-gallery";

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

  const handleQuantityChange = (updatedQuantity: number) => {
    if (updatedQuantity < 1) return;
    setQuantity(updatedQuantity);
  };

  const handleAddToCart = () => {
    console.log(item!.added);
    updateCart(new CartItem(item!, quantity));
    console.log(item!.added);
  };

  useEffect(() => {
    if (id) loadItem(id);
    return () => clearSelectedItem();
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
        <Box flexBasis={isMobile ? undefined : "50%"}>
          <ImageGallery
            items={item.images.map((image) => ({
              original: image,
              thumbnail: image,
              thumbnailWidth: 30,
              // thumbnailHeight: 50,
            }))}
            showPlayButton={false}
            renderThumbInner={({ original }) => {
              return <img src={original} alt="m" style={{ height: "3rem" }} />;
            }}
            renderLeftNav={(onClick) => {
              return (
                <IconButton
                  onClick={onClick}
                  sx={{
                    position: "absolute",
                    top: "45%",
                    left: "0",
                    zIndex: 5,
                  }}
                  color="secondary"
                >
                  <NavigateBeforeOutlined sx={{ fontSize: "2rem" }} />
                </IconButton>
              );
            }}
            renderRightNav={(onClick) => {
              return (
                <IconButton
                  onClick={onClick}
                  sx={{
                    position: "absolute",
                    top: "45%",
                    right: "0",
                    zIndex: 5,
                  }}
                  color="secondary"
                >
                  <NavigateNextOutlined sx={{ fontSize: "2rem" }} />
                </IconButton>
              );
            }}
            renderFullscreenButton={(onClick, isFullscreen) => {
              return (
                <IconButton
                  onClick={onClick}
                  sx={{
                    position: "absolute",
                    bottom: "0",
                    right: "0",
                    zIndex: 5,
                  }}
                  color="secondary"
                >
                  {isFullscreen ? (
                    <FullscreenExitOutlined sx={{ fontSize: "2rem" }} />
                  ) : (
                    <FullscreenOutlined sx={{ fontSize: "2rem" }} />
                  )}
                </IconButton>
              );
            }}
          />
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
            <Typography color="primary.main" fontWeight="700">
              {item.price}$
            </Typography>
          )}
          <Box display="flex">
            <CheckOutlined />
            <Typography variant="h5">In Store</Typography>
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
          <Box display="flex" gap="2rem">
            <Button
              color={item.added ? "error" : "primary"}
              variant="contained"
              onClick={handleAddToCart}
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
              >
                Buy Now
              </Button>
            )}
          </Box>
        </Box>
      </Box>
      <Box>
        <Typography variant="h5">{item.description}</Typography>
      </Box>
    </Box>
  );
};
export default observer(ItemPage);
