import { Box, Typography } from "@mui/material";
import { OrderItem } from "../../models/OrderItem";
import FlexBetween from "../../reusable/FlexBetween";

type Props = {
  item: OrderItem;
};

const OrderCard = ({ item }: Props) => {
  return (
    <FlexBetween padding="1rem">
      <img
        src={item.item?.images[0] || "/img-placeholder.png"}
        alt="img"
        width="100px"
      />
      <Box flexBasis="40%">
        <FlexBetween>
          <Typography variant="h4">{item.item?.name}</Typography>
        </FlexBetween>
        <Box>
          <Typography>Color: {item.color}</Typography>
          <Typography>Size: {item.size}</Typography>
          <Typography>Gender: {item.gender}</Typography>
          <Typography>Compression: {item.compressionClass}</Typography>
        </Box>
        {item.item && (
          <Typography variant="h5" fontWeight="bold">
            {(item.item.priceSale ? item.item.priceSale : item.item.price) *
              item.quantity}
            $
          </Typography>
        )}
      </Box>
    </FlexBetween>
  );
};

export default OrderCard;
