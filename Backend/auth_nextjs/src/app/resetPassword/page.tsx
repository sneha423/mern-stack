"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token"); // ✅ from email link

  const [newPassword, setNewPassword] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const onResetPassword = async () => {
    if (!token) {
      toast.error("Invalid or missing token");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post("/api/users/resetpassword", {
        token,
        newPassword,
      });
      console.log("Reset Password success", response.data);
      toast.success("Password reset successful! Redirecting to login...");
      setTimeout(() => router.push("/login"), 2000);
    } catch (error: unknown) {
      toast.error("Something went wrong");
      if (error instanceof Error) {
        console.log("Error", error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    setButtonDisabled(newPassword.trim().length === 0);
  }, [newPassword]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-2xl font-bold mb-4">
        {loading ? "Processing..." : "Reset Password"}
      </h1>
      <input
        className="p-2 border border-amber-700 rounded w-72"
        id="newPassword"
        type="password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        placeholder="Enter new password"
      />
      <button
        disabled={buttonDisabled || loading}
        onClick={onResetPassword}
        className="bg-amber-700 text-white font-bold py-2 px-4 rounded mt-4 hover:bg-amber-500 disabled:opacity-50"
      >
        {loading ? "Processing..." : "Reset Password"}
      </button>
      <hr className="my-4 w-full max-w-sm" />
      <div className="flex gap-2">
        <p>Remember your password?</p>
        <Link className="text-amber-700 font-bold" href="/login">
          Login
        </Link>
      </div>
    </div>
  );
}
