"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { on } from "events";
import toast from "react-hot-toast";
import { set } from "mongoose";
import { sendEmail } from "@/helpers/mailer";

export default function ForgotPasswordPage() {
  const [email, setEmail] = React.useState("");
  const router = useRouter();
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const onForgotPassword = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/forgotPassword", { email });
      console.log("Forgot Password success", response);
      toast.success("Forgot Password email sent! Please check your email");
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
    if (email.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [email]);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>{loading ? "processing" : "Forgot Password"}</h1>
      <hr />
      <label htmlFor="email">email</label>
      <input
        className="p-2 border-amber-700"
        id="email"
        type="email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        placeholder="email"
      />
      <button
        disabled={buttonDisabled}
        onClick={onForgotPassword}
        className="bg-amber-700 text-white font-bold py-2 px-4 rounded mt-4 hover:bg-amber-500 disabled:opacity-50"
      >
        Send Reset Link
      </button>
    </div>
  );
}
