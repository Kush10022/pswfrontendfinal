import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const Appointments = ({ userType }) => {
  const localizer = momentLocalizer(moment);

  // Booking data
  const bookings = [
    {
      id: 1,
      title: "Client: Alice (Home Care)",
      start: new Date(2024, 11, 25),
      end: new Date(2024, 11, 25),
      clientName: "Alice",
      pswName: "John Doe",
      service: "Home Care",
      location: "123 Main St",
    },
    {
      id: 2,
      title: "Client: Bob (Physiotherapy)",
      start: new Date(2024, 11, 26),
      end: new Date(2024, 11, 26),
      clientName: "Bob",
      pswName: "Jane Smith",
      service: "Physiotherapy",
      location: "456 Elm St",
    },
    {
      id: 3,
      title: "Client: Charlie (Elderly Assistance)",
      start: new Date(2024, 11, 27),
      end: new Date(2024, 11, 27),
      clientName: "Charlie",
      pswName: "Mike Brown",
      service: "Elderly Assistance",
      location: "789 Oak St",
    },
    {
      id: 4,
      title: "Client: David (Companionship)",
      start: new Date(2024, 11, 28),
      end: new Date(2024, 11, 28),
      clientName: "David",
      pswName: "Anna White",
      service: "Companionship",
      location: "321 Pine St",
    },
  ];

  const [selectedBooking, setSelectedBooking] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date());

  // Handlers for navigating months
  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  const handlePrevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        {userType === "PSW" ? "Your Schedule" : "Your Bookings"}
      </h1>

      {/* Month Navigation */}
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={handlePrevMonth}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Previous
        </button>
        <h2 className="text-xl font-semibold text-gray-700">
          {moment(currentDate).format("MMMM YYYY")}
        </h2>
        <button
          onClick={handleNextMonth}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Next
        </button>
      </div>

      {/* Calendar */}
      <div className="bg-white p-6 shadow-md rounded-lg">
        <Calendar
          localizer={localizer}
          events={bookings}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 400 }}
          views={["month"]} // Restrict to Month view
          date={currentDate} // Controlled date for navigation
          onNavigate={() => {}} // Disable default navigation
          toolbar={false} // Custom toolbar
          onSelectEvent={(event) => setSelectedBooking(event)} // Open modal on event click
        />
      </div>

      {/* Modal for Booking Details */}
      {selectedBooking && (
        <div
          className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50"
          onClick={() => setSelectedBooking(null)} // Close modal on overlay click
        >
          <div
            className="bg-white p-6 rounded-lg shadow-lg w-1/3"
            onClick={(e) => e.stopPropagation()} // Prevent closing on modal click
          >
            <h2 className="text-xl font-bold mb-4">Booking Details</h2>
            <p className="text-gray-700 mb-2">
              <strong>Client:</strong> {selectedBooking.clientName}
            </p>
            <p className="text-gray-700 mb-2">
              <strong>PSW:</strong> {selectedBooking.pswName}
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Service:</strong> {selectedBooking.service}
            </p>
            <p className="text-gray-700 mb-4">
              <strong>Location:</strong> {selectedBooking.location}
            </p>
            <button
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              onClick={() => setSelectedBooking(null)} // Close modal
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Appointments;
