import { object, string, boolean } from "yup";
import { first_name } from "./firstName";
import { phoneNo } from "./PhoneNo";
import { email } from "./email";
import { last_name } from "./last_name";

export const ContactSchema = object({
  firstname: first_name,
  lastname: last_name,
  mobilephone: phoneNo,
  email,
  acceptedTermsAndConditions: boolean()
    .oneOf([true], "You must accept the privacy policy.")
    .required("You must accept the privacy policy."),
  company: string().required().label("Company Name"),
  jobtitle: string().required().label("Job title"),
  message: string().required().label("message")
});

export const DemoSchema = object({
  firstname: first_name,
  lastname: last_name,
  phone: phoneNo,
  email,
  acceptedTermsAndConditions: boolean()
    .oneOf([true], "You must accept the privacy policy.")
    .required("You must accept the privacy policy."),
  company: string().required().label("Company Name"),
  jobtitle: string().required().label("Job title")
});

export const BrochureSchema = object({
  firstname: first_name,
  lastname: last_name,
  email
});
