import React from "react";
import { useAtom } from "jotai";
import { userProfileAtom } from "../../lib/atoms";
// WelcomePlaceholder Component with Tailwind and animations
export default function WelcomePlaceholder() {
  const [userProfile] = useAtom(userProfileAtom);

  return ( 
    userProfile && userProfile.isPSW ? (
      <div>"I am PSW. Bookings will be shown here!"</div>
    ) : (
    <div className="flex flex-col items-center justify-center h-full text-center text-gray-700 animate-fadeIn">
      {/* Animated Search Icon */}
      <div className="animate-bounce mb-6">
        <svg
          className="w-20 h-20 text-green-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
          ></path>
        </svg>
      </div>

      {/* Welcome Message */}
      <h1 className="text-4xl font-bold mb-2">Welcome to PSW Finder!</h1>
      <p className="text-lg mb-4">Find the perfect support worker for your needs</p>

      {/* Call to Action with subtle hover effect */}
      <div
        className="bg-green-600 text-white py-3 px-8 rounded-full hover:bg-green-700 transition duration-300 ease-in-out cursor-pointer"
        onClick={() => alert("Search is waiting for your input!")}
      >
        Start by entering your search criteria above!
      </div>
    </div>
    ) 
  );
}
