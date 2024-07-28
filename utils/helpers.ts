import { yupResolver as yupResolvers } from "@hookform/resolvers/yup";
import { format } from "date-fns";
import { ReadonlyURLSearchParams } from "next/navigation";
import { FieldValues } from "react-hook-form";
import toast from "react-hot-toast";
import { CSSObjectWithLabel, ControlProps } from "react-select";

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

export const selectStyle = {
  control: (baseStyles: CSSObjectWithLabel, state: any) => ({
    ...baseStyles,
    paddingTop: 8,
    paddingBottom: 8,
    borderRadius: 8,
    background: "white",
    boxShadow: "none",
    borderColor: "#EEEEEE",
    ...(state.isFocused ? { borderColor: "#008DFB" } : {}),
    // "&:hover": {
    //   // Additional hover styling
    //   borderColor: "#EEEEEE",
    //   boxShadow: "none",
    // },
    "&:focus": {
      // Additional hover styling
      borderColor: "#008DFB",
      boxShadow: "none",
    },
  }),
  menu: (provided: CSSObjectWithLabel) => ({
    ...provided,
    border: "1px solid #CCD1D2",
    borderRadius: 8,
    fontSize: 14,
    color: "#667479",
    // margin: "0",
    boxShadow: "none",
  }),
};

export const getSearchParamsObject = (
  searchParams: ReadonlyURLSearchParams
) => {
  const query = {} as { [key: string]: string };
  for (const [key, value] of searchParams.entries()) {
    query[key] = value;
  }
  return query;
};

export const userTypeToPathMap = {
  lecturer: { name: "lecturer", path: "/admin" },
  student: { name: "student", path: "/student" },
};

function getRandomDigit(): number {
  return Math.floor(Math.random() * 10);
}

export function generatePhoneNumber(): string {
  const areaCode = Array.from({ length: 3 }, getRandomDigit).join("");
  const centralOfficeCode = Array.from({ length: 3 }, getRandomDigit).join("");
  const lineNumber = Array.from({ length: 4 }, getRandomDigit).join("");

  return `${areaCode}-${centralOfficeCode}-${lineNumber}`;
}

export const validateEmail = (email: string): boolean => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const getGeoLocation = (
  successCallback: (position: GeolocationPosition) => void
) => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
  } else {
    console.log("Geolocation is not supported by this browser.");
    toast.error("Geolocation is not supported by this browser.");
  }
};

function errorCallback(error: GeolocationPositionError) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      console.error("User denied the request for Geolocation.");
      toast.error("Please allow geolocation access to use this feature.");
      break;
    case error.POSITION_UNAVAILABLE:
      console.error("Location information is unavailable.");
      toast.error("Location information is unavailable.");
      break;
    case error.TIMEOUT:
      console.error("The request to get user location timed out.");
      toast.error("The request to get user location timed out.");
      break;
  }
}

export const copyTextToClipboard = async (text: string) => {
  if (navigator.clipboard) {
    try {
      await navigator.clipboard.writeText(text);
      alert("Text copied to clipboard");
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  } else {
    // Fallback for older browsers
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);
  }
};
export { isClient, yupResolver, passwordConditions, scrollToTop, url };
