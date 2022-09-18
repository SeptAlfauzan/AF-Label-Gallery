import { Product, User } from "@prisma/client";
import axios from "axios";
import { NextPage } from "next";
import React, { HtmlHTMLAttributes, InputHTMLAttributes } from "react";
import { Path, useForm, UseFormRegister } from "react-hook-form";

const Auth: NextPage = () => {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<User>();

  const onSubmit = handleSubmit(async (data: User) => {
    try {
      await axios.post("/api/auth", data);
      alert();
    } catch (error) {
      alert(error);
    }
  });

  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <form
        onSubmit={onSubmit}
        className="w-fit h-40 bg-white shadow flex flex-col gap-5"
      >
        <h3>Admin Login</h3>
        <Input label="Username" register={register} name="username" />
        <Input
          label="Password"
          type={"password"}
          register={register}
          name="password"
        />
        <button type="submit">login</button>
      </form>
    </div>
  );
};
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: Path<User>;
  register?: UseFormRegister<User>;
}
const Input: React.FC<InputProps> = ({ label, register, name, ...props }) => {
  const { className, type, ...rest } = props;
  return (
    <div className="w-full h-fit relative">
      <label>{label}</label>
      <input
        {...rest}
        className={`border ${className}`}
        type={type}
        {...(register && register(name))}
      />
    </div>
  );
};

export default Auth;
