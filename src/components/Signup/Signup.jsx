import React from "react";
import { useState } from "react";
import authServices from "../../appwrite/authServ";
import { login } from "../../sotre/authSlice";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { Button, Input, Logo } from "../index";

function Signup() {
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const formSignup = async (data) => {
    setError("");
    try {
      console.log("signup.try");
      console.log(data);
      const session = await authServices.createAccount({ ...data });
      console.log(session)
      if (session) {
        console.log("signup.session");
        const userData = await authServices.getUserAccount();
        if (userData) {
          console.log("signup.userdata");
          dispatch(login(userData));
        }
        console.log("signup.navigate");
        navigate("/");
      }
    } catch (error) {
      setError(error.messege);
    }
  };
  return (
    <>
      <div
        className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}
      >
        <div className="mb-2 flex w-5/6 justify-center space-x-5 mx-auto">
          <span className="inline-block max-w-[50px]">
            <Logo width="100%" />
          </span>
          <h2 className="text-center text-2xl py-2 font-bold leading-tight text-black">
            Create to your account
          </h2>
        </div>
        <div className="h-px w-full bg-gray-800 mb-8" ></div>
        {error && <p className="mt-8 text-center text-red-700">{error}</p>}
        <form onSubmit={handleSubmit(formSignup)}>
          <div className="space-y-5">
            <Input
              labelText="Name :"
              type="text"
              placeholder="Enter your name"
              {...register("name", {
                required: true,
              })}
            />
            <Input
              labelText="Email :"
              type="email"
              placeholder="Enter your Email"
              {...register("email", {
                required: true,
                validate: {
                  matchPatern: (value) =>
                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ||
                    "Email address must be a valid address",
                },
              })}
            />
            <Input
              labelText="Password :"
              type="password"
              placeholder="Enter your password"
              {...register("password", {
                required: true,
              })}
            />
            <Button type="submit" className="w-full">
              Create Account
            </Button>
          </div>
        </form>
        <p className="mt-2 text-center text-base text-black/60">
          Already have an account &nbsp;
          <Link
            to="/login"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign In
          </Link>
        </p>
      </div>
    </>
  );
}

export default Signup;
