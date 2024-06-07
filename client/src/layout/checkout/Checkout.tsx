import { useState } from "react";
import { useStore } from "../../stores/store";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography,
} from "@mui/material";
import { Formik, FormikHelpers } from "formik";
import * as yup from "yup";
import AddressForm from "./AddressForm";
import { CheckoutFormValues } from "../../models/CheckoutFormValues";

const initialValues: CheckoutFormValues = {
  billingAddress: {
    // for Preview purposes only
    firstName: "John",
    lastName: "Doe",
    country: "Canada",
    street1: "14-90 Greenwood St.",
    street2: "",
    city: "Toronto",
    state: "ON",
    zipCode: "U7H8J9",
    // firstName: "",
    // lastName: "",
    // country: "",
    // street1: "",
    // street2: "",
    // city: "",
    // state: "",
    // zipCode: "",
  },
  shippingAddress: {
    isSameAddress: true,
    firstName: "",
    lastName: "",
    country: "",
    street1: "",
    street2: "",
    city: "",
    state: "",
    zipCode: "",
  },
  email: "johndoe@email.com",
  phoneNumber: "+12345678910",
  // email: "",
  // phoneNumber: "",
};

const checkoutSchema = [
  yup.object().shape({
    billingAddress: yup.object().shape({
      firstName: yup.string().required(),
      lastName: yup.string().required(),
      country: yup.string().required(),
      street1: yup.string().required(),
      street2: yup.string(),
      city: yup.string().required(),
      state: yup.string().required(),
      zipCode: yup.string().required(),
    }),
    shippingAddress: yup.object().shape({
      isSameAddress: yup.boolean(),
      firstName: yup.string().when("isSameAddress", {
        is: false,
        then: (schema) => schema.required(),
      }),
      lastName: yup.string().when("isSameAddress", {
        is: false,
        then: (schema) => schema.required(),
      }),
      country: yup.string().when("isSameAddress", {
        is: false,
        then: (schema) => schema.required(),
      }),
      street1: yup.string().when("isSameAddress", {
        is: false,
        then: (schema) => schema.required(),
      }),
      street2: yup.string(),
      city: yup.string().when("isSameAddress", {
        is: false,
        then: (schema) => schema.required(),
      }),
      state: yup.string().when("isSameAddress", {
        is: false,
        then: (schema) => schema.required(),
      }),
      zipCode: yup.string().when("isSameAddress", {
        is: false,
        then: (schema) => schema.required(),
      }),
    }),
  }),
  yup.object().shape({
    email: yup.string().required(),
    phoneNumber: yup.string().required(),
  }),
];

const Checkout = () => {
  const {
    itemStore: { makePayment },
  } = useStore();

  const [activeStep, setActiveStep] = useState(0);

  const handleFormSubmit = async (
    values: CheckoutFormValues,
    actions: FormikHelpers<CheckoutFormValues>
  ) => {
    setActiveStep(activeStep + 1);

    // copy billing into shipping
    if (activeStep === 0 && values.shippingAddress.isSameAddress) {
      actions.setFieldValue("shippingAddress", {
        ...values.billingAddress,
        isSameAddress: true,
      });
    }

    if (activeStep === 1) {
      makePayment();
    }

    actions.setTouched({});
  };

  return (
    <Box>
      <Stepper activeStep={activeStep} orientation="horizontal">
        <Step>
          <StepLabel>Billing</StepLabel>
        </Step>
        <Step>
          <StepLabel>Payment</StepLabel>
        </Step>
      </Stepper>
      <Box>
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={initialValues}
          validationSchema={checkoutSchema[activeStep]}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
            setFieldValue,
          }) => (
            <form onSubmit={handleSubmit}>
              {activeStep === 0 && (
                <Box>
                  <Box>
                    <Typography mb="1rem">Billing Information</Typography>
                    <AddressForm
                      type="billingAddress"
                      values={values.billingAddress}
                      errors={errors}
                      touched={touched}
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                    />
                  </Box>
                  <Box>
                    <FormControlLabel
                      label="Same for Shipping Address"
                      control={
                        <Checkbox
                          defaultChecked
                          value={values.shippingAddress.isSameAddress}
                          onChange={() =>
                            setFieldValue(
                              "shippingAddress.isSameAddress",
                              !values.shippingAddress.isSameAddress
                            )
                          }
                        />
                      }
                    />
                  </Box>

                  {/* SHIPPING FORM */}
                  {!values.shippingAddress.isSameAddress && (
                    <Box>
                      <Typography>Shipping Information</Typography>
                      <AddressForm
                        type="shippingAddress"
                        values={values.shippingAddress}
                        errors={errors}
                        touched={touched}
                        handleBlur={handleBlur}
                        handleChange={handleChange}
                      />
                    </Box>
                  )}
                </Box>
              )}
              {activeStep === 1 && (
                <Box>
                  <Box>
                    <Typography>Contact Info</Typography>
                    <TextField
                      fullWidth
                      type="text"
                      label="Email"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.email}
                      name="email"
                      error={!!touched.email && !!errors.email}
                      helperText={!!touched.email && errors.email}
                    />
                    <TextField
                      fullWidth
                      type="text"
                      label="Phone Number"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.phoneNumber}
                      name="phoneNumber"
                      error={!!touched.phoneNumber && !!errors.phoneNumber}
                      helperText={!!touched.phoneNumber && errors.phoneNumber}
                    />
                  </Box>
                </Box>
              )}
              <Box display="flex" justifyContent="space-between" gap="3rem">
                {activeStep === 1 && (
                  <Button
                    fullWidth
                    variant="contained"
                    color="secondary"
                    onClick={() => setActiveStep(activeStep - 1)}
                  >
                    Back
                  </Button>
                )}
                <Button type="submit" fullWidth variant="contained">
                  {activeStep === 0 ? "Next" : "Place Order"}
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};
export default Checkout;
