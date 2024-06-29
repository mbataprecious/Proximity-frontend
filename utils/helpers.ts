import { yupResolver as yupResolvers } from "@hookform/resolvers/yup";
import { format } from "date-fns";
import { FieldValues } from "react-hook-form";

const isClient = () => typeof window === "object";

const yupResolver = isClient() ? yupResolvers : undefined;

export const formatDate = (date: string | number | Date) => {
  if (!date) return "";
  return format(new Date(date), "MMMM dd, yyyy");
};

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

const monthList = [
  { value: "January", label: "January" },
  { value: "February", label: "February" },
  { value: "March", label: "March" },
  { value: "April", label: "April" },
  { value: "May", label: "May" },
  { value: "June", label: "June" },
  { value: "July", label: "July" },
  { value: "August", label: "August" },
  { value: "September", label: "September" },
  { value: "October", label: "October" },
  { value: "November", label: "November" },
  { value: "December", label: "December" },
];
export const monthOptions = monthList.map((list) => ({
  ...list,
  value: list.value.toUpperCase(),
  label: list.label.toUpperCase(),
}));

export const getErrObject = (name: string, errors: FieldValues) => {
  const nameArray = name.split(".");
  return nameArray.reduce(function (acc, item) {
    if (!acc) return null;
    if (acc[item]) {
      return acc[item];
    } else {
      return null;
    }
  }, errors as FieldValues);
};

const passwordConditions = {
  minLengthRegex: /^.{8,}$/,
  minOneLetterRegex: /[a-z]/i,
  minOneUpperCaseRegex: /.*[A-Z].*/,
  minOneLowerCaseRegex: /.*[a-z].*/,
  minOneNumberRegex: /\d{1,}/,
  minOneSpecialRegex: /[-+_!@#$%^&*.,?]/,
  nameRegexChecker: /^(?![ .]+$)[a-zA-Z .-]*$/i,
};

const url = (endpoint: string) =>
  `${process.env.NEXT_PUBLIC_BACKEND_URL}${endpoint}`;

export function classNames(
  ...classes: (string | false | null | undefined)[]
): string {
  return classes.filter(Boolean).join(" ");
}
export { isClient, yupResolver, passwordConditions, scrollToTop, url };
