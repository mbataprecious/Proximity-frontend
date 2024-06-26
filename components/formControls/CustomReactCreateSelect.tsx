import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { MultiValue, SingleValue } from "react-select";
import ReactSelect from "react-select/creatable";
import { getErrObject } from "../../utils/helpers";
interface Props {
  label: string;
  name: string;
  options: { value: string; label: string }[];
  isSearchable?: boolean;
  // loadOptions:(inputValue: string)=>Promise<{ value: string; label: string }[]>;
  // onCreateOption:(inputValue:string)=>{ value: string; label: string }
  isClearable?: boolean;
  placeholder?: string;
  isMulti?: boolean;
  required: boolean;
  disabled?: boolean;
}
const CustomCreateSelect = ({
  label,
  name,
  placeholder,
  options,
  // loadOptions,
  // onCreateOption,
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
            id={name}
            isDisabled={disabled}
            ref={ref}
            placeholder={placeholder}
            // onCreateOption={onCreateOption}
            isMulti={isMulti}
            options={options}
            className={`border-0 w-full  my-0.5 focus:outline-none focus:ring focus:border-blue-300 shadow-none
                            ${formState.errors[name] && "errorControl"}`}
            onBlur={onBlur}
            value={value}
            onChange={(
              newValue:
                | MultiValue<
                    | { value: string; label: string }[]
                    | { value: string; label: string }
                  >
                | SingleValue<{
                    value: string;
                    label: string;
                  }>,
            ) => onChange(newValue)}
            // loadOptions={loadOptions}
          />
        )}
      />
      <p className="errorText">
        {!!getErrObject(name, formState?.errors) && (
          <>{getErrObject(name, formState?.errors)?.value.message}</>
        )}
      </p>
    </div>
  );
};

export { CustomCreateSelect };
