"use client";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import tost from "react-hot-toast";

export default function SignupPage() {
  const [user, setUser] = React.useState({
    username: "",
    email: "",
    password: "",
  });

  const router = useRouter();

  const onRegister = async () => {
    try {
      const res = await axios.post("/api/user/signup", user);
      if (res.status === 201) {
        tost.success(res.data.message);
        router.push("/login");
      } else {
        tost.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex flex-col p-5 mt-36 w-4/12 mx-auto">
        <h1 className="text-center text-3xl mb-5">create a new account</h1>
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
            className="border-2 border-gray-400 rounded-md p-2 text-slate-950 outline-none"
          />
          <label htmlFor="email" className="text-2xl mb-2 mt-2">
            email :{" "}
          </label>
          <input
            type="text"
            name="email"
            id="email"
            placeholder="xyz@gmail.com"
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            className="border-2 border-gray-400 rounded-md p-2 text-slate-950 outline-none"
          />
          <label htmlFor="password" className="text-2xl mb-2 mt-2">
            password :{" "}
          </label>
          <input
            type="text"
            name="password"
            id="password"
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            className="border-2 border-gray-400 rounded-md p-2 text-slate-950 outline-none"
          />
        </div>
        <button
          className="btn btn-primary mt-4 bg-sky-600 text-2xl p-2 w-4/12 mx-auto rounded-3xl hover:bg-sky-700"
          onClick={onRegister}
        >
          SignUp
        </button>

        <p className="mt-4 text-center p-2">
          Already have an account ?{" "}
          <Link className="text-red-500" href="/login">
            login
          </Link>
        </p>
      </div>
    </>
  );
}
