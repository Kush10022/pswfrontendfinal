import React from 'react';
import { FaMapMarkerAlt, FaCreditCard, FaCalendarAlt } from 'react-icons/fa'; // Make sure to have 'react-icons' package installed

const ServicePage = () => {
  // Assume these have been fetched or are props
  const upcomingBookings = [
    { id: 1, service: 'Home Cleaning', date: '2024-06-21', time: '10:00 AM' },
    // ...more bookings
  ];

  return (
    <div className="font-sans bg-gray-100 p-8">
      {/* Main Container */}
      <div className="flex flex-col md:flex-row md:flex-wrap md:justify-center gap-6">
        
        {/* Upcoming Bookings */}
        <div className="bg-white rounded-lg shadow p-4 w-full md:w-1/2 lg:w-1/3">
          <div className="p-6">
            <h3 className="flex items-center mb-3 text-xl font-semibold">
              <FaCalendarAlt className="mr-2" /> Upcoming Bookings
            </h3>
            {upcomingBookings.map((booking) => (
              <div key={booking.id} className="mb-2">
                <p className="font-semibold">{booking.service}</p>
                <p className="text-sm">{booking.date} at {booking.time}</p>
              </div>
            ))}
          </div>
          <div className="bg-green-100 p-4 text-center">
            <a href="/bookings" className="text-green-600 hover:underline">View all bookings</a>
          </div>
        </div>
        
        {/* Geo-Location */}
        <div className="bg-white rounded-lg shadow p-4 w-full md:w-1/2 lg:w-1/3">
          <div className="p-6">
            <h3 className="flex items-center mb-3 text-xl font-semibold">
              <FaMapMarkerAlt className="mr-2" /> Geo-Location
            </h3>
            <p className="text-sm">123 Main St, Anytown, AN 12345</p>
          </div>
          <div className="bg-green-100 p-4 text-center">
            <a href="/location" className="text-green-600 hover:underline">Update location</a>
          </div>
        </div>

        {/* Payment Info */}
        <div className="bg-white rounded-lg shadow p-4 w-full md:w-1/2 lg:w-1/3">
          <div className="p-6">
            <h3 className="flex items-center mb-3 text-xl font-semibold">
              <FaCreditCard className="mr-2" /> Payment Info
            </h3>
            <p className="text-sm">Visa ending in 1234</p>
          </div>
          <div className="bg-green-100 p-4 text-center">
            <a href="/payment" className="text-green-600 hover:underline">Manage payments</a>
          </div>
        </div>

        {/* Additional cards/content can be added here */}

      </div>
    </div>
  );
};

export default ServicePage;
