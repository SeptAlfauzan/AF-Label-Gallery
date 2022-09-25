import { Product, User } from "@prisma/client";
import axios from "axios";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { HtmlHTMLAttributes, InputHTMLAttributes } from "react";
import { Path, useForm, UseFormRegister } from "react-hook-form";

const Auth: NextPage = () => {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<User>();

  const router = useRouter();

  const onSubmit = handleSubmit(async (data: User) => {
    try {
      const response = await axios.post("/api/auth", data);
      response.data === true
        ? router.push("/admin")
        : alert("Wrong data inputed! Please check your username and password.");
    } catch (error) {
      alert(error);
    }
  });

  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <form
        onSubmit={onSubmit}
        className="w-fit bg-white shadow flex flex-col gap-5 px-8 rounded border py-5"
      >
        <h3 className="font-bold">Admin Login</h3>
        <Input
          label="Username"
          register={register}
          name="username"
          className="border rounded bg-zinc-100"
        />
        <Input
          label="Password"
          type={"password"}
          register={register}
          name="password"
          className="border rounded bg-zinc-100"
        />
        <button type="submit" className="bg-black text-white">
          login
        </button>
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
    <div className="w-full h-fit relative flex flex-col">
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
