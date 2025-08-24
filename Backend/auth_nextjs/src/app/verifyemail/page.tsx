"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { on } from "events";
import toast from "react-hot-toast";
import { set } from "mongoose";
import { sendEmail } from "@/helpers/mailer";
export default function VerifyEmailPage() {
  const [token, setToken] = React.useState("");
  const [verified, setVerified] = React.useState(false);
  const [error, setError] = React.useState(false);

  const verifyUserEmail = async () => {
    try {
      axios.post("/api/users/verifyemail", { token });
      setVerified(true);
    } catch (error: unknown) {
      setError(true);
      if (error instanceof Error) {
        console.log("Error", error.message);
      }
    }
  };
  useEffect(() => {
    const url = window.location.href;
    const urlToken = url.split("token=")[1];
    if (urlToken) {
      setToken(urlToken || "");
    }
  }, []);
  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl">Email Verification</h1>
      <h2 className="p-2 bg-orange-400">{token ? `${token}` : "no token"}</h2>
      <hr />
      {!verified && !error && <h2>Verifying your email...</h2>}
      {verified && (
        <h2 className="text-green-600 text-2xl">
          Your email is verified. You can now <br></br>
          <Link href="/login">Login</Link>
        </h2>
      )}
      {error && (
        <h2 className="text-red-600 text-2xl">
          Error verifying your email. Please try again or contact support.
        </h2>
      )}
    </div>
  );
}
