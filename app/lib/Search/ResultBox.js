/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import { useAtom } from "jotai";
import { pswAtom } from "../atoms";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";
import dynamic from "next/dynamic";

const PSWCard = dynamic(() => import("./PSWCard"), {
  loading: () => (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-green-500"></div>
      <span className="ml-4 text-lg font-semibold text-gray-700">
        Loading...
      </span>
    </div>
  ),
  ssr: false,
});

export default function ResultBox() {
  const [psws] = useAtom(pswAtom);
  const [selectedPsw, setSelectedPsw] = useState(null); // Store the selected PSW
  const [sortedPsws, setSortedPsws] = useState([]); // State for sorted results
  const [sortCriteria, setSortCriteria] = useState({
    field: "name",
    order: "asc",
  }); // Sort by name (default), ascending

  // Sort results when PSWs or sort criteria changes
  useEffect(() => {
    if (psws && psws.length > 0) {
      const sorted = [...psws].sort((a, b) => {
        const orderMultiplier = sortCriteria.order === "asc" ? 1 : -1;
        if (sortCriteria.field === "rate") {
          return (a.rate - b.rate) * orderMultiplier; // Sort by rate
        } else if (sortCriteria.field === "name") {
          return a.name.localeCompare(b.name) * orderMultiplier; // Sort by name
        }
        return 0;
      });
      setSortedPsws(sorted);
    }
  }, [psws, sortCriteria]);

  // Toggle sort order
  const toggleSortOrder = (field) => {
    setSortCriteria((prev) => ({
      field,
      order: prev.field === field && prev.order === "asc" ? "desc" : "asc",
    }));
  };

  return (
    <div className="bg-white h-full max-h-[calc(100vh-100px)] p-4 rounded-lg w-full max-w-7xl mx-auto flex gap-4">
      {/* Left Container: Search results (1/3 width) */}
      <div className="w-1/3 bg-gray-50 p-4 rounded-lg overflow-y-auto shadow-sm">
        {/* Header Row with Sorting */}
        <div className="flex justify-between items-center border-b border-gray-300 pb-2 mb-4">
          <div
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => toggleSortOrder("name")}
          >
            <span className="text-lg font-medium text-gray-700">Name</span>
            <FontAwesomeIcon
              icon={
                sortCriteria.field === "name" && sortCriteria.order === "asc"
                  ? faArrowUp
                  : faArrowDown
              }
              className="text-gray-500"
            />
          </div>

          <div
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => toggleSortOrder("rate")}
          >
            <span className="text-lg font-medium text-gray-700">Rate</span>
            <FontAwesomeIcon
              icon={
                sortCriteria.field === "rate" && sortCriteria.order === "asc"
                  ? faArrowUp
                  : faArrowDown
              }
              className="text-gray-500"
            />
          </div>
        </div>

        {/* Results List */}
        {sortedPsws && sortedPsws.length > 0 ? (
          sortedPsws.map((psw, index) => (
            <div
              key={index}
              className={`flex items-center justify-between bg-white p-3 mb-3 rounded-lg shadow-md cursor-pointer transition-transform hover:scale-105 hover:bg-gray-100 ${
                selectedPsw === psw ? "border-2 border-green-500" : ""
              }`}
              onClick={() => setSelectedPsw(psw)}
            >
              {/* Profile Picture */}
              <img
                src={psw.profilePicture}
                alt={psw.name}
                className="w-12 h-12 rounded-full object-cover shadow-sm"
              />

              {/* PSW Name and Rate in One Line */}
              <div className="flex-1 px-4">
                <h2 className="text-lg font-semibold text-gray-800">
                  {psw.name}
                </h2>
              </div>

              <p className="text-green-600 font-bold">${psw.rate}/hr</p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No PSWs found.</p>
        )}
      </div>

      {/* Right Container: Details Placeholder (2/3 width) */}
      <div className="w-2/3 bg-gray-100 p-6 rounded-lg shadow-sm flex items-center justify-center text-gray-600">
        {selectedPsw ? (
          <PSWCard psw={selectedPsw} />
        ) : (
          <div className="text-center">
            <svg
              className="w-20 h-20 mx-auto text-gray-400"
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
            <h3 className="text-xl font-semibold text-gray-600 mt-4">
              Click on a result to view details
            </h3>
            <p className="text-md text-gray-500 mt-2">
              Choose a Personal Support Worker from the list on the left to view
              more details.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
