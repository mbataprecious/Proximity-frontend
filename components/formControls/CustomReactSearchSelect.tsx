import React, { useId } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { MultiValue, SingleValue } from "react-select";
import ReactSelect from "react-select/async";
import { getErrObject } from "../../utils/helpers";
interface Props {
  label: string;
  name: string;
  options: { value: string; label: string }[];
  isSearchable?: boolean;
  isClearable?: boolean;
  placeholder?: string;
  loadOptions: (
    inputValue: string
  ) => Promise<{ value: string; label: string }[]>;
  isMulti?: boolean;
  required: boolean;
  disabled?: boolean;
}
const CustomSearchSelect = ({
  label,
  name,
  placeholder,
  options,
  loadOptions,
  isMulti,
  required,
  disabled,
}: Props) => {
  const { control, formState } = useFormContext();
  const id = useId();
  return (
    <div id={name} className="control custom-select">
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
            instanceId={id}
            isDisabled={disabled}
            ref={ref}
            placeholder={placeholder}
            isMulti={isMulti}
            defaultOptions={options}
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
                  }>
            ) => onChange(newValue)}
            loadOptions={loadOptions}
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

export { CustomSearchSelect };
