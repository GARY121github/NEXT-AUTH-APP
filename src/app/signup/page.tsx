"use client";
import React from "react";
import Link from "next/link";


export default function SignupPage() {
  const [user, setUser] = React.useState({
    email: "",
    username: "",
    password: "",
  });

  return (
    <div className="">
      <h1>Signup Page</h1>
      <hr />
      <label htmlFor="email">Email</label>
      <input type="text" name="email" id="email" />
    </div>
  );
}
