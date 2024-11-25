"use client";
import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useAtom } from "jotai";
import { userProfileAtom } from "../lib/atoms";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faMagnifyingGlassLocation,
  faCalendarCheck,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import Search from "../lib/Search";
import Appointments from "../lib/Appointments";


// Default export function that returns a page object
export default function DashboardPage() {
  // Use the userProfileAtom to get the user's profile data
  const [userProfile, setUserProfile] = useAtom(userProfileAtom);
  const [isOpened, setIsOpened] = useState(false);
  const [searchHover, setSearchHover] = useState(false);
  const [calendarHover, setCalendarHover] = useState(false);
  const [profileHover, setProfileHover] = useState(false);
  const [searchSelected, setSearchSelected] = useState(true);

  const router = useRouter();

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
      if (responseData.user.isPSW) {
        setSearchSelected(false);
      }
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
        className={`fixed z-40 rounded-full px-2 mt-20 bg-white border-green-600 border-2 hover:bg-green-200 shadow-sm transition-all duration-500 ease-in-out ${isOpened ? "ml-[15.4rem]" : "ml-6"
          }`}
      >
        <FontAwesomeIcon
          icon={faArrowLeft}
          className={`transition-transform duration-500 ease-in-out ${isOpened ? "rotate-0" : "rotate-180"
            }`}
          size="md"
          color="green"
        />
      </button>

      {/* Side Navigation */}
      <div
        className={`h-full fixed top-0 left-0 bg-white shadow-md transition-all duration-500 ease-in-out ${isOpened ? "w-72" : "w-16"
          }`}
      >
        {/* User Profile Section */}
        <div
          className="flex flex-col items-center mt-20 transition-all hover:bg-emerald-100 selection:duration-500 ease-in-out  p-3 cursor-pointer"
          onClick={() => {
            router.push("/profile");
          }}
          onMouseEnter={() => setProfileHover(true)}
          onMouseLeave={() => setProfileHover(false)}
        >
          <div className="flex items-center">
            <FontAwesomeIcon
              icon={faUser}
              size="2x"
              color="green"
              className={`${isOpened ? "ml-3" : "ml-1"
                } transition-transform duration-700 ease-in-out`}
            />
            {isOpened && (
              <span className="ml-3 pr-4 text-lg font-bold text-gray-700 transition-opacity duration-700">
                {userProfile?.fname}
              </span>
            )}
            {!isOpened && profileHover && (
              <span className="absolute left-[4.5rem] bg-gray-700 text-white text-sm rounded py-1 px-2 z-50 transition-all ease-in-out">
                Profile
              </span>
            )}
          </div>
        </div>

        {/* Sidebar Items */}
        <div
          className={`flex flex-col mt-16 items-center gap-1 ${isOpened ? "mx-2" : ""
            }`}
        >
          {/* Search Item */}{
            !userProfile?.isPSW &&
            <div
              className={`flex relative items-center w-full p-3 hover:bg-emerald-100 transition-colors duration-500 ease-in-out cursor-pointer ${isOpened ? "rounded-lg " : ""
                }${searchSelected ? " bg-green-200" : ""}`}
              onMouseEnter={() => setSearchHover(true)}
              onMouseLeave={() => setSearchHover(false)}
              onClick={() => setSearchSelected(true)}
            >
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
              {!isOpened && searchHover && (
                <span className="absolute left-[4.5rem] bg-gray-700 text-white text-sm rounded py-1 px-2 z-50 transition-all ease-in-out">
                  Search
                </span>
              )}
            </div>
          }

          {/* Calendar Check Item */}
          <div
            className={`flex relative items-center w-full p-3 hover:bg-emerald-100 transition-colors duration-500 ease-in-out cursor-pointer ${isOpened ? "rounded-lg" : ""
              }${(userProfile?.isPSW || !searchSelected) ? " bg-green-200" : ""}`}
            onMouseEnter={() => setCalendarHover(true)}
            onMouseLeave={() => setCalendarHover(false)}
            onClick={() => setSearchSelected(false)}
          >
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
            {!isOpened && calendarHover && (
              <span className="absolute left-[4.5rem] bg-gray-700 text-white text-sm rounded py-1 px-2 z-50 transition-all ease-in-out">
                Appointments
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div
        className={`w-full transition-all duration-500 ${isOpened ? "ml-72" : "ml-16"
          }`}
      >
        {/* Center container */}
        <div className="flex flex-col items-center justify-start min-h-screen">
          {/* Inner content wrapper */}
          <div className="text-center w-full py-1 mx-auto">
            {!userProfile?.isPSW && searchSelected && <Search />}
            {(userProfile?.isPSW || !searchSelected) && <Appointments userType={userProfile?.isPSW ? "PSW" : "Client"}/>}
          </div>
        </div>
      </div>
    </div>
  );
}