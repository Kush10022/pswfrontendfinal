import React, { useState } from "react";
import { useAtom } from "jotai";
import { pswAtom } from "../atoms";
import PSWModal from "./PSWModal.js";  // Import the modal component

export default function ResultBox() {
  const [psws] = useAtom(pswAtom);
  const [selectedPSW, setSelectedPSW] = useState(null); // State to store the clicked PSW

  const openModal = (psw) => {
    setSelectedPSW(psw); // Set the clicked PSW
  };

  const closeModal = () => {
    setSelectedPSW(null); // Reset the state to close the modal
  };

  return (
    <div className="bg-white h-full max-h-[calc(100vh-100px)] p-4 rounded-lg shadow-md w-full max-w-5xl mx-auto overflow-y-auto">
      {psws && psws.length > 0 ? (
        psws.map((psw, index) => (
          <div
            key={index}
            className="flex items-center bg-gray-100 p-3 mb-2 rounded-lg shadow space-x-4 cursor-pointer"
            onClick={() => openModal(psw)}  // Trigger the modal open on click
          >
            {/* Profile Picture */}
            <img
              src={psw.profilePicture}
              alt={psw.name}
              className="w-16 h-16 rounded-full object-cover shadow-lg"
            />

            {/* PSW Name and Rate */}
            <div className="flex-1">
              <h2 className="text-lg font-semibold text-gray-800">
                {psw.name}
              </h2>
              <p className="text-green-600 font-bold">${psw.rate}/hr</p>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500">No PSWs found.</p>
      )}

      {/* Render the Modal if a PSW is selected */}
      {selectedPSW && <PSWModal psw={selectedPSW} onClose={closeModal} />}
    </div>
  );
}
