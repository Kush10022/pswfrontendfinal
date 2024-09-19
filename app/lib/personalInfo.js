import React from 'react';
import { useState } from 'react';

const PersonalInfo = ({ user, submit, onClose }) => {
  const [fname, setFname] = useState(user?.fname || "");
  const [lname, setLname] = useState(user?.lname || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [mobile, setMobile] = useState(user?.mobile || "");
  const [isPSW, setIsPSW] = useState(user?.isPSW || false);

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    if (name === "fname") {
      setFname(value);
    } else if (name === "lname") {
      setLname(value);
    } else if (name === "phone") {
      setPhone(value);
    } else if (name === "mobile") {
      setMobile(value);
    } else if (name === "isPSW") {
      setIsPSW(checked);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      fname: fname,
      lname: lname,
      phone: phone,
      mobile: mobile,
      isPSW: isPSW,
    };
    await submit(data);
    onClose();
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-6">Personal Information</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* First Name */}
        <div>
          <label className="block text-gray-700 font-medium mb-2" htmlFor="fname">
            First Name
          </label>
          <input
            type="text"
            name="fname"
            value={fname}
            onChange={handleChange}
            placeholder="Please enter your first name"
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>
        {/* Last Name */}
        <div>
          <label className="block text-gray-700 font-medium mb-2" htmlFor="lname">
            Last Name
          </label>
          <input
            type="text"
            name="lname"
            value={lname}
            onChange={handleChange}
            placeholder="Please enter your last name"
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>
        {/* Phone */}
        <div>
          <label className="block text-gray-700 font-medium mb-2" htmlFor="mobile">
            Phone - Home
          </label>
          <div className="flex items-center">
            <div className="flex items-center px-3 py-2 bg-gray-100 border border-gray-300 rounded-l-md">
              <span className="mr-2">
                🇨🇦
              </span>
              <span className="text-gray-700 font-medium">
                +1
              </span>
            </div>
            <input
              type="tel"
              name="phone"
              value={phone}
              onChange={handleChange}
              placeholder="(xxx) xxx-xxxx"
              className="w-full px-4 py-2 border border-gray-300 rounded-r-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>
        {/* Mobile with Country Code and Flag */}
        <div>
          <label className="block text-gray-700 font-medium mb-2" htmlFor="mobile">
            Mobile - Cell
          </label>
          <div className="flex items-center">
            <div className="flex items-center px-3 py-2 bg-gray-100 border border-gray-300 rounded-l-md">
              <span className="mr-2">
                🇨🇦
              </span>
              <span className="text-gray-700 font-medium">
                +1
              </span>
            </div>
            <input
              type="tel"
              name="mobile"
              value={mobile}
              onChange={handleChange}
              placeholder="(xxx) xxx-xxxx"
              className="w-full px-4 py-2 border border-gray-300 rounded-r-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>
        {/* Is PSW Checkbox */}
        <div className="flex items-center">
          <input
            type="checkbox"
            name="isPSW"
            checked={isPSW}
            onChange={handleChange}
            className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
          />
          <label className="ml-2 block text-gray-700 font-medium">
            I am a Personal Support Worker
          </label>
        </div>
        {/* Submit Button */}
        <div className="mt-6">
          <button
            type="submit"
            className="w-full bg-green-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-green-600 transition duration-200 ease-in-out"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export { PersonalInfo };
