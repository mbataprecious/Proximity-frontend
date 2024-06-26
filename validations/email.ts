import { string } from "yup";

export const email = string()
  .label("Email address")
  .typeError("Valid email address is required")
  .required()
  .email()
  .max(75);
