"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Logo from "@/assets/logo.png";
import "./Navbar.css";

const Navbar = () => {
  const [isAdminAuthenticated, setIsAdminAuthenticated] =
    useState<boolean>(false);

  return (
    <div className="navbar">
      <Image src={Logo} alt="Logo" className="logo" width={100} />
      <div className="adminLinks">
      {
        isAdminAuthenticated ? (
          <>
            <Link href='/pages/addworkout'>Add Workout</Link>
          </>
        ) : (
          <>
            <Link href="/adminauth/login">Login</Link>
            <Link href="/adminauth/register">Signup</Link>
          </>
          )
      }
      </div>
    </div>
  );
};

export default Navbar;
