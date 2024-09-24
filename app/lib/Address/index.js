import React, { useState, useEffect } from "react";
import { FiMapPin } from "react-icons/fi";
import { SmallMap as DynamicMap } from "../Map";
import toast from "react-hot-toast";

const defaultLocation = {
  latitude: 43.64705181574289,
  longitude: -79.38641434606802,
};

const AddressListItem = ({ address, onClick }) => {
  return (
    <div
      className="flex items-center p-4 border-b border-gray-200"
      onClick={onClick}
    >
      <span className="text-gray-400 mr-3">
        <FiMapPin className="w-5 h-5" />
      </span>
      <span className="flex-grow">
        <span className="text-lg font-semibold mr-2">{address.name}</span>
        {address.city || address.county ? (
          <span className="text-sm text-gray-600 mr-2">
            {address.city ? address.city : address.county}
          </span>
        ) : null}
        {address.postalCode ||
        address.stateCode ||
        address.state ||
        address.country ? (
          <span className="text-xs text-gray-500">
            {address.postalCode ? `${address.postalCode}, ` : ""}
            {address.stateCode || address.state
              ? `${address.stateCode || address.state}, `
              : ""}
            {address.country}
          </span>
        ) : null}
      </span>
    </div>
  );
};

const AddressEditor = ({ Submit, Close }) => {
  const [address, setAddress] = useState("");
  const [apartment, setApartment] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [country, setCountry] = useState("");
  const [addressFocus, setAddressFocus] = useState(false);
  const [addressSuggestions, setAddressSuggestions] = useState([]);
  const [location, setLocation] = useState(defaultLocation);
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
      },
      () => {
        console.log("Error getting the location");
      }
    );
  }, []);

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
    if (e.target.value.length > 3) {
      fetch(
        `/api/address?q=${e.target.value}&location=${location.longitude},${location.latitude}`
      )
        .then((res) => res.json())
        .then((data) => {
          setAddressSuggestions(data);
        })
        .catch((error) => {
          console.error("Error fetching address suggestions", error);
        });
    }
  };

  const handleAddressFocus = () => {
    setAddressFocus(true);
  };

  const handleAddressBlur = () => {
    setTimeout(() => {
      setAddressFocus(false);
    }, 200);
  };

  const handleAddressItem = (address) => {
    setAddress(address.displayString);
    setCity(address.city);
    setState(address.state);
    setZip(address.postalCode);
    setCountry(address.country);
    setStreet(address.street);
    setAddressFocus(false);
    setLocation({
      latitude: address.coordinates.latitude,
      longitude: address.coordinates.longitude,
    });
  };

  const handleSubmitForm = async () => {
    const toastId = toast.loading("Saving address...");
    setSubmitButtonDisabled(true);
    let newAddressString = address;

    if (apartment.trim() !== "") {
      newAddressString = `${apartment.trim()} - ${newAddressString}`;
    }
    Submit({
      address: newAddressString,
      apartment,
      street,
      city,
      state,
      zip,
      country,
      location,
    })
      .then(() => {
        setTimeout(() => {
          toast.success("Address saved successfully", { id: toastId });
          setSubmitButtonDisabled(false);
          Close();
        }, 2000);
      })
      .catch(() => {
        setTimeout(() => {
          toast.error("Error saving address", { id: toastId });
          setSubmitButtonDisabled(false);
        }, 2000);
      });
  };

  const handleClearForm = () => {
    setAddress("");
    setApartment("");
    setStreet("");
    setCity("");
    setState("");
    setZip("");
    setCountry("");
    setAddressSuggestions([]);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col sm:flex-row sm:space-x-4">
        {/* Map Section */}
        <div className="w-full sm:w-2/5 p-4 min-h-[300px]">
          <DynamicMap
            location={location}
            className="w-full h-full overflow-hidden"
            extraTailwindCSSClass={"rounded-lg shadow-sm"}
          />
        </div>

        {/* Form Section */}
        <div className="w-full sm:w-3/5 p-4">
          <div className="bg-white p-6 rounded-lg space-y-6 shadow-sm">
            {/* Address Input */}
            <div className="relative">
              <label className="block text-sm font-semibold mb-2">
                Address*
              </label>
              <input
                type="search"
                className="block w-full px-4 py-2 rounded border border-green-500 shadow-sm"
                placeholder="Start typing your address for autocomplete..."
                value={address}
                onChange={handleAddressChange}
                onFocus={handleAddressFocus}
                onBlur={handleAddressBlur}
              />

              {addressFocus && (
                <div className="absolute w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-md z-10 overflow-y-auto h-80">
                  {addressSuggestions?.length !== 0 ? (
                    addressSuggestions?.map((suggestion) => (
                      <AddressListItem
                        key={suggestion.id}
                        address={suggestion}
                        onClick={() => handleAddressItem(suggestion)}
                      />
                    ))
                  ) : (
                    <div className="p-2 text-sm text-gray-500">
                      No results found
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Apartment, Street */}
            <div className="flex flex-col md:flex-row md:space-x-4">
              <div className="flex-1">
                <label className="block mt-4 text-sm font-semibold mb-2">
                  Apt# or Suite#
                </label>
                <input
                  type="text"
                  className="block w-full px-4 py-2 rounded border border-gray-300 shadow-sm"
                  placeholder="Apt No. (optional)"
                  value={apartment}
                  onChange={(e) => setApartment(e.target.value)}
                />
              </div>
              <div className="flex-1">
                <label className="block mt-4 text-sm font-semibold mb-2">
                  Street # and Name
                </label>
                <input
                  type="text"
                  className="block w-full px-4 py-2 rounded border border-gray-300 shadow-sm bg-gray-100 cursor-not-allowed"
                  placeholder="Street number and name"
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                  readOnly
                />
              </div>
            </div>

            {/* City, Province, ZIP */}
            <div className="flex flex-col md:flex-row md:space-x-4">
              <div className="flex-1">
                <label className="block mt-4 text-sm font-semibold mb-2">
                  City
                </label>
                <input
                  type="text"
                  className="block w-full px-4 py-2 rounded border border-gray-300 shadow-sm bg-gray-100 cursor-not-allowed"
                  placeholder="City"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  readOnly
                />
              </div>
              <div className="flex-1">
                <label className="block mt-4 text-sm font-semibold mb-2">
                  Province
                </label>
                <input
                  type="text"
                  className="block w-full px-4 py-2 rounded border border-gray-300 shadow-sm bg-gray-100 cursor-not-allowed"
                  placeholder="Province"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  readOnly
                />
              </div>
              <div className="flex-1">
                <label className="block mt-4 text-sm font-semibold mb-2">
                  ZIP Code
                </label>
                <input
                  type="text"
                  className="block w-full px-4 py-2 rounded border border-gray-300 shadow-sm bg-gray-100 cursor-not-allowed"
                  placeholder="ZIP Code"
                  value={zip}
                  onChange={(e) => setZip(e.target.value)}
                  readOnly
                />
              </div>
            </div>

            {/* Country */}
            <div>
              <label className="block mt-4 text-sm font-semibold mb-2">
                Country
              </label>
              <input
                type="text"
                className="block w-full px-4 py-2 rounded border border-gray-300 shadow-sm bg-gray-100 cursor-not-allowed"
                placeholder="Country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                readOnly
              />
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row sm:space-x-4">
              <button
                type="submit"
                className={`w-full sm:w-auto mt-4 px-4 py-2 rounded focus:outline-none 
    ${
      submitButtonDisabled
        ? "bg-gray-400 cursor-not-allowed"
        : "bg-green-600 hover:bg-green-700 focus:bg-green-700 text-white"
    }`}
                onClick={handleSubmitForm}
                disabled={submitButtonDisabled}
              >
                Save Address
              </button>

              <button
                type="reset"
                className={`w-full sm:w-auto mt-4 px-4 py-2 rounded focus:outline-none 
    ${
      submitButtonDisabled
        ? "bg-gray-400 cursor-not-allowed"
        : "bg-red-500 hover:bg-red-600 focus:bg-red-600 text-white"
    }`}
                onClick={handleClearForm}
                disabled={submitButtonDisabled}
              >
                Clear Form
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddressEditor;

export { AddressEditor, AddressListItem };