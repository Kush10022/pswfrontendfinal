import React from "react";

export default function NoSearchResultPlaceholder() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center text-gray-700 animate-fadeIn">
      {/* Sad Search Icon with shake animation */}
      <div className="animate-shake mb-6">
        <svg
          className="w-20 h-20 text-gray-400"
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

      {/* No Results Message */}
      <h1 className="text-2xl font-bold mb-2">No Results Found!</h1>
      <p className="text-lg mb-4">
        We couldn’t find any matches for your search. Please try again later or adjust your filters.
      </p>
    </div>
  );
}
