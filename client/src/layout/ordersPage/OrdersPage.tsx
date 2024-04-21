/* eslint-disable react-refresh/only-export-components */
import { observer } from "mobx-react-lite";
import { useStore } from "../../stores/store";
import { Box, CircularProgress, Divider, Typography } from "@mui/material";
import { useEffect } from "react";
import OrderCard from "./OrderCard";
import { router } from "../Routes";

const OrdersPage = () => {
  const {
    itemStore: { orderLoading, orders, loadOrders, clearOrders },
    userStore: { user },
  } = useStore();

  useEffect(() => {
    loadOrders();

    return () => clearOrders();
  }, [loadOrders, clearOrders]);

  if (!user) router.navigate("/");

  return (
    <Box>
      <Typography variant="h2">My Orders</Typography>
      <Divider />

      {orderLoading ? (
        <Box flex="center" alignItems="center" width="100%">
          <CircularProgress />
        </Box>
      ) : (
        <Box>
          {orders.map((order) => (
            <Box m="1rem" mb="3rem" key={order.id}>
              <Typography variant="h5">Order #{order.id}</Typography>
              {order.items.map((item) => (
                <OrderCard key={item.item?.id} item={item} />
              ))}
              <Typography variant="h4" fontWeight="bold">
                Total:{" "}
                {order.items.reduce(
                  (acc, curr) =>
                    acc +
                    curr.quantity *
                      (curr.item!.priceSale === 0
                        ? curr.item!.price
                        : curr.item!.priceSale),
                  0
                )}
                $
              </Typography>
              <Divider />
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default observer(OrdersPage);
