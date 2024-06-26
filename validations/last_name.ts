import { string } from "yup";

export const last_name = string()
  .label("last name")
  .trim()
  .required()
  .min(2)
  .max(50);
