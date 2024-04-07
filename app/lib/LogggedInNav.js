"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { UserCircleIcon } from '@heroicons/react/24/solid';
import { imgURL } from '../profile/page';
import styles from "../../styling/profile.module.css";

export default function LoggedInNav() {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen(!isDropdownOpen);
  return (
    <nav className="bg-emerald-800 shadow px-10 py-0 flex justify-between items-center">
      {/* Website Logo */}
      <a href="#" className="flex items-center space-x-2">
        <img src=".\logo.png" alt="PSW Logo" className="h-8 w-8 rounded-full" /> {/* Replace UserCircleIcon with img tag */}
        <span className="font-semibold text-slate-50 text-lg">PSW</span>
      </a>
      {/* Primary Navbar items */}
      <div className="hidden md:flex items-center space-x-1">
        <a href="dashboard" className="py-4 px-2 text-slate-50 font-semibold hover:text-green-500 transition duration-300">Home</a>
        <a href="services" className="py-4 px-2 text-slate-50 font-semibold hover:text-green-500 transition duration-300">Services</a>
        <a href="#" className="py-4 px-2 text-slate-50 font-semibold hover:text-green-500 transition duration-300">About</a>
        <a href="#" className="py-4 px-2 text-slate-50 font-semibold hover:text-green-500 transition duration-300">Contact Us</a>
      </div>
      {/* Search input and Profile dropdown */}
      <div className="flex items-center space-x-4">
        <div className="flex bg-white rounded-md">
          <input type="search" className="px-4 py-2 w-80 rounded-l-md" placeholder="Search..." />
          <button className="px-4 text-white bg-gray-600 rounded-r-md">Search</button>
        </div>
        <div className="relative">
          <button onClick={toggleDropdown} type="button" className="flex items-center justify-center h-10 w-10 rounded-full bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
           <img src={imgURL} className={styles.smlRadius}/>
            
          </button>
          {isDropdownOpen && (
            <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
              <div className="py-1" role="none">
                <a href="\profile" className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100" role="menuitem" tabIndex="-1" id="menu-item-0">My Profile</a>
                <a href="logout" className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100" role="menuitem" tabIndex="-1" id="menu-item-1">Logout</a>
                <a href="#" className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100" role="menuitem" tabIndex="-1" id="menu-item-2">Account History</a>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}
