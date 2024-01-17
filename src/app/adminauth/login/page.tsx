"use client";
import React, { useState, useEffect } from "react";
import "../Auth.css";
import { ToastContainer, toast } from "react-toastify";

const LoginPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = async () => {
    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_BACKEND_API + "/admin/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
          credentials: "include",
        }
      );
      if (response.ok) {
        const data = await response.json();
        console.log("Admin Login Successfull", data);
        toast.success("Admin Login Successful");
        window.location.href = "/page/addworkout";
      } else {
        console.error("Admin Login Falied", response.statusText);
        toast.error("Failed to Login");
      }
    } catch (error) {
      console.error(`An error occurred during the login ${error}`);
      toast.error("An error occurred during login");
    }
  };

  return (
    <div className="formpage">
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
      <button onClick={handleLogin}>Sign up</button>
    </div>
  );
};

export default LoginPage;
