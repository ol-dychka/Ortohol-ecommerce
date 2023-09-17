import { Box, Typography } from "@mui/material";

const CustomerInformation = () => {
  return (
    <Box>
      <Typography variant="h2" color="primary.main">
        Customer Information
      </Typography>
      <Typography variant="h4" mt="1rem">
        Schedule
      </Typography>
      <Typography variant="h4" ml="1rem">
        Monday 09:00 – 19:00
      </Typography>
      <Typography variant="h4" ml="1rem">
        Tuesday 09:00 – 19:00
      </Typography>
      <Typography variant="h4" ml="1rem">
        Wednesday 09:00 – 19:00
      </Typography>
      <Typography variant="h4" ml="1rem">
        Thursday 09:00 – 19:00
      </Typography>
      <Typography variant="h4" ml="1rem">
        Friday 09:00 – 19:00
      </Typography>
      <Typography variant="h4" ml="1rem">
        Saturday 11:00 – 15:00
      </Typography>
      <Typography variant="h4" ml="1rem">
        Sunday Day Off
      </Typography>
      <Typography variant="h4" mt="1rem">
        Return Policy
      </Typography>
      <Box
        ml="1rem"
        sx={{
          ".MuiTypography-root": {
            marginTop: "0.5rem",
          },
        }}
      >
        <Typography>
          At Ortohall, we are committed to ensuring your complete satisfaction
          with every purchase. If, for any reason, you are not entirely pleased
          with your order, we have a straightforward and customer-friendly
          return policy in place to make the process as easy as possible.
        </Typography>
        <Typography>
          <b>30-Day Return Window:</b> We offer a generous 30-day window for
          returns from the date of delivery. If your item arrives damaged,
          defective, or you simply change your mind, you can initiate a return
          within this period.
        </Typography>
        <Typography>
          <b>Easy Returns Process:</b> To begin the return process, please log
          in to your account on our website and navigate to the 'My Orders'
          section. Select the order containing the item you wish to return and
          follow the simple step-by-step instructions.
        </Typography>
        <Typography>
          <b>Conditions for Returns:</b>
        </Typography>
        <Typography>
          <b>Item Condition:</b> Returned items must be in their original
          condition, unused, and with all tags and packaging intact. We reserve
          the right to refuse returns that do not meet these criteria.
        </Typography>
        <Typography>
          <b>Proof of Purchase:</b> To process your return, please ensure you
          have the original purchase receipt or order number.
        </Typography>
        <Typography>
          <b>Return Shipping:</b> While we cover the return shipping costs for
          damaged or defective items, you are responsible for the return
          shipping fees for items returned due to a change of mind.
        </Typography>
        <Typography>
          <b>Refund or Exchange:</b> You have the choice of either receiving a
          refund for your returned item(s) or opting for an exchange. Refunds
          will be issued to the original payment method within 7-10 business
          days after we receive the returned item(s).
        </Typography>
        <Typography>
          <b>Damaged or Defective Items:</b> In the rare event that your order
          arrives damaged or defective, please contact our customer support team
          within 48 hours of receiving your package. We will arrange for a
          replacement or issue a full refund, including return shipping costs.
        </Typography>
        <Typography>
          <b>Contact Us:</b> If you have any questions, concerns, or need
          assistance with your return, our dedicated customer support team is
          here to help. You can reach us via <b>orto.hall@gmail.com</b> or{" "}
          <b>(123)456-7890</b> during our business hours.
        </Typography>
        <Typography>
          At Ortohall, we value your satisfaction and aim to make your shopping
          experience as seamless as possible. Thank you for choosing us as your
          preferred online shopping destination.
        </Typography>
        <Typography>
          Please note that this return policy is subject to change, and the most
          up-to-date version can always be found on our website. Last updated on
          09.09.2023.
        </Typography>
      </Box>
    </Box>
  );
};
export default CustomerInformation;
