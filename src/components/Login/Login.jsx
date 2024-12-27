import React from "react";
import { Link, useNavigate } from "react-router";
import { login } from "../../sotre/authSlice";
import { Button, Input, Logo } from "../index";
import authServices from "../../appwrite/authServ";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = React.useState("");

  const formLogin = async (data) => {
    setError("");
    try {
      const session = await authServices.authLogin(data);
      if (session) {
        const userData = await authServices.getUserAccount();
        if (userData) {
          dispatch(login(userData));
        }
      }
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <div className="flex items-center justify-center w-full">
      <div
        className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}
      >
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center font-bold leading-tight text-2xl">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
          don&apos;t have any account
          <Link
            to="/signup"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign Up
          </Link>
        </p>
        {error && <p className="mt-8 text-center text-red-700">{error}</p>}
        <form className="mt-8" onSubmit={handleSubmit(formLogin)}>
          <div className="space-y-5">
            <Input
              labelText="Email"
              type="email"
              placeholder="enter your Email"
              {...register("email", {
                required: true,
                validate: {
                  matchPattern: (value) =>
                    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
                      value
                    ) || "enter a valuid email address",
                },
              })}
            />

            <Input
              labelText="Password"
              type="password"
              placeholder="Enter your passowrd"
              {...register("password", {
                required: true,
              })}
            />
            <Button className="w-full" type="submit" >Login</Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
