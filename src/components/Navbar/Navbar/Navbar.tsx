"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Logo from "@/assets/logo.png";
import "./Navbar.css";

const Navbar = () => {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  const checkAdminAuthenticated = async () => {
    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_BACKEND_API + "/admin/checklogin",
        {
          method: "GET",
          headers: {
            "Content-Type": "applicatoin/json",
          },
          credentials: "include",
        }
      );
      console.log(response)
      if (response.ok) {
        setIsAdminAuthenticated(true);
      } else {
        setIsAdminAuthenticated(false);
      }
    } catch (error) {
      console.log(error);
      setIsAdminAuthenticated(false);
    }
  };

  const handleLogout = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API}/admin/logout`,
        {
          method: "POST",
          credentials: "include", // Include credentials (cookies)
          headers: {
            "Content-Type": "application/json",
          },
          // body: JSON.stringify(anyDataYouWantToSend), // You can include a request body if needed
        }
      );

      const data = await response.json()

      if (data.ok) {
        // Logout was successful
        // Clear any client-side storage or state related to authentication if needed

        // Reload the page
        if (window.location.href === "/adminauth/login") {
          window.location.reload();
        } else {
          window.location.href = "/adminauth/login";
        }
      } else {
        // Logout failed, handle the error
        console.error("Logout failed:", data.message);
        // Handle logout failure, maybe show an error message to the user
      }
    } catch (error) {
      console.error("Logout failed", error);
      // Handle logout failure, maybe show an error message to the user
    }
  };

  useEffect(() => {
    checkAdminAuthenticated();
  }, []);

  return (
    <div className="navbar">
      <Image src={Logo} alt="Logo" className="logo" width={100} />
      <div className="adminLinks">
        {isAdminAuthenticated ? (
          <>
            <Link href="/pages/addworkout">Add Workout</Link>
            <Link href="/adminauth/login" onClick={handleLogout}>Logout</Link>
          </>
        ) : (
          <>
            <Link href="/adminauth/login">Login</Link>
            <Link href="/adminauth/register">Signup</Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
