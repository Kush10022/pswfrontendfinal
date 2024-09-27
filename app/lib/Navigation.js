"use client";
import { usePathname } from "next/navigation";
import React from "react";
import LoggedInNav from "./LogggedInNav";
import LoggedOutNav from "./LoggedOutNav";

export default function Navigation() {
  const pathname = usePathname();
  if (
    pathname === "/login" ||
    pathname === "/registeruser" ||
    pathname === "/" ||
    pathname === "/passwordreset"
  ) {
    return <LoggedOutNav />;
  } else {
    return <LoggedInNav />;
  }
}
