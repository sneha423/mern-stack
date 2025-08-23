"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { on } from "events";
import toast from "react-hot-toast";
import { set } from "mongoose";

export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
    username: "",
  });
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const onSignup = async () => {
    try {
      setLoading(true);
      const response = axios.post("/api/users/signup", user);
      console.log("Signup success", response);
      router.push("/login");
      toast.success("Signup success! Please login");
    } catch (error: unknown) {
      toast.error("Something went wrong");
      if (error instanceof Error) {
        console.log("Error", error.message);
      }
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>{loading ? "processing" : "Signup"}</h1>
      <hr />
      <label htmlFor="username">username</label>
      <input
        className="p-2 border-amber-700"
        id="username"
        type="text"
        value={user.username}
        onChange={(e) => {
          setUser({ ...user, username: e.target.value });
        }}
        placeholder="username"
      ></input>

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
      <button
        onClick={onSignup}
        className="p-2 border-gray-50 rounded-lg mb-4 focus:outline-amber-100 focus:border-gray-200"
      >
        {buttonDisabled ? "Fill all the details" : "Signup"}
      </button>
      <Link href="/login">visit login page</Link>
    </div>
  );
}
