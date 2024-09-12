"use client";

import React, { useEffect, useState } from 'react';
import { imgURL } from '../profile/page';
import styles from "../../styling/profile.module.css";
import { useAtom } from 'jotai';
import { userProfileAtom } from '../atoms/userAtom';
import Cookies from 'js-cookie';

export default function LoggedInNav () {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [userProfile, setUserProfile] = useAtom(userProfileAtom);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const toggleDropdown = () => setDropdownOpen(!isDropdownOpen);

  const getUserObject = async () =>{
    const token = Cookies.get('authToken');
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/private/user`, {
      method: 'GET',
      headers: {
        'Authorization': `JWT ${token}`,
      },
    });
    const responseData = await response.json();
    setUserProfile(responseData.user);
  }

  useEffect(() => {
    if(userProfile == undefined){
    getUserObject();
  }
  }, []);

  return (
    <nav className="relative bg-emerald-800 shadow px-10 py-2 flex justify-between items-center"> {/* Make sure the nav is relative */}
      {/* Website Logo */}
      <a href="dashboard" className="flex items-center space-x-2">
        <img src=".\logo.png" alt="PSW Logo" className="h-8 w-8 rounded-full" />
        <span className="font-semibold text-slate-50 text-lg">PSW</span>
      </a>

      {/* Primary Navbar items for larger screens */}
      <div className="hidden md:flex items-center space-x-1">
        <a href="dashboard" className="py-2 px-2 text-slate-50 font-semibold hover:text-green-500 transition duration-300">Home</a>
        <a href="services" className="py-2 px-2 text-slate-50 font-semibold hover:text-green-500 transition duration-300">Services</a>
        <a href="about" className="py-2 px-2 text-slate-50 font-semibold hover:text-green-500 transition duration-300">About</a>
        <a href="contact" className="py-2 px-2 text-slate-50 font-semibold hover:text-green-500 transition duration-300">Contact Us</a>
      </div>

      {/* Right side elements: Profile and Hamburger Menu */}
      <div className="flex items-center space-x-4">
        {/* Profile Dropdown */}
        <div className="relative">
          <button onClick={toggleDropdown} type="button" className="flex items-center justify-center h-10 w-10 rounded-full bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            <img src={userProfile?.profilePicture ? userProfile?.profilePicture : imgURL} className={styles.smlRadius}/>
          </button>
          {isDropdownOpen && (
            <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
              <div className="py-1" role="none">
                <a href="/profile" className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100" role="menuitem" tabIndex="-1" id="menu-item-0">My Profile</a>
                <a href="logout" className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100" role="menuitem" tabIndex="-1" id="menu-item-1">Logout</a>
                <a href="#" className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100" role="menuitem" tabIndex="-1" id="menu-item-2">Account History</a>
              </div>
            </div>
          )}
        </div>

        {/* Hamburger Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            <svg className="h-6 w-6 text-slate-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu items */}
      {isMobileMenuOpen && (
        <div className="absolute top-full right-0 bg-emerald-800 w-screen px-10 py-2 z-50 flex flex-col items-end space-y-1"> {/* w-screen to match the width of the screen */}
        <a href="dashboard" className="py-2 px-2 text-slate-50 font-semibold hover:text-green-500 transition duration-300">Home</a>
          <a href="services" className="py-2 px-2 text-slate-50 font-semibold hover:text-green-500 transition duration-300">Services</a>
          <a href="about" className="py-2 px-2 text-slate-50 font-semibold hover:text-green-500 transition duration-300">About</a>
          <a href="contact" className="py-2 px-2 text-slate-50 font-semibold hover:text-green-500 transition duration-300">Contact Us</a>
        </div>
      )}
    </nav>
  )
}
