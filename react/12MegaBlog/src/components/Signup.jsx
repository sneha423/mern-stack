import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Input, Logo } from "./index";
import { Link, useNavigate } from "react-router-dom";
import authService from "../appwrite/auth";
import { useForm } from "react-hook-form";
import { logIn } from "../Store/authSlice";
function Signup() {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [register, handleSubmit] = useForm();
  const signup = async (data) => {
    setError("");
    try {
      const session = await authService.createAccount(data);
      if (session) {
        const userdata = await authService.isLoggedIn();
        if (userdata) dispatch(logIn(userdata));
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <div className="flex items-center justify-center w-full">
      <div className="mb-2 flex justify-center">
        <span className="inline-block w-full max-w-[100px]">
          <Logo width="100%" />
        </span>
      </div>
      <h2 className="text-center text-2xl font-bold leading-tight">
        Sign up to your account
      </h2>
      <p className="mt-2 text-center text-base text-black/60">
        Don&apos;t have any account?&nbsp;
        <Link
          to="/signup"
          className="font-medium text-primary transition-all duration-200 hover:underline"
        >
          Sign In
        </Link>
      </p>
      {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
      <form onSubmit={handleSubmit(signup)}>
        <div className="space-y-5">
          <Input
            label="Fullname:"
            placeholder="enterr fullname"
            {...register("name", {
              required: true,
            })}
          />
          <Input
            label="Email"
            placeholder="enter your email"
            type="email"
            {...register("email", {
              required: true,
              validate: {
                matchPatern: (value) =>
                  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                  "Email address must be a valid address",
              },
            })}
          />
          <Input
            label="Password"
            type="password"
            placeholder="enter your password"
            {...register("password", { required: true })}
          />
          <Button type="submit" className="w-full">
            Create account
          </Button>
        </div>
      </form>
    </div>
  );
}

export default Signup;
