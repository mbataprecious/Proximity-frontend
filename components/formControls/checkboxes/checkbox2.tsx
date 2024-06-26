import { useFormContext } from "react-hook-form";
interface Props {
  name: string;
  subtitle?: string;
  label?: string;
  extraCSS?: string;
  onclick?: () => void;
  disabled?: boolean;
}
const Checkbox2 = ({
  name,
  subtitle,
  label,
  extraCSS,
  onclick,
  disabled,
  ...rest
}: Props) => {
  const { register, formState } = useFormContext();

  return (
    <div className="control">
      <label
        htmlFor={name}
        className={`cursor-pointer checkbox flex items-center ${
          formState.errors[name] && "errorControl"
        }`}
      >
        <input
          className="rounded-sm checked:bg-[#439EDE]"
          type="checkbox"
          id={name}
          disabled={disabled}
          {...register(name)}
          {...rest}
        />
        <span className="ml-2 text-xs text-[#727891]">{label}</span>
      </label>
      {subtitle && (
        <span
          className={`${extraCSS ? extraCSS : "text-[#4388C8] text-xs"}`}
          onClick={onclick}
        >
          {subtitle}
        </span>
      )}
      <div className="errorText text-xs flex items-start ">
        {formState.errors[name] && <>{formState.errors[name]?.message}</>}
      </div>
    </div>
  );
};

export { Checkbox2 };
