/* eslint-disable @next/next/no-img-element */
import React from "react";
import { SmallMap } from "../Map";
import toast from "react-hot-toast"; // Importing react-hot-toast

export default function PSWCard({ psw }) {
  // Function to handle booking
  const handleBooking = () => {
    toast.success("Booking confirmed!");
  };

  const latitude = psw.address.location.coordinates[1];
  const longitude = psw.address.location.coordinates[0];
  const location = { latitude, longitude };

  return (
    <div className="p-6 max-w-4xl w-full flex flex-col md:flex-row relative transition-transform duration-300">
      {/* Map Section */}
      <div className="md:w-1/2 w-full h-64 md:h-96 pr-4 mb-4 md:mb-0 rounded-lg overflow-hidden">
        <SmallMap location={location} />
      </div>

      {/* PSW Details Section */}
      <div className="md:w-1/2 w-full flex flex-col items-center space-y-4">
        {/* Profile Picture */}
        <img
          src={psw.profilePicture}
          alt={psw.name}
          className="w-28 h-28 rounded-full object-cover shadow-md border-4 border-blue-200 transition-transform duration-300 hover:scale-110"
        />

        {/* PSW Name and Rate */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800">{psw.name}</h2>
          <p className="text-green-700 font-semibold text-xl mt-1">
            ${psw.rate}/hr
          </p>
          <p className="text-blue-600 mt-2 underline">{psw.email}</p>
        </div>

        {/* PSW Address */}
        <div className="text-center text-gray-500 italic">
          <p>{psw.address.address}</p>
        </div>

        {/* Skills Section */}
        <div className="text-center">
          <p className="text-gray-600 font-medium">Specializes in:</p>
          <p className="text-gray-700 mt-1">
            {psw.skills ? psw.skills.join(", ") : "General caregiving"}
          </p>
        </div>

        {/* Customer Reviews Section */}
        <div className="flex flex-col items-center">
          <p className="text-gray-600 font-medium">Customer Rating:</p>
          <div className="flex items-center space-x-1 mt-1">
            {[...Array(psw.rating)].map((_, i) => (
              <svg
                key={i}
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-yellow-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M9.049 2.927a.75.75 0 011.902 0l1.516 3.064 3.386.492a.75.75 0 01.416 1.279l-2.45 2.39.578 3.364a.75.75 0 01-1.088.791l-3.024-1.59-3.023 1.59a.75.75 0 01-1.088-.79l.579-3.365-2.45-2.39a.75.75 0 01.415-1.28l3.386-.491 1.516-3.064z" />
              </svg>
            ))}
          </div>
        </div>

        {/* Book Now Button */}
        <button
          className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 mt-4"
          onClick={handleBooking} // Show toast on click
        >
          Book Now
        </button>
      </div>
    </div>
  );
}
