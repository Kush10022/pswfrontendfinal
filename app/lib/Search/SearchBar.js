import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationArrow, faSearch } from "@fortawesome/free-solid-svg-icons";
import { useAtom } from "jotai";
import { pswAtom, userProfileAtom } from "../atoms";
import Cookies from "js-cookie";
import { constructSearchURL } from "../utils";

const SearchBar = () => {
  const [locationType, setLocationType] = useState("home"); // Can be 'current' or 'home'
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [rate, setRate] = useState(50.0);
  const [radius, setRadius] = useState(0);
  const [pswName, setPswName] = useState("");
  const [userProfile] = useAtom(userProfileAtom);
  const [, setPsws] = useAtom(pswAtom);
  const [location, setLocation] = useState({
    lat: 0,
    lon: 0,
  });

  useEffect(() => {
    if (userProfile) {
      setLocation({
        lat: userProfile?.address?.location?.coordinates[1],
        lon: userProfile?.address?.location?.coordinates[0],
      });
    }
  }, [userProfile]);

  const searchPSWs = async () => {
    const token = Cookies.get("authToken");

    if (!token) {
      console.error("User is not authenticated.");
      return;
    }

    if (!location.lat || !location.lon) {
      console.error("Location is not set.");
      return;
    }

    const param = {
      name: pswName,
      rate: rate || 50.0,
      day: date,
      radius: radius || 50,
      lat: location.lat,
      lon: location.lon,
    };

    console.log("Search parameters", param);
    const searchURL = constructSearchURL(param);

    try {
      const response = await fetch(searchURL, {
        method: "GET",
        headers: {
          Authorization: `JWT ${token}`,
        },
      });
      const responseData = await response.json();
      setPsws(responseData.users);
    } catch (error) {
      console.log("Error during search", error);
    }
  };

  const handleLocation = async (e) => {
    e.preventDefault();
    setLocationType(e.target.value);
    if (e.target.value === "current") {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ lat: latitude, lon: longitude });
        });
      } else {
        console.error("Geolocation is not supported by this browser.");
      }
    } else {
      setLocation({
        lat: userProfile?.address?.location?.coordinates[1],
        lon: userProfile?.address?.location?.coordinates[0],
      });
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center p-2 bg-green-100 rounded-md w-full max-w-[76rem] mx-auto space-y-4 md:space-y-0 md:space-x-4">
      {/* Location Input */}
      <div className="flex items-center bg-white p-3 rounded-md shadow w-full md:w-auto">
        <FontAwesomeIcon
          icon={faLocationArrow}
          className="text-green-600 mr-2"
        />
        <select
          className="w-full md:w-auto border-none focus:outline-none px-3 text-gray-600"
          value={locationType}
          onChange={handleLocation}
        >
          <option value="home">Search by Home Address</option>
          <option value="current">Search by Current Location</option>
        </select>
      </div>

      {/* Date Dropdown */}
      <div className="flex items-center bg-white p-3 rounded-md shadow w-full md:w-auto">
        <input
          type="date"
          min={new Date().toISOString().split("T")[0]}
          max={
            new Date(new Date().setMonth(new Date().getMonth() + 2))
              .toISOString()
              .split("T")[0]
          }
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full md:w-auto border-none focus:outline-none text-gray-600"
        />
      </div>

      {/* Rating Input */}
      <div className="flex items-center bg-white p-3 rounded-md shadow w-full md:w-auto">
        <select
          value={rate}
          onChange={(e) => setRate(e.target.value)}
          className="w-full md:w-auto border-none focus:outline-none px-3 text-gray-600"
        >
          <option value="">rate/hr</option>
          <option value="25.00">$25/hr</option>
          <option value="30.00">$30/hr</option>
          <option value="35.00">$35/hr</option>
          <option value="40.00">$40/hr</option>
          <option value="45.00">$45/hr</option>
          <option value="50.00">$50/hr</option>
        </select>
      </div>

      {/* Radius Select */}
      <div className="flex items-center bg-white p-3 rounded-md shadow w-full md:w-auto">
        <select
          value={radius}
          onChange={(e) => setRadius(e.target.value)}
          className="w-full md:w-auto border-none focus:outline-none px-3 text-gray-600"
        >
          <option value="">Radius within</option>
          <option value="10">10 KM</option>
          <option value="15">15 KM</option>
          <option value="20">20 KM</option>
          <option value="25">25 KM</option>
          <option value="30">30 KM</option>
          <option value="35">35 KM</option>
          <option value="40">40 KM</option>
          <option value="45">45 KM</option>
          <option value="50">50 KM</option>
        </select>
      </div>

      {/* PSW Name Input */}
      <div className="flex items-center bg-white p-3 rounded-md shadow w-full md:w-auto">
        <input
          type="text"
          placeholder="Name (optional)"
          value={pswName}
          onChange={(e) => setPswName(e.target.value)}
          className="w-full md:w-auto border-none focus:outline-none text-gray-600"
        />
      </div>

      {/* Search Button */}
      <button
        className="flex items-center justify-center bg-green-600 text-white p-3 rounded-md shadow w-full md:w-auto"
        onClick={searchPSWs}
      >
        <FontAwesomeIcon icon={faSearch} className="mr-2" />
        Search
      </button>
    </div>
  );
};

export { SearchBar };
