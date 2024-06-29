import { useFormContext } from "react-hook-form";
import { getErrObject } from "../../utils/helpers";
import { TextareaHTMLAttributes } from "react";
import { InformationCircleIcon } from "@heroicons/react/24/solid";
interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  label?: string;
  dark?: string;
}
const Textarea = ({ name, label, className, dark, ...rest }: Props) => {
  const { register, formState } = useFormContext();

  return (
    <div className="control">
      {label && (
        <label className="label" htmlFor={name}>
          {label}
        </label>
      )}
      <textarea
        className={`${formState.errors[name] && "errorControl"} ${
          !!dark && "bg-[#F9FAFB]"
        } ${className}`}
        id={name}
        {...register(name)}
        {...rest}
      />
      <p className="errorText text-xs flex items-center">
        {!!getErrObject(name, formState?.errors) && (
          <>
            <span className=" ">
              <InformationCircleIcon className="w-4 h-4 mr-1 inline" />
            </span>
            {getErrObject(name, formState?.errors)?.message}
          </>
        )}
      </p>
    </div>
  );
};

export { Textarea };
