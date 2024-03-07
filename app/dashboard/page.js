"use client";
import React, { useState } from 'react';
import { UserCircleIcon } from '@heroicons/react/24/solid';

const Dashboard = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen(!isDropdownOpen);
  return (
    <div className="min-h-screen bg-gray-100">
    <nav className="bg-white shadow px-4 py-2 flex justify-between items-center">
      {/* Website Logo */}
      <a href="#" className="flex items-center space-x-2">
        <UserCircleIcon className="h-8 w-8 text-gray-500" />
        <span className="font-semibold text-gray-500 text-lg">YourLogo</span>
      </a>
      {/* Primary Navbar items */}
      <div className="hidden md:flex items-center space-x-1">
        <a href="#" className="py-4 px-2 text-gray-500 font-semibold hover:text-green-500 transition duration-300">Home</a>
        <a href="#" className="py-4 px-2 text-gray-500 font-semibold hover:text-green-500 transition duration-300">Services</a>
        <a href="#" className="py-4 px-2 text-gray-500 font-semibold hover:text-green-500 transition duration-300">About</a>
        <a href="#" className="py-4 px-2 text-gray-500 font-semibold hover:text-green-500 transition duration-300">Contact Us</a>
      </div>
      {/* Search input and Profile dropdown */}
      <div className="flex items-center space-x-4">
        <div className="flex bg-white rounded-md">
          <input type="search" className="px-4 py-2 w-80 rounded-l-md" placeholder="Search..."/>
          <button className="px-4 text-white bg-gray-600 rounded-r-md">Search</button>
        </div>
        <div className="relative">
          <button onClick={toggleDropdown} type="button" className="flex items-center justify-center h-10 w-10 rounded-full bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            <UserCircleIcon className="h-6 w-6 text-gray-600" aria-hidden="true" />
          </button>
          {isDropdownOpen && (
            <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
              <div className="py-1" role="none">
                <a href="#" className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100" role="menuitem" tabIndex="-1" id="menu-item-0">My Profile</a>
                <a href="#" className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100" role="menuitem" tabIndex="-1" id="menu-item-1">Logout</a>
                <a href="#" className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100" role="menuitem" tabIndex="-1" id="menu-item-2">Account History</a>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>

      <div className="py-5">
        <div className="max-w-6xl mx-auto sm:px-6 lg:px-8">
          {/* Content goes here */}
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h2 className="text-lg leading-6 font-medium text-gray-900">Upcoming Bookings</h2>
              {/* Placeholder for upcoming bookings */}
            </div>
            <div className="border-t border-gray-200">
              <dl>
                {/* Booking details */}
              </dl>
            </div>
          </div>

          <div className="mt-5">
            <h2 className="text-lg leading-6 font-medium text-gray-900">Geolocation</h2>
            {/* Placeholder for geolocation feature */}
          </div>

          <div className="mt-5">
            <h2 className="text-lg leading-6 font-medium text-gray-900">Booking Images</h2>
            {/* Add images as needed */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
