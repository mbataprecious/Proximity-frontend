import Yup, { object, string } from "yup";

export const loginSchema = object().shape({
  email: string().label("Email address").email().required("Email is required"),
  password: string().required("Password is required").label("Password"),
});

export type LoginSchemaType = Yup.InferType<typeof loginSchema>;
