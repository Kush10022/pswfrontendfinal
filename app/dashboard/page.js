"use client";
import React, { useState } from 'react';

const Dashboard = () => {
  // const [isDropdownOpen, setDropdownOpen] = useState(false);

  // const toggleDropdown = () => setDropdownOpen(!isDropdownOpen);
  return (
    <div className="font-sans">
      {/* Hero Section */}
      <div className="bg-blue-600 text-white text-center p-12">
        <h1 className="text-4xl font-bold mb-2">Welcome to PSW Services</h1>
        <p className="text-xl">Dedicated to providing top-notch personal support services</p>
      </div>

      {/* Services Section */}
      <div className="py-8 px-4">
        <h2 className="text-3xl font-semibold text-center mb-6">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Repeat this block for each service */}
          <div className="border rounded-lg p-4 shadow">
            <h3 className="text-xl font-semibold">Service Name</h3>
            <p className="text-md mt-2">Description of the service...</p>
          </div>
        </div>
      </div>

      {/* About PSWs Section */}
      <div className="bg-gray-100 py-8 px-4">
        <h2 className="text-3xl font-semibold text-center mb-6">About PSWs</h2>
        <p className="max-w-4xl mx-auto text-center">
          Information on Personal Support Workers, their training, qualifications, and the essential role they play in healthcare.
        </p>
      </div>

      {/* Contact Section */}
      <div className="py-8 px-4">
        <h2 className="text-3xl font-semibold text-center mb-6">Contact Us</h2>
        <form className="max-w-xl mx-auto">
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-semibold">Name</label>
            <input type="text" id="name" className="w-full border rounded p-2"/>
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-semibold">Email</label>
            <input type="email" id="email" className="w-full border rounded p-2"/>
          </div>
          <div className="mb-4">
            <label htmlFor="message" className="block text-sm font-semibold">Message</label>
            <textarea id="message" rows="4" className="w-full border rounded p-2"></textarea>
          </div>
          <button type="submit" className="bg-blue-600 text-white rounded p-2 w-full">Submit</button>
        </form>
      </div>
    </div>
    // <p> welcome to home page</p>
  );
};
export default Dashboard;
