import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import ReactSelect, {
  CSSObjectWithLabel,
  ControlProps,
  MultiValue,
  SingleValue,
} from "react-select";
import { getErrObject, selectStyle } from "../../utils/helpers";
import { InformationCircleIcon } from "@heroicons/react/24/solid";
interface Props {
  label: string;
  name: string;
  isSearchable?: boolean;
  isClearable?: boolean;
  placeholder?: string;
  options?: { value: string; label: string }[];
  isMulti?: boolean;
  required?: boolean;
  disabled?: boolean;
}

const CustomSelect = ({
  label,
  name,
  isSearchable,
  isClearable,
  placeholder,
  options,
  isMulti,
  required,
  disabled,
}: Props) => {
  const { control, formState } = useFormContext();

  return (
    <div className="control custom-select">
      {label && (
        <label className="label" htmlFor={name}>
          {label} {required && <i className="text-xs text-[#0275D8]">*</i>}
        </label>
      )}

      <Controller
        control={control}
        name={name}
        render={({ field: { onBlur, onChange, value, ref } }) => (
          <ReactSelect
            classNamePrefix="custom-select"
            styles={selectStyle}
            isDisabled={disabled}
            ref={ref}
            id={name}
            placeholder={placeholder}
            options={options}
            isMulti={isMulti}
            isClearable={isClearable}
            isSearchable={isSearchable}
            className={`border-0 w-full focus:outline-none focus:ring focus:border-blue-300
                            ${formState.errors[name] && "errorControl"}`}
            onBlur={onBlur}
            value={value?.length || value?.value ? value : null}
            onChange={(
              newValue:
                | MultiValue<
                    | { value: string; label: string }[]
                    | { value: string; label: string }
                  >
                | SingleValue<{
                    value: string;
                    label: string;
                  }>
            ) => onChange(newValue)}
          />
        )}
      />
      <div className="errorText text-xs flex items-center">
        {!!getErrObject(name, formState?.errors) && (
          <>
            <span className=" ">
              <InformationCircleIcon className="w-4 h-4 mr-1 inline" />
            </span>
            {getErrObject(name, formState?.errors)?.value.message}
          </>
        )}
      </div>
    </div>
  );
};

export { CustomSelect };
