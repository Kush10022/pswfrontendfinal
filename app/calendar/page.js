"use client";
import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // Import calendar styling
import "../../styling/calendar.css"; // Import custom CSS
import Cookies from "js-cookie";
import { useAtom } from "jotai";
import { userProfileAtom } from "../atoms/userAtom";
import { useRouter } from "next/navigation";

const futureLimitMonths = 2; // Number of months in the future that the user can book off

const PswAvailabilityCalendar = () => {
  const router = useRouter();
  const [userProfile, setUserProfile] = useAtom(userProfileAtom);
  const [bookOffDates, setBookOffDates] = useState([]); // Booked off dates
  const [changesMade, setChangesMade] = useState(false); // Whether changes have been made to the booked-off dates
  const getUserObject = async () => {
    const token = Cookies.get("authToken");
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/v1/private/user`,
      {
        method: "GET",
        headers: {
          Authorization: `JWT ${token}`,
        },
      }
    );
    const responseData = await response.json();
    setUserProfile(responseData.user);
  };

  useEffect(() => {
    if (userProfile == undefined) {
      getUserObject();
    }
  });

  const [availableDays, setAvailableDays] = useState(
    userProfile?.calendar?.availableDays || []
  ); // Available days from backend

  // Convert date to a simpler string format (just day, month, year)
  const formatDate = (date) => {
    return date.toISOString().split("T")[0]; // This gives yyyy-mm-dd format without time
  };

  // Fetch available and booked-off dates from the backend when the component mounts
  useEffect(() => {
    const fetchAvailability = async () => {
      try {
        if (userProfile === undefined) {
          const token = Cookies.get("authToken");
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/v1/private/user`,
            {
              method: "GET",
              headers: {
                Authorization: `JWT ${token}`,
              },
            }
          );
          const responseData = await response.json();
          setUserProfile(responseData.user);
          if (responseData.user?.calendar) {
            setAvailableDays(responseData.user?.calendar?.availableDays);
            if (responseData.user?.calendar?.availableDays) {
              const availableDays = responseData.user?.calendar?.availableDays;
              const today = new Date();
              const futureLimit = new Date(
                today.getFullYear(),
                today.getMonth() + futureLimitMonths,
                today.getDate()
              );
              let bookedOffDates = [];
              for (
                let day = today;
                day <= futureLimit;
                day.setDate(day.getDate() + 1)
              ) {
                const formattedDate = formatDate(day);
                if (!availableDays.includes(formattedDate)) {
                  bookedOffDates.push(formattedDate);
                }
              }
              setBookOffDates(bookedOffDates);
            }
          }
        }
      } catch (error) {
        console.error("Error fetching booked-off dates:", error);
      }
    };
    fetchAvailability();
  });

  // Handle submitting the booked-off dates to the backend
  const handleSubmit = async () => {
    let days_to_send = [];
    const today = new Date();
    const futureLimit = new Date(
      today.getFullYear(),
      today.getMonth() + futureLimitMonths,
      today.getDate()
    );
    for (let day = today; day <= futureLimit; day.setDate(day.getDate() + 1)) {
      const formattedDate = formatDate(day);
      if (!bookOffDates.includes(formattedDate)) {
        days_to_send.push(formattedDate);
      }
    }
    setAvailableDays(days_to_send);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/v1/private/user/calendar`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `JWT ${Cookies.get("authToken")}`,
          },
          body: JSON.stringify({ availableDays: days_to_send }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update booked-off dates");
      } else {
        setChangesMade(false);
        router.reload();
      }
    } catch (error) {
      console.error("Error updating booked-off dates:", error);
    }
  };

  // logic for disabling past dates and dates beyond two months from today
  const today = new Date();
  const futureLimit = new Date(
    today.getFullYear(),
    today.getMonth() + futureLimitMonths,
    today.getDate()
  );
  const isTileDisabled = ({ date }) => {
    return date < today || date > futureLimit;
  };

  // Logic to handle clicking on a date tile in the calendar where the user can book off a date and click again to unbook
  const handleDateClick = (selectedDate) => {
    // Ensure date is within the valid range
    if (selectedDate >= today && selectedDate <= futureLimit) {
      const formattedDate = selectedDate.toISOString().split("T")[0];
      if (!bookOffDates.includes(formattedDate)) {
        setBookOffDates([...bookOffDates, formattedDate]);
      } else {
        setBookOffDates(bookOffDates.filter((date) => date !== formattedDate));
      }
      setChangesMade(true);
    }
  };

  const isBookedOff = ({ date }) => {
    const formattedDate = date.toISOString().split("T")[0];
    return bookOffDates.includes(formattedDate);
  };

  return (
    <div className="calendar-container">
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
      <Calendar
        locale="en-CA"
        tileDisabled={isTileDisabled}
        onClickDay={handleDateClick}
        tileClassName={({ date }) => {
          return isBookedOff({ date }) ? "booked-off" : "";
        }}
        className={`mt-6 rounded-lg shadow-md`}
      ></Calendar>

      <button
        onClick={handleSubmit}
        disabled={!changesMade} // Disable button if no changes made
        className={`mt-6 px-4 py-2 font-semibold rounded-lg transition-colors
    ${
      changesMade
        ? "bg-green-600 text-white hover:bg-green-700 cursor-pointer" // Greenish color when changes are made
        : "bg-gray-400 text-gray-700 cursor-not-allowed" // Disabled state
    }`}
      >
        Submit
      </button>
    </div>
  );
};

export default PswAvailabilityCalendar;
