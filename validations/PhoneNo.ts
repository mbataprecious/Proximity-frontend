import { string } from "yup";
import { isValidPhoneNumber } from "react-phone-number-input";

export const phoneNo = string()
  .trim()
  .label("Phone Number")
  .required()
  .test({
    name: "is valid phone number",
    test: (value) => isValidPhoneNumber(value as string)
  });
