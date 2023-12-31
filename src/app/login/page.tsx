"use client";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import Loader from "../components/Loader";

export default function LoginPage() {
  const [user, setUser] = React.useState({
    username: "",
    password: "",
  });

  const [loading, setLoading] = React.useState(false);

  const router = useRouter();

  const onLogin = async () => {
    try {
      console.log("login clicked");
      setLoading(true);
      const res = await axios.post("/api/user/login", user);
      console.log(res);
      if (res.status === 201) {
        toast.success(res.data.message);
        router.push("/profile");
      } else {
        toast.error("This didn't work.");
      }
    } catch (error: any) {
      setLoading(false);
      toast.error("LOGIN FAILED");
      console.log(error.message);
    }
  };

  return (
    <>
      {loading ? (
        <div className="flex flex-col justify-center items-center min-h-screen py-2">
          <Loader />
        </div>
      ) : (
        <div className="flex flex-col p-5 mt-36 w-4/12 mx-auto">
          <h1 className="text-center text-3xl mb-5">Login</h1>
          <div className="flex flex-col p-3">
            <label htmlFor="username" className="text-2xl mb-2">
              username :{" "}
            </label>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="gary"
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              className="border-2 border-gray-400 rounded-md p-1 text-slate-950 outline-none"
            />
            <label htmlFor="password" className="text-2xl mb-2 mt-2">
              password :{" "}
            </label>
            <input
              type="text"
              name="password"
              id="password"
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              className="border-2 border-gray-400 rounded-md p-1 text-slate-950 outline-none"
            />
          </div>
          <button
            className="btn btn-primary mt-4 bg-sky-600 text-2xl p-2 w-4/12 mx-auto rounded-3xl hover:bg-sky-700"
            onClick={onLogin}
          >
            Login
          </button>

          <p className="mt-4 text-center p-2">
            Did not have an account ?{" "}
            <Link className="text-red-500" href="/signup">
              signup
            </Link>
          </p>
        </div>
      )}
    </>
  );
}
