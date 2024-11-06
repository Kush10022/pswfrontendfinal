/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import { SmallMap } from "../Map";
import toast from "react-hot-toast";
import { PDFViewer } from "../Profile/PDFViewer";
import { Modal } from "react-responsive-modal";
import { FaBookOpen, FaCalendarAlt } from "react-icons/fa"; // Importing icons
import "react-responsive-modal/styles.css"; // Importing the required CSS for the modal
import CheckoutForm from "../Checkout/CheckoutForm";

export default function PSWCard({ psw }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);

  // Handle booking action
  const handleBooking = () => {
    // toast.success("Booking confirmed!");
    setIsCheckoutModalOpen(true);

  };

  // Open modal to view PSW's document
  const openResumeModal = () => {
    setIsModalOpen(true);
  };

  // Close modal
  const closeResumeModal = () => {
    setIsModalOpen(false);
  };

  const closeCheckoutModal = () => {
    setIsCheckoutModalOpen(false);
  };

  const { profilePicture, name, rate, email, skills, address, document } = psw;
  const { coordinates } = address.location;
  const location = { latitude: coordinates[1], longitude: coordinates[0] };

  return (
    <div className="p-8 max-w-5xl w-full flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6">
      {/* Left Column: Profile Info */}
      <div className="flex flex-col items-center md:w-1/2 space-y-6 p-4 bg-gray-50 rounded-lg shadow-sm">
        {/* Profile Picture */}
        <img
          src={profilePicture}
          alt={`${name}'s profile`}
          className="w-48 h-48 rounded-lg object-cover shadow-md border border-gray-200"
        />

        {/* Name, Rate, Email */}
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold text-gray-900">{name}</h2>
          <p className="text-lg text-gray-700 font-semibold">${rate}/hr</p>
          <a
            href={`mailto:${email}`}
            className="text-sm text-gray-500 hover:text-gray-700 transition duration-200 underline"
          >
            {email}
          </a>
        </div>
      </div>

      {/* Right Column: Map, Address, Skills, Buttons */}
      <div className="flex flex-col md:w-1/2 space-y-6">
        {/* Map Section */}
        <div className="w-full h-64 rounded-lg overflow-hidden">
          <SmallMap location={location} />
        </div>

        {/* Address Text */}
        <div className="text-sm text-gray-500">
          <p className="italic">{address.address}</p>
        </div>

        {/* Skills Section */}
        <div className="text-center md:text-left">
          <p className="text-gray-600 font-medium">Specializes in:</p>
          <p className="text-gray-700">
            {skills?.length ? skills.join(", ") : "General caregiving"}
          </p>
        </div>

        {/* Buttons Section */}
        <div className="flex space-x-4 mt-4 justify-center md:justify-start">
          <button
            className="flex items-center justify-center bg-green-500 text-white px-4 py-2 rounded-lg shadow hover:bg-green-600 transition-all duration-300 transform hover:scale-105"
            onClick={openResumeModal}
          >
            <FaBookOpen className="mr-2" />
            View Resume
          </button>
          <button
            className="flex items-center justify-center bg-green-500 text-white px-4 py-2 rounded-lg shadow hover:bg-green-600 transition-all duration-300 transform hover:scale-105"
            onClick={handleBooking}
          >
            <FaCalendarAlt className="mr-2" />
            Book Now
          </button>
        </div>
      </div>

      {/* Modal for PDF Viewer */}
      <Modal open={isModalOpen} onClose={closeResumeModal} center>
        <div className="w-full h-[80vh]">
          <PDFViewer fileUrl={document} />
        </div>
      </Modal>
      <Modal
        open={isCheckoutModalOpen}
        onClose={closeCheckoutModal}
        center
        styles={{
          modal: {
            maxWidth: "600px", // Set a larger max width
            width: "90%", // Take up more of the screen width
            padding: "20px", // Add some padding inside the modal
          },
        }}
      >
        {/* <h2 className="text-3xl font-bold mb-4 text-center">Checkout</h2> */}
        <CheckoutForm rate={rate} />
      </Modal>
    </div>
  );
}
