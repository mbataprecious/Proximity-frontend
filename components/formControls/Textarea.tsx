import { useFormContext } from "react-hook-form";
import { getErrObject } from "../../utils/helpers";
import { TextareaHTMLAttributes } from "react";
interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  label?: string;
}
const Textarea = ({ name, label, className, ...rest }: Props) => {
  const { register, formState } = useFormContext();

  return (
    <div className="control">
      {label && (
        <label className="label" htmlFor={name}>
          {label}
        </label>
      )}
      <textarea
        className={`${formState.errors[name] && "errorControl"} ${className}`}
        id={name}
        {...register(name)}
        {...rest}
      />
      <p className="errorText">
        {!!getErrObject(name, formState?.errors) && (
          <>{getErrObject(name, formState?.errors)?.message}</>
        )}
      </p>
    </div>
  );
};

export { Textarea };
