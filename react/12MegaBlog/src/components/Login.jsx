import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logIn as authLogin } from "../Store/authSlice";
import { Button, Input, Logo } from "./index";
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth";
import { useForm } from "react-hook-form";
function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");
  const Login = async (data) => {
    setError("");
    try {
      const session = await authService.logIn(data);
      if (session) {
        const userdata = await authService.isLoggedIn();
        if (userdata) dispatch(authLogin(userdata));
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
        Sign in to your account
      </h2>
      <p className="mt-2 text-center text-base text-black/60">
        Don&apos;t have any account?&nbsp;
        <Link
          to="/signup"
          className="font-medium text-primary transition-all duration-200 hover:underline"
        >
          Sign Up
        </Link>
      </p>
      {/* error display*/}
      {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
      <form onSubmit={handleSubmit(Login)} className="mt-8">
        <div className="space-y-5">
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
            Sign in
          </Button>
        </div>
      </form>
    </div>
  );
}

export default Login;
