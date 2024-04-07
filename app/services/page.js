"use client";
import React, { useState } from 'react';

const Dashboard = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen(!isDropdownOpen);
  return (
    <div className="min-h-screen bg-gray-100">

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

          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h2 className="text-lg leading-6 font-medium text-gray-900">Geo-Location</h2>
              {/* Placeholder for upcoming bookings */}
            </div>
            <div className="border-t border-gray-200">
              <dl>
                {/* Booking details */}
              </dl>
            </div>
          </div>

          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h2 className="text-lg leading-6 font-medium text-gray-900">Payment Info</h2>
              {/* Placeholder for upcoming bookings */}
            </div>
            <div className="border-t border-gray-200">
              <dl>
                {/* Booking details */}
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
