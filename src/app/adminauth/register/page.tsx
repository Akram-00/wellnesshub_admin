"use client";
import React, { useState, useEffect } from "react";
import "../Auth.css";
import { ToastContainer, toast } from "react-toastify";

const SignUpPage = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSignUp = async () => {
    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_BACKEND_API + "/admin/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email, password }),
          credentials: "include",
        }
      );
      const data = await response.json();
      if (data.ok) {
        console.log("Admin Registration Successfull", data);
        toast.success("Admin Registration Successful");
      } else {
        console.error("Admin Registration Failed", response.statusText);
        toast.error("Admin Registration Failed");
      }
    } catch (error) {
      console.error(`An error occurred during the registration ${error}`)
      toast.error("An error occurred during registration")
    }
  };

  return (
    <div className="formpage">
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSignUp}>Sign up</button>
    </div>
  );
};

export default SignUpPage;
