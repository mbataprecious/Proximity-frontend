import Yup, { array, boolean, number, object, string, mixed } from "yup";

export const sessionSchema = object().shape({
  hour: number().min(0).label("hour").required("hour is required"),
  minute: object().shape({
    value: string().required().label("minute"),
    label: string().required().label("label"),
  }),
  radius: mixed()
    .test(
      "radius-test",
      "Radius must be a positive number or a string",
      function (text) {
        const value = Number(text);
        if (typeof value === "number") {
          return value >= 0;
        }
        return typeof value === "string";
      }
    )
    .required("radius is required"),
  geofencing: boolean().required(),
  location: object().shape({
    value: string().required().label("location"),
    label: string().required().label("label"),
  }),
});

export type SessionType = Yup.InferType<typeof sessionSchema>;
