import { string } from "yup";

export const first_name = string()
  .label("First name")
  .required()
  .min(2)
  .max(50)
  .matches(/^[a-zA-Z]+$/, "First name must be a word");
