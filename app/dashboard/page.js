"use client";
import React, { useEffect } from "react";
import Cookies from "js-cookie";
import { useAtom } from "jotai";
import { userProfileAtom } from "../lib/atoms";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faMagnifyingGlassLocation,
  faCalendarCheck,
  faUser
} from "@fortawesome/free-solid-svg-icons";

// Default export function that returns a page object
export default function DashboardPage() {
  // Use the userProfileAtom to get the user's profile data
  const [userProfile, setUserProfile] = useAtom(userProfileAtom);
  const [isOpened, setIsOpened] = React.useState(false);

  useEffect(() => {
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
    if (userProfile == undefined) {
      getUserObject();
    }
  }, [userProfile, setUserProfile]);

  return (
    <div className="flex h-screen relative mt-3">
      {/* Arrow Button for Sidebar */}
      <button
        onClick={() => setIsOpened(!isOpened)}
        className={`fixed z-40 rounded-full px-2 mt-[6.5rem] bg-white border-green-600 border-2 hover:bg-green-200 shadow-sm transition-all duration-500 ease-in-out ${
          isOpened ? "ml-[17rem]" : "ml-4"
        }`}
      >
        <FontAwesomeIcon
          icon={faArrowLeft}
          className={`transition-transform duration-700 ease-in-out ${
            isOpened ? "rotate-0" : "rotate-180"
          }`}
          size="md"
          color="green"
        />
      </button>

      {/* Side Navigation */}
      <div
        className={`h-full fixed top-0 left-0 bg-white shadow-md transition-all duration-500 ease-in-out ${
          isOpened ? "w-72" : "w-16"
        }`}
      >
        {/* User Profile Section */}
        <div className="flex flex-col items-center mt-20 transition-all duration-500 ease-in-out hover:bg-emerald-100 p-3" >
          <div className="flex items-center">
            <FontAwesomeIcon
              icon={faUser}
              size="2x"
              color="green"
              className={`${isOpened ? "ml-3" : "ml-1"} transition-transform duration-700 ease-in-out`}
            />
            {isOpened && (
              <span className="ml-3 text-lg font-bold text-gray-700 transition-opacity duration-700">
                {userProfile?.fname} {userProfile?.lname}
              </span>
            )}
          </div>
        </div>

        {/* Sidebar Items */}
        <div className="flex flex-col mt-16 items-center">
          {/* Search Item */}
          <div className="flex items-center w-full p-3 hover:bg-emerald-100 transition-colors duration-500 ease-in-out cursor-pointer">
            <FontAwesomeIcon
              icon={faMagnifyingGlassLocation}
              size="2x"
              color="green"
              className="transition-transform duration-700 ease-in-out"
            />
            {isOpened && (
              <span className="ml-3 text-lg font-medium text-gray-700 transition-opacity duration-500 ease-in-out">
                Search
              </span>
            )}
          </div>

          {/* Calendar Check Item */}
          <div className="flex mt-1 items-center w-full p-3 hover:bg-emerald-100 transition-colors duration-500 ease-in-out cursor-pointer">
            <FontAwesomeIcon
              icon={faCalendarCheck}
              size="2x"
              color="green"
              className="transition-transform duration-700 ease-in-out"
            />
            {isOpened && (
              <span className="ml-3 text-lg font-medium text-gray-700 transition-opacity duration-500 ease-in-out">
                Appointments
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div
        className={`w-full h-full transition-all sticky duration-700 ${
          isOpened ? "ml-72" : "ml-16"
        }`}
      >
        <div className="flex flex-col items-center m-1">
          <div className="mt-1"></div>
        </div>
      </div>
    </div>
  );
}
