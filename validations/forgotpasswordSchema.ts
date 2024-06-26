import { ref } from "yup";
import { object, string } from "yup";
import { passwordConditions } from "../utils/helpers";

export const forgotSchema = object().shape({
  email: string().label("Email address").email().required(),
});
export const newPasswordSchema = object({
  password: string()
    .label("Password")
    .required()
    .matches(
      passwordConditions.minLengthRegex,
      "Password must have at least 8 characters",
    )
    .matches(
      passwordConditions.minOneLowerCaseRegex,
      "Password must have at least one lowercase letter",
    )
    .matches(
      passwordConditions.minOneUpperCaseRegex,
      "Password must have at least one uppercase letter",
    )
    .matches(
      passwordConditions.minOneNumberRegex,
      "Password must have at least one number",
    )
    .matches(
      passwordConditions.minOneSpecialRegex,
      "Password must have at least one special character",
    ),
  confirmPassword: string()
    .label("Confirm password")
    .required()
    .oneOf([ref("password"), ""], "Passwords must be identical"),
});
