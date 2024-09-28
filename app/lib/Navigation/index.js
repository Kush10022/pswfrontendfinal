"use client";
import React from "react";
import { usePathname } from "next/navigation";
import { LoggedInNav, LoggedOutNav } from "./navbars";

export default function Navigation() {
  const pathname = usePathname();
  if (
    pathname === "/login" ||
    pathname === "/registeruser" ||
    pathname === "/" ||
    pathname === "/passwordreset" ||
    pathname === "/verifyemail"
  ) {
    return <LoggedOutNav />;
  } else {
    return <LoggedInNav />;
  }
}
