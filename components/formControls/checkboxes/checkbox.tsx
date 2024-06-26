import { useFormContext } from "react-hook-form";
import { getErrObject } from "../../../utils/helpers";
interface Props {
  name: string;
  label?: string;
  disabled?: boolean;
  className?: string;
}
const Checkbox = ({ name, label, disabled, ...rest }: Props) => {
  const { register, formState } = useFormContext();

  return (
    <div className="control">
      <label
        htmlFor={name}
        className={`cursor-pointer checkbox flex items-center ${
          getErrObject(name, formState.errors) && "errorControl"
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
      <div className="errorText text-xs flex items-start ">
        {getErrObject(name, formState.errors) && (
          <>{getErrObject(name, formState.errors)?.message}</>
        )}
      </div>
    </div>
  );
};

export { Checkbox };
