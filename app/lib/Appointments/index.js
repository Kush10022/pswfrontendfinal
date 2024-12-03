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
  const myBookings = convertBookingsToEvents(userProfile?.bookings || [], userProfile?.isPSW ? "PSW" : "Client");
  const [bookings, setBookings] = useState(myBookings);
 
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  // setBookings(userProfile.bookings);

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
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
          <button onClick={handlePrevMonth} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Previous
          </button>
          <h2 className="text-xl font-semibold text-gray-700">{moment(currentDate).format("MMMM YYYY")}</h2>
          <button onClick={handleNextMonth} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
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
            onNavigate={() => { }}
            toolbar={false}
            onSelectEvent={(event) => setSelectedBooking(event)}
          />
        </div>

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
              <h2 className="text-2xl font-bold mb-4 text-center">Booking Details</h2>
              <div className="flex flex-col lg:flex-row gap-6">
                <div className="flex-1">
                  <p className="text-gray-700 mb-2">
                    <strong>{userType === "PSW" ? "Client Name:" : "PSW Name:"}</strong> {selectedBooking.details.name}
                  </p>
                  <p className="text-gray-700 mb-2">
                    <strong>Email:</strong> {selectedBooking.details.email}
                  </p>
                  <p className="text-gray-700 mb-4">
                    <strong>Rate:</strong> ${selectedBooking.details.rate}/hr
                  </p>
                  <p className="text-gray-700 mb-4">
                    <img src={selectedBooking.details.picture} alt="Profile" className="w-32 h-32 object-cover rounded-full" />
                  </p>
                  {userType === "PSW" && (
                    <>
                      <p className="text-gray-700 mb-4">
                        <strong>Address:</strong> {selectedBooking.details.address}
                      </p>
                      <button
                        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                        onClick={() => handleGetDirections(selectedBooking.details.location)}
                      >
                        Get Directions
                      </button>
                    </>
                  )}
                </div>
              </div>
              <button
                className="px-4 py-2 mt-4 bg-gray-500 text-white rounded hover:bg-gray-600"
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
