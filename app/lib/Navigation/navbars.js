/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */

import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import Link from "next/link";
import { useAtom } from "jotai";
import { userProfileAtom } from "../atoms";
import styles from "../../../styling/profile.module.css";

const LoggedOutNav = () => {
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const closeOnEscape = (e) => {
      if (e.key === "Escape") {
        setExpanded(false);
      }
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  const closeMenu = () => setExpanded(false);

  return (
    <nav className="fixed w-full top-0 start-0 bg-emerald-800 shadow-sm px-10 py-3 flex justify-between items-center">
      {/* Website Logo (Home Link) */}
      <Link
        href="/"
        onClick={closeMenu}
        className="text-slate-50 text-2xl font-semibold no-underline"
      >
        Support Worker
      </Link>

      {/* Hamburger Menu Button */}
      <button
        className="text-white text-4xl lg:hidden"
        onClick={() => setExpanded(!expanded)}
        aria-label="Toggle navigation"
      >
        {expanded ? "✕" : "☰"}
      </button>

      {/* Navbar Items */}
      <div className={`lg:flex ${expanded ? "block" : "hidden"}`}>
        <ul className="flex flex-col lg:flex-row lg:space-x-6 my-auto">
          <li>
            <Link
              href="/login"
              onClick={closeMenu}
              className="text-slate-50 hover:text-green-500 transition no-underline"
            >
              Login
            </Link>
          </li>
          <li>
            <Link
              href="/registeruser"
              onClick={closeMenu}
              className="text-slate-50 hover:text-green-500 transition no-underline"
            >
              Register
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

const LoggedInNav = () => {
  const imgURL = "/default-profile.jpg";
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [userProfile, setUserProfile] = useAtom(userProfileAtom);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true); // Add loading state

  const toggleDropdown = () => setDropdownOpen(!isDropdownOpen);

  useEffect(() => {
    const getUserObject = async () => {
      const token = Cookies.get("authToken");
      if (!token) {
        console.error("No token found");
        return;
      }

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/v1/private/user`,
          {
            method: "GET",
            headers: {
              Authorization: `JWT ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const responseData = await response.json();
        setUserProfile(responseData.user);
        setLoading(false); // Stop loading when data is fetched
      } catch (error) {
        console.error(error.message);
      }
    };

    if (!userProfile) {
      getUserObject();
    }
  }, [userProfile, setUserProfile]);

  useEffect(() => {
    const closeDropdownOnEscape = (e) => {
      if (e.key === "Escape") {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("keydown", closeDropdownOnEscape);
    return () => {
      document.removeEventListener("keydown", closeDropdownOnEscape);
    };
  }, []);

  return (
    <div className="fixed w-full top-0 start-0 z-[1001]">
    <nav className="relative  bg-emerald-800 shadow px-10 py-2 flex justify-between items-center">
      {/* Website Logo */}
      <Link
        href="/dashboard"
        className="flex items-center space-x-2 no-underline"
      >
        <img src="./logo.png" alt="PSW Logo" className="h-8 w-8 rounded-full" />
        <span className="font-semibold text-slate-50 text-lg">PSW</span>
      </Link>
      {/* Primary Navbar items for larger screens */}
      <div className="hidden md:flex items-center space-x-1">
        <Link
          href="/dashboard"
          className="py-2 px-2 text-slate-50 font-semibold hover:text-green-500 transition duration-300 no-underline"
          onClick={() => setDropdownOpen(false)}
        >
          Home
        </Link>
        <Link
          href="/about"
          className="py-2 px-2 text-slate-50 font-semibold hover:text-green-500 transition duration-300 no-underline"
          onClick={() => setDropdownOpen(false)}
        >
          About
        </Link>
        <Link
          href="/contact"
          className="py-2 px-2 text-slate-50 font-semibold hover:text-green-500 transition duration-300 no-underline"
          onClick={() => setDropdownOpen(false)}
        >
          Contact Us
        </Link>
      </div>
      {/* Right side elements: Profile and Hamburger Menu */}
      <div className="flex items-center space-x-4">
        {/* Profile Dropdown */}
        <div className="relative">
          <button
            onClick={toggleDropdown}
            type="button"
            className="flex items-center justify-center h-10 w-10 rounded-full bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {/* Add alt text for accessibility */}
            <img
              src={userProfile?.profilePicture ?? imgURL}
              alt="User profile picture"
              className={styles.smlRadius}
            />
          </button>
          {isDropdownOpen && (
            <div
              className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="menu-button"
              tabIndex="-1"
            >
              <div className="py-1" role="none">
                <Link
                  href="/profile"
                  className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100 no-underline"
                  role="menuitem"
                  tabIndex="-1"
                  id="menu-item-0"
                  onClick={() => setDropdownOpen(false)}
                >
                  My Profile
                </Link>
                <Link
                  href="/logout"
                  className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100 no-underline"
                  role="menuitem"
                  tabIndex="-1"
                  id="menu-item-1"
                  onClick={() => setDropdownOpen(false)}
                >
                  Logout
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Hamburger Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            <svg
              className="h-6 w-6 text-slate-50"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>
      {/* Mobile Menu items */}
      {isMobileMenuOpen && (
        <div className="absolute top-full right-0 bg-emerald-800 w-screen px-10 py-2 z-50 flex flex-col items-end space-y-1">
          <Link
            href="/dashboard"
            className="py-2 px-2 text-slate-50 font-semibold hover:text-green-500 transition duration-300 no-underline"
            onClick={() => setIsMobileMenuOpen(false)} // Close the mobile menu after clicking
          >
            Home
          </Link>
          <Link
            href="/about"
            className="py-2 px-2 text-slate-50 font-semibold hover:text-green-500 transition duration-300 no-underline"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            About
          </Link>
          <Link
            href="/contact"
            className="py-2 px-2 text-slate-50 font-semibold hover:text-green-500 transition duration-300 no-underline"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Contact Us
          </Link>
        </div>
      )}
    </nav>
    </div>
  );
};

export { LoggedOutNav, LoggedInNav };
