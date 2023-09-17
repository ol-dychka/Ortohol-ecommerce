export interface CheckoutFormValues {
  billingAddress: BillingFormValues;
  shippingAddress: {
    isSameAddress: boolean;
    firstName: string;
    lastName: string;
    country: string;
    street1: string;
    street2: string;
    city: string;
    state: string;
    zipCode: string;
  };
  email: string;
  phoneNumber: string;
}

export interface BillingFormValues {
  firstName: string;
  lastName: string;
  country: string;
  street1: string;
  street2: string;
  city: string;
  state: string;
  zipCode: string;
}
