import Yup, { array, boolean, number, object, string } from "yup";

export const sessionSchema = object().shape({
  hour: number().positive().label("hour").required("hour is required"),
  minute: object().shape({
    value: string().required().label("minute"),
    label: string().required().label("label"),
  }),
  radius: number().positive().label("radius").required("radius is required"),
  geofencing: boolean().required(),
  location: object().shape({
    value: string().required().label("location"),
    label: string().required().label("label"),
  }),
});

export type SessionType = Yup.InferType<typeof sessionSchema>;
