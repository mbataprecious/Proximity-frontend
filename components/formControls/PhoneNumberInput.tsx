import React, { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { getErrObject } from "../../utils/helpers";
import { InformationCircleIcon } from "@heroicons/react/24/solid";

interface Props {
  label?: string;
  miniLabel?: string;
  name: string;
  disabled?: boolean;
  dontShowError?: boolean;
  required?: boolean;
  type?: string;
  placeholder?: string;
  onBlur?: () => void;
}

const PhoneNumberInput = ({
  label,
  miniLabel,
  name,
  dontShowError,
  required,
  placeholder,
  onBlur,
  ...rest
}: Props) => {
  const { control, formState } = useFormContext();
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="relative control">
      {label && (
        <label className="label" htmlFor={name}>
          {label}{" "}
          {required ? (
            <i className="text-xs font-semibold text-[#0275D8]">*</i>
          ) : null}
          {miniLabel && (
            <span className="text-xs text-yellow-500 !font-normal">
              &nbsp; {miniLabel}
            </span>
          )}
        </label>
      )}
      <Controller
        name={name}
        control={control}
        rules={{
          validate: (value) => (required ? isValidPhoneNumber(value) : true),
        }}
        render={({ field: { onChange, value } }) => (
          <PhoneInput
            defaultCountry="SR"
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            onBlur={() => {
              setIsFocused(false);
              onBlur && onBlur();
            }}
            className={`border border-[#DFE1E6] placeholder:font-normal placeholder:text-sm rounded-[0.250rem] px-[0.35rem] ${
              isFocused ? "outline-none ring-1 border-blue-300" : ""
            } `}
            onFocus={() => {
              setIsFocused(true);
              //home
            }}
            id="phone-input"
            {...rest}
          />
        )}
      />
      <div className="errorText text-xs flex items-start ">
        {!!getErrObject(name, formState.errors) && !dontShowError && (
          <>
            <span className=" ">
              <InformationCircleIcon className="w-4 h-4 mr-1 inline" />
            </span>
            {getErrObject(name, formState.errors)?.message}
          </>
        )}
      </div>
    </div>
  );
};

export default PhoneNumberInput;
