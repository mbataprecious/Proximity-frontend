import Yup, { object, boolean, string, ref } from "yup";
import { first_name } from "./firstName";
import { passwordConditions } from "../utils/helpers";
import { email } from "./email";
import { last_name } from "./last_name";

export const SignupSchema = object({
  first_name,
  last_name,
  email,
  acceptedTermsAndConditions: boolean().oneOf(
    [true],
    "Must Accept Terms and Conditions"
  ),
  role: object().shape({
    value: string().required().label("role"),
    label: string().required().label("label"),
  }),
  password: string()
    .label("Password")
    .required()
    .matches(
      passwordConditions.minLengthRegex,
      "Password must have at least 8 characters"
    )
    .matches(
      passwordConditions.minOneLowerCaseRegex,
      "Password must have at least one lowercase letter"
    )
    .matches(
      passwordConditions.minOneUpperCaseRegex,
      "Password must have at least one uppercase letter"
    )
    .matches(
      passwordConditions.minOneNumberRegex,
      "Password must have at least one number"
    )
    .matches(
      passwordConditions.minOneSpecialRegex,
      "Password must have at least one special character"
    ),
  confirmPassword: string()
    .label("Confirm password")
    .required()
    .oneOf([ref("password"), ""], "Passwords must be identical"),
});
export type SignupSchemaType = Yup.InferType<typeof SignupSchema>;

export const ChangePasswordSchema = object({
  oldPassword: string().required("Old Password is required"),
  password: string()
    .label("Password")
    .required()
    .matches(
      passwordConditions.minLengthRegex,
      "Password must have at least 8 characters"
    )
    .matches(
      passwordConditions.minOneLowerCaseRegex,
      "Password must have at least one lowercase letter"
    )
    .matches(
      passwordConditions.minOneUpperCaseRegex,
      "Password must have at least one uppercase letter"
    )
    .matches(
      passwordConditions.minOneNumberRegex,
      "Password must have at least one number"
    )
    .matches(
      passwordConditions.minOneSpecialRegex,
      "Password must have at least one special character"
    ),
});

export type ChangePasswordSchemaType = Yup.InferType<
  typeof ChangePasswordSchema
>;
