import Yup, { object, string } from "yup";

export const moduleSchema = object().shape({
  title: string().label("Title").required("Title is required"),
  description: string()
    .label("Description")
    .required("Description is required"),
  code: string().label("Code").required("Code is required"),
});

export type ModuleType = Yup.InferType<typeof moduleSchema>;
