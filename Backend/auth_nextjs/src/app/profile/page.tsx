"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
import { get } from "http";

export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = React.useState(null);
  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout successful");
      router.push("/login");
    } catch (error) {
      console.error("An unexpected error occurred:", error);
      toast.error("An unexpected error occurred. Please try again.");
    }
  };

  const getUserDeatils = async () => {
    const res = await axios.get("/api/users/me");
    setData(res.data.data._id);
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Profile Page</h1>
      <hr />
      <h2 className="mt-4">
        User ID:{" "}
        {data === "nothing" ? (
          "nothing"
        ) : (
          <Link href={`/profile/${data}`}>{data}</Link>
        )}
      </h2>
      <button
        onClick={logout}
        className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
      >
        Logout
      </button>

      <button
        onClick={getUserDeatils}
        className="bg-purple-500 text-white px-4 py-2 rounded mt-4"
      >
        get User Deatils
      </button>
    </div>
  );
  //to grab a particular id we created a new folder with the name [id] and inside that we created a page.tsx file
}
