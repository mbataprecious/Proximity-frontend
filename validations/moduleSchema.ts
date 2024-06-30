import Yup, { array, object, string } from "yup";

export const moduleSchema = object().shape({
  title: string().label("Title").required("Title is required"),
  description: string()
    .label("Description")
    .required("Description is required"),
  code: string().label("Code").required("Code is required"),
});

export type ModuleType = Yup.InferType<typeof moduleSchema>;

export const addEmailsSchema = object().shape({
  emails: array().of(
    object({
      value: string().email().required().label("email"),
      label: string().label("label"),
    })
  ),
});
export type AddEmailsSchemaType = Yup.InferType<typeof addEmailsSchema>;
