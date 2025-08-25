"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });
  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      console.log("Login success", response.data);
      toast.success("Login successful");
      router.push("/profile");
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };
  const onForgotPassword = () => {
    router.push("/forgotPassword");
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>{loading ? "processing" : "login"}</h1>
      <hr />

      <label htmlFor="email">email</label>
      <input
        className="p-2 border-amber-700"
        id="email"
        type="text"
        value={user.email}
        onChange={(e) => {
          setUser({ ...user, email: e.target.value });
        }}
        placeholder="email"
      ></input>

      <label htmlFor="password">password</label>
      <input
        className="p-2 border-amber-700"
        id="password"
        type="password"
        value={user.password}
        onChange={(e) => {
          setUser({ ...user, password: e.target.value });
        }}
        placeholder="password"
      ></input>
      <button onClick={onForgotPassword} className="border-b-blue-700 mt-2">
        Forgot Password?
      </button>
      <button
        onClick={onLogin}
        className="p-2 border-amber-600rounded-lg mb-4 focus:outline-amber-100 focus:border-gray-200"
      >
        {buttonDisabled ? "Fill all the details" : "login"}
      </button>
      <Link href="/signup">visit signup here</Link>
    </div>
  );
}
