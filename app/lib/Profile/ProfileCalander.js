"use client";
import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // Import calendar styling
import "../../../styling/calendar.css"; // Import custom CSS
import Cookies from "js-cookie";
import { useAtom } from "jotai";
import { userProfileAtom } from "../atoms";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const futureLimitMonths = 2; // Number of months in the future that the user can book off

const AvailabilityCalendar = ({onClose}) => {
  const router = useRouter();
  const [userProfile, setUserProfile] = useAtom(userProfileAtom);
  const [bookOffDates, setBookOffDates] = useState([]); // Booked off dates
  const [changesMade, setChangesMade] = useState(false); // Tracks if changes have been made

  // Fetch user object from backend

  useEffect(() => {
    const getUserObject = async () => {
      try {
        const token = Cookies.get("authToken");
        if (!token) {
          throw new Error("Token not available");
        }
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/v1/private/user`,
          {
            method: "GET",
            headers: {
              Authorization: `JWT ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const responseData = await response.json();
        setUserProfile(responseData.user);
      } catch (error) {
        console.error("Error fetching user object:", error);
      }
    };
    if (userProfile === undefined) {
      getUserObject();
    }
  }, [userProfile, setUserProfile]);

  // Helper to format dates (yyyy-mm-dd)
  const formatDate = (date) => {
    return date.toISOString().split("T")[0];
  };

  // Fetch availability data
  useEffect(() => {
    const fetchAvailability = async () => {
      try {
        if (userProfile?.calendar?.availableDays) {
          const availableDays = userProfile.calendar.availableDays;
          const today = new Date();
          const futureLimit = new Date(
            today.getFullYear(),
            today.getMonth() + futureLimitMonths,
            today.getDate()
          );

          const bookedOffDates = [];
          let day = new Date(today);
          while (day < futureLimit) {
            const formattedDate = formatDate(day);
            if (!availableDays.includes(formattedDate)) {
              bookedOffDates.push(formattedDate);
            }
            day.setDate(day.getDate() + 1);
          }
          setBookOffDates(bookedOffDates);
        }
      } catch (error) {
        console.error("Error fetching availability:", error);
      }
    };

    if (userProfile) {
      fetchAvailability();
    }
  }, [userProfile]);

  // Submit booked-off dates
  const handleSubmit = async () => {
    const toastId = toast.loading("Updating booked-off dates...");
    const availableDays = [];
    const today = new Date();
    const futureLimit = new Date(
      today.getFullYear(),
      today.getMonth() + futureLimitMonths,
      today.getDate()
    );

    let day = new Date(today);
    while (day < futureLimit) {
      const formattedDate = formatDate(day);
      if (!bookOffDates.includes(formattedDate)) {
        availableDays.push(formattedDate);
      }
      day.setDate(day.getDate() + 1);
    }

    try {
      const token = Cookies.get("authToken");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/v1/private/user/calendar`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `JWT ${token}`,
          },
          body: JSON.stringify({ availableDays }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update booked-off dates");
      }
      setUserProfile({ ...userProfile, calendar: { availableDays } });
      setChangesMade(false);
      toast.success("Booked-off dates updated successfully", { id: toastId });
      onClose();
      router.refresh();
    } catch (error) {
      toast.error("Failed to update booked-off dates", { id: toastId });
      console.error("Error updating booked-off dates:", error);
    }
  };

  // Disable past dates and future dates beyond limit
  const isTileDisabled = ({ date }) => {
    const today = new Date();
    const futureLimit = new Date(
      today.getFullYear(),
      today.getMonth() + futureLimitMonths,
      today.getDate()
    );
    return date < today || date > futureLimit;
  };

  // Handle date selection and toggle booked-off status
  const handleDateClick = (selectedDate) => {
    const formattedDate = formatDate(selectedDate);
    if (!bookOffDates.includes(formattedDate)) {
      setBookOffDates([...bookOffDates, formattedDate]);
    } else {
      setBookOffDates(bookOffDates.filter((date) => date !== formattedDate));
    }
    setChangesMade(true);
  };

  // Check if a date is booked off
  const isBookedOff = ({ date }) => {
    const formattedDate = formatDate(date);
    return bookOffDates.includes(formattedDate);
  };

  return (
    <div className="calendar-container">
      {/* Legend */}
      <div className="mt-6 flex justify-center space-x-8 bg-slate-100 p-4 rounded-lg shadow-md">
        <span className="flex items-center space-x-2">
          <span className="inline-block w-4 h-4 bg-red-100 rounded-full border-1 border-red-300"></span>
          <span className="text-gray-700">Booked Off</span>
        </span>

        <span className="flex items-center space-x-2">
          <span className="inline-block w-4 h-4 bg-white rounded-full border-1 border-teal-100"></span>
          <span className="text-gray-700">Available</span>
        </span>

        <span className="flex items-center space-x-2">
          <span className="inline-block w-4 h-4 bg-gray-300 rounded-full border-1 border-gray-400"></span>
          <span className="text-gray-700">Unavailable</span>
        </span>
      </div>

      {/* Calendar */}
      <Calendar
        locale="en-CA"
        tileDisabled={isTileDisabled}
        onClickDay={handleDateClick}
        tileClassName={({ date }) =>
          isBookedOff({ date }) ? "booked-off" : ""
        }
        className="mt-6 rounded-lg shadow-md"
      />

      {/* Submit button */}
      <button
        onClick={handleSubmit}
        disabled={!changesMade}
        className={`mt-6 px-4 py-2 font-semibold rounded-lg ${
          changesMade
            ? "bg-green-600 text-white hover:bg-green-700"
            : "bg-gray-400 text-gray-700 cursor-not-allowed"
        }`}
      >
        Submit
      </button>
    </div>
  );
};

export { AvailabilityCalendar };
