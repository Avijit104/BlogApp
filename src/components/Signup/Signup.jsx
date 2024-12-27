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
      const session = await authServices.authAccount(data);
      if (session) {
        const userData = await authServices.getUserAccount();
        if (userData) {
          dispatch(login(userData));
        }
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
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
          Already have an account
          <Link
            to="/login"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign In
          </Link>
        </p>
        {error && <p className="mt-8 text-center text-red-700">{error}</p>}
        <form onSubmit={handleSubmit(Signup)}>
          <div className="space-y-5">
            <Input
              labelText="name"
              type="text"
              placeholder="Enter your name"
              {...register("name", {
                required: true,
              })}
            />
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
      </div>
    </>
  );
}

export default Signup;