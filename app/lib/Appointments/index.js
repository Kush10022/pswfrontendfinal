import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { userProfileAtom } from "../atoms";
import { useAtom } from "jotai";
import { convertBookingsToEvents } from "../utils";

const Appointments = ({ userType }) => {
  const [userProfile] = useAtom(userProfileAtom);
  const localizer = momentLocalizer(moment);
  const myBookings = convertBookingsToEvents(
    userProfile?.bookings || [],
    userProfile?.isPSW ? "PSW" : "Client"
  );
  const [bookings, setBookings] = useState(myBookings);

  const [selectedBooking, setSelectedBooking] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  // setBookings(userProfile.bookings);
  console.log("UserProfile Bookings: ", userProfile);

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

  const handleGetDirections = (coordinates) => {
    const [lng, lat] = coordinates;
    const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
    window.open(mapsUrl, "_blank");
  };

  console.log(selectedBooking);

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
          views={["month"]}
          date={currentDate}
          onNavigate={() => {}}
          toolbar={false}
          onSelectEvent={(event) => setSelectedBooking(event)}
        />
      </div>

      {/* Modal for Booking Details */}
      {/* Modal for Booking Details */}
      {/* Modal for Booking Details */}
      {selectedBooking && (
        <div
          className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50"
          onClick={() => setSelectedBooking(null)}
        >
          <div
            className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
              Booking Details
            </h2>
            <div className="flex flex-col lg:flex-row items-start gap-6">
              {/* Image Section */}
              <div className="flex-shrink-0">
                <img
                  src={selectedBooking.details.picture}
                  alt="Profile"
                  className="w-40 h-40 object-cover rounded-full border-4 border-green-500"
                />
              </div>

              {/* Details Section */}
              <div className="flex-grow">
                <table className="w-full border-collapse border border-gray-300 text-gray-700">
                  <tbody>
                    <tr>
                      <th className="border border-gray-300 px-4 py-2 bg-gray-100 font-semibold">
                        Name
                      </th>
                      <td className="border border-gray-300 px-4 py-2">
                        {selectedBooking.details.name}
                      </td>
                    </tr>
                    <tr>
                      <th className="border border-gray-300 px-4 py-2 bg-gray-100 font-semibold">
                        Email
                      </th>
                      <td className="border border-gray-300 px-4 py-2">
                        {selectedBooking.details.email}
                      </td>
                    </tr>
                    <tr>
                      <th className="border border-gray-300 px-4 py-2 bg-gray-100 font-semibold">
                        Rate
                      </th>
                      <td className="border border-gray-300 px-4 py-2">
                        ${selectedBooking.details.rate}/hr
                      </td>
                    </tr>
                    {userType === "PSW" && selectedBooking.details.address && (
                      <tr>
                        <th className="border border-gray-300 px-4 py-2 bg-gray-100 font-semibold">
                          Address
                        </th>
                        <td className="border border-gray-300 px-4 py-2">
                          {selectedBooking.details.address}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>

                {/* Optional Buttons */}
                {userType === "PSW" && selectedBooking.details.location && (
                  <button
                    className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                    onClick={() =>
                      handleGetDirections(selectedBooking.details.location)
                    }
                  >
                    Get Directions
                  </button>
                )}
              </div>
            </div>

            {/* Close Button */}
            <button
              className="px-4 py-2 mt-4 bg-green-500 text-white rounded hover:bg-green-700"
              onClick={() => setSelectedBooking(null)}
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
