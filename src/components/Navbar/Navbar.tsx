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
