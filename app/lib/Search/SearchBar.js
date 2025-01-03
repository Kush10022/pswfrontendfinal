import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationArrow, faSearch, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { useAtom } from "jotai";
import { pswAtom, userProfileAtom, serachParamsAtom } from "../atoms";
import Cookies from "js-cookie";
import { constructSearchURL } from "../utils";
import toast from "react-hot-toast";


const SearchBar = ({ onSearch }) => {
  const [locationType, setLocationType] = useState("home"); // Can be 'current' or 'home'
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [rate, setRate] = useState(50.0);
  const [radius, setRadius] = useState(0);
  const [pswName, setPswName] = useState("");
  const [loading, setLoading] = useState(false); // Loading state for search button
  const [locationLoading, setLocationLoading] = useState(false); // Loading for location switch
  const [userProfile] = useAtom(userProfileAtom);
  const [, setPsws] = useAtom(pswAtom);
  const [, setSearchParams] = useAtom(serachParamsAtom);
  const [location, setLocation] = useState({
    lat: 0,
    lon: 0,
  });

  // Sync initial location with user profile (home location)
  useEffect(() => {
    if (userProfile) {
      setLocation({
        lat: userProfile?.address?.location?.coordinates[1],
        lon: userProfile?.address?.location?.coordinates[0],
      });
    }
  }, [userProfile]);

  // Search PSWs with updated location
  const searchPSWs = async () => {
    setLoading(true); // Start loading
    const token = Cookies.get("authToken");

    if (!token) {
      console.error("User is not authenticated.");
      setLoading(false); // End loading
      onSearch(); // Trigger parent component's search function
      return;
    }

    if (!location.lat || !location.lon) {
      console.error("Location is not set.");
      setLoading(false); // End loading
      onSearch(); // Trigger parent component's search function
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

    const searchURL = constructSearchURL(param);
    setSearchParams(param);

    try {
      const response = await fetch(searchURL, {
        method: "GET",
        headers: {
          Authorization: `JWT ${token}`,
        },
      });
      const responseData = await response.json();
      if (responseData.users.length === 0) {
        setPsws([]);
      } else {
        setPsws(responseData.users);
      }
    } catch (error) {
      console.log("Error during search", error);
    } finally {
      setLoading(false); // End loading
      onSearch(); // Trigger parent component's search function
    }
  };

  // Handle location switch between 'home' and 'current'
  const handleLocation = (e) => {
    setLocationType(e.target.value);
    setLocationLoading(true); // Start location loading

    if (e.target.value === "current") {
      const toastId = toast.loading("Getting current location...")
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setLocation({ lat: latitude, lon: longitude });
            setLocationLoading(false); // End location loading after setting location
            toast.success("Current location retrieved.", { id: toastId});
          },
          (error) => {
            console.error("Geolocation error:", error);
            // Fallback to home location if geolocation fails
            setLocation({
              lat: userProfile?.address?.location?.coordinates[1],
              lon: userProfile?.address?.location?.coordinates[0],
            });
            setLocationType("home");
            setLocationLoading(false); // End location loading after fallback
            toast.error("Failed to retrieve current location. Using home location instead.", { id: toastId});
          },
          {
            timeout: 10000, // Set a timeout for geolocation to avoid indefinite wait
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
        setLocation({
          lat: userProfile?.address?.location?.coordinates[1],
          lon: userProfile?.address?.location?.coordinates[0],
        });
        setLocationType("home");
        setLocationLoading(false); // End location loading after fallback
        toast.error("Geolocation is not supported by this browser. Using home location instead.", { id: toastId});
      }
    } else {
      setLocation({
        lat: userProfile?.address?.location?.coordinates[1],
        lon: userProfile?.address?.location?.coordinates[0],
      });
      setLocationLoading(false); // End location loading
    }
  };

  return (
    <div className="sticky top-0 rounded z-50 w-full max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:flex-wrap items-center justify-between gap-4">
        {/* Location Input */}
        <div className="flex items-center w-full md:w-auto flex-grow bg-gray-100 p-3 rounded-md shadow-sm transition duration-300 hover:bg-gray-200 focus-within:bg-gray-200">
          <FontAwesomeIcon
            icon={faLocationArrow}
            className="text-green-600 mr-2"
          />
          <select
            className="w-full md:w-auto border-none bg-transparent focus:outline-none text-gray-600"
            value={locationType}
            onChange={handleLocation}
            disabled={locationLoading} // Disable while loading location
          >
            <option value="home">Search by Home Address</option>
            <option value="current">Search by Current Location</option>
          </select>
        </div>

        {/* Date Input */}
        <div className="flex items-center w-full md:w-auto flex-grow bg-gray-100 p-3 rounded-md shadow-sm transition duration-300 hover:bg-gray-200 focus-within:bg-gray-200">
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
            className="w-full md:w-auto border-none bg-transparent focus:outline-none text-gray-600"
          />
        </div>

        {/* Rate Input */}
        <div className="flex items-center w-full md:w-auto flex-grow bg-gray-100 p-3 rounded-md shadow-sm transition duration-300 hover:bg-gray-200 focus-within:bg-gray-200">
          <select
            value={rate}
            onChange={(e) => setRate(e.target.value)}
            className="w-full md:w-auto border-none bg-transparent focus:outline-none text-gray-600"
          >
            <option value="">Rate/hr</option>
            <option value="25.00">$25/hr</option>
            <option value="30.00">$30/hr</option>
            <option value="35.00">$35/hr</option>
            <option value="40.00">$40/hr</option>
            <option value="45.00">$45/hr</option>
            <option value="50.00">$50/hr</option>
          </select>
        </div>

        {/* Radius Select */}
        <div className="flex items-center w-full md:w-auto flex-grow bg-gray-100 p-3 rounded-md shadow-sm transition duration-300 hover:bg-gray-200 focus-within:bg-gray-200">
          <select
            value={radius}
            onChange={(e) => setRadius(e.target.value)}
            className="w-full md:w-auto border-none bg-transparent focus:outline-none text-gray-600"
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
        <div className="flex items-center w-full md:w-auto flex-grow bg-gray-100 p-3 rounded-md shadow-sm transition duration-300 hover:bg-gray-200 focus-within:bg-gray-200">
          <input
            type="text"
            placeholder="Name (optional)"
            value={pswName}
            onChange={(e) => setPswName(e.target.value)}
            className="w-full md:w-auto border-none bg-transparent focus:outline-none text-gray-600"
          />
        </div>

        {/* Search Button */}
        <button
          className={`flex items-center justify-center p-3 rounded-md shadow-sm w-full md:w-auto transition duration-300 ${
            loading || locationLoading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700"
          } text-white`}
          onClick={searchPSWs}
          disabled={loading || locationLoading} // Disable if either loading state is true
        >
          {loading || locationLoading ? (
            <>
              <FontAwesomeIcon icon={faSpinner} className="animate-spin mr-2" />
              Searching...
            </>
          ) : (
            <>
              <FontAwesomeIcon icon={faSearch} className="mr-2" />
              Search
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export { SearchBar };
