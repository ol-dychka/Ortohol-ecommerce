import { Box, TextField, useMediaQuery } from "@mui/material";
import { FormikErrors, FormikTouched, getIn } from "formik";
import {
  BillingFormValues,
  CheckoutFormValues,
} from "../../models/CheckoutFormValues";

type Props = {
  type: string;
  values: BillingFormValues;
  errors: FormikErrors<CheckoutFormValues>;
  touched: FormikTouched<CheckoutFormValues>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleBlur: (e: React.FocusEvent<any, Element>) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleChange: (e: React.ChangeEvent<any>) => void;
};
const AddressForm = ({
  type,
  values,
  errors,
  touched,
  handleBlur,
  handleChange,
}: Props) => {
  const isMobile = useMediaQuery("(max-width:750px");

  // better readability
  const formattedName = (field: string) => `${type}.${field}`;
  const formattedError = (field: string) =>
    Boolean(
      getIn(touched, formattedName(field)) &&
        getIn(errors, formattedName(field))
    );
  const formattedHelper = (field: string) =>
    getIn(touched, formattedName(field)) &&
    `${field.charAt(0).toUpperCase() + field.slice(1)} is Required`;

  return (
    <Box
      display="grid"
      gap="1rem"
      gridTemplateColumns="repeat(4, minmax(0, 1fr))"
      sx={{
        "& > div": {
          gridColumn: isMobile ? "span 4" : undefined,
        },
      }}
    >
      <TextField
        fullWidth
        type="text"
        label="First Name"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.firstName}
        name={formattedName("firstName")}
        error={formattedError("firstName")}
        helperText={formattedHelper("firstName")}
        sx={{ gridColumn: "span 2" }}
      />
      <TextField
        fullWidth
        type="text"
        label="Last Name"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.lastName}
        name={formattedName("lastName")}
        error={formattedError("lastName")}
        helperText={formattedHelper("lastName")}
        sx={{ gridColumn: "span 2" }}
      />
      <TextField
        fullWidth
        type="text"
        label="Country"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.country}
        name={formattedName("country")}
        error={formattedError("country")}
        helperText={formattedHelper("country")}
        sx={{ gridColumn: "span 4" }}
      />
      <TextField
        fullWidth
        type="text"
        label="Street Address"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.street1}
        name={formattedName("street1")}
        error={formattedError("street1")}
        helperText={formattedHelper("street1")}
        sx={{ gridColumn: "span 2" }}
      />
      <TextField
        fullWidth
        type="text"
        label="Street Address 2 (Optional)"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.street2}
        name={formattedName("street2")}
        error={formattedError("street2")}
        helperText={formattedHelper("street2")}
        sx={{ gridColumn: "span 2" }}
      />
      <TextField
        fullWidth
        type="text"
        label="City"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.city}
        name={formattedName("city")}
        error={formattedError("city")}
        helperText={formattedHelper("city")}
        sx={{ gridColumn: "span 2" }}
      />
      <TextField
        fullWidth
        type="text"
        label="State"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.state}
        name={formattedName("state")}
        error={formattedError("state")}
        helperText={formattedHelper("state")}
        sx={{ gridColumn: "1fr" }}
      />
      <TextField
        fullWidth
        type="text"
        label="Zip Code"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.zipCode}
        name={formattedName("zipCode")}
        error={formattedError("zipCode")}
        helperText={formattedHelper("zipCode")}
        sx={{ gridColumn: "1fr" }}
      />
    </Box>
  );
};
export default AddressForm;
