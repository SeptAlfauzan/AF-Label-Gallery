import React, { FormEvent } from "react";
import {
  DeepMap,
  FieldError,
  FieldValue,
  FieldValues,
  Path,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";

export type InputHookProps<TFormValues> = {
  name: Path<TFormValues>;
  // register?: () => UseFormRegister<TFormValues>;
  register?: () => void;
  errors?: Partial<DeepMap<TFormValues, FieldError>>;
} & Omit<React.HTMLAttributes<HTMLInputElement>, "name">;

export const InputHooks = <TFormValues extends Record<string, unknown>>({
  name,
  register,
  errors,
  className,
  ...props
}: InputHookProps<TFormValues>): JSX.Element => {
  return (
    <div className="flex flex-col my-2">
      <label className="text-zinc-300">{name}</label>
      <input
        {...props}
        className="border rounded px-3"
        {...register}
        placeholder={props.placeholder}
      />
      {errors?.name && <p>{errors.name.message}</p>}
    </div>
  );
};

export default InputHooks;
