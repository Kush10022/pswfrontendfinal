import React, { useState } from "react";
import toast from "react-hot-toast";

const PersonalInfo = ({ user, submit, onClose }) => {
  const [fname, setFname] = useState(user?.fname || "");
  const [lname, setLname] = useState(user?.lname || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [mobile, setMobile] = useState(user?.mobile || "");
  const [isPSW, setIsPSW] = useState(user?.isPSW || false);
  const [isSaving, setIsSaving] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    // Define the patterns for phone number validation
    const phonePattern1 = /^\(?([0-9]{3})\)?[-.●]?([0-9]{3})[-.●]?([0-9]{4})$/; // Accepts 123-456-7890, 123.456.7890, (123) 456-7890
    const phonePattern2 = /^\(\d{3}\)\s\d{3}-\d{4}$/; // Accepts (123) 456-7890
    const phonePattern3 = /^[0-9]{10}$/; // Accepts 1234567890 (10 digits with no separators)

    // Check for required fields and validate phone numbers
    if (!fname) newErrors.fname = "First Name is required.";
    if (!lname) newErrors.lname = "Last Name is required.";

    // Validate phone using any of the patterns
    if (
      phone &&
      !(
        phone.match(phonePattern1) ||
        phone.match(phonePattern2) ||
        phone.match(phonePattern3)
      )
    ) {
      newErrors.phone =
        "Phone number format must be either (xxx) xxx-xxxx, xxx-xxx-xxxx, or xxxxxxxxxx.";
    }

    // Validate mobile using any of the patterns
    if (
      mobile &&
      !(
        mobile.match(phonePattern1) ||
        mobile.match(phonePattern2) ||
        mobile.match(phonePattern3)
      )
    ) {
      newErrors.mobile =
        "Mobile number format must be either (xxx) xxx-xxxx, xxx-xxx-xxxx, or xxxxxxxxxx.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const formatPhoneNumber = (phone) => {
    // Remove all non-digit characters from the input
    const cleaned = ("" + phone).replace(/\D/g, "");

    // Check if the cleaned number is 10 digits long
    if (cleaned.length === 10) {
      const part1 = cleaned.substring(0, 3);
      const part2 = cleaned.substring(3, 6);
      const part3 = cleaned.substring(6, 10);
      return `(${part1}) ${part2}-${part3}`;
    }

    // If the phone number isn't 10 digits, return it as is (invalid)
    return phone;
  };

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

    if (errors[name]) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error("Please fix the errors before submitting.");
      return;
    }

    setIsSaving(true);
    const toastId = toast.loading("Saving your information...");

    // Format phone and mobile numbers before submitting
    const formattedPhone = formatPhoneNumber(phone);
    const formattedMobile = formatPhoneNumber(mobile);

    const data = {
      fname,
      lname,
      phone: formattedPhone,
      mobile: formattedMobile,
      isPSW,
    };

    try {
      await submit(data);
      setTimeout(() => {
        toast.success("Your information has been saved successfully", {
          id: toastId,
        });
        setIsSaving(false);
        onClose();
      }, 1000);
    } catch (error) {
      setTimeout(() => {
        const message =
          error.message || "An error occurred while saving your information";
        toast.error(message, { id: toastId });
        setIsSaving(false);
      }, 1000);
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md max-w-md mx-auto md:max-w-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Personal Information
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* First Name */}
        <div>
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="fname"
          >
            First Name
          </label>
          <input
            type="text"
            name="fname"
            value={fname}
            onChange={handleChange}
            placeholder="Please enter your first name"
            className={`w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 ${
              errors.fname ? "border-red-500" : ""
            }`}
            required
          />
          {errors.fname && (
            <p className="text-red-500 text-sm mt-1">{errors.fname}</p>
          )}
        </div>
        {/* Last Name */}
        <div>
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="lname"
          >
            Last Name
          </label>
          <input
            type="text"
            name="lname"
            value={lname}
            onChange={handleChange}
            placeholder="Please enter your last name"
            className={`w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 ${
              errors.lname ? "border-red-500" : ""
            }`}
            required
          />
          {errors.lname && (
            <p className="text-red-500 text-sm mt-1">{errors.lname}</p>
          )}
        </div>
        {/* Phone */}
        <div>
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="phone"
          >
            Phone - Home
          </label>
          <div className="flex items-center">
            <div className="flex items-center px-3 py-2 bg-gray-100 border border-gray-300 rounded-l-md">
              <span className="mr-2">🇨🇦</span>
              <span className="text-gray-700 font-medium">+1</span>
            </div>
            <input
              type="tel"
              name="phone"
              value={phone}
              onChange={handleChange}
              placeholder="(xxx) xxx-xxxx"
              className={`w-full px-4 py-2 border border-gray-300 rounded-r-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 ${
                errors.phone ? "border-red-500" : ""
              }`}
            />
          </div>
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
          )}
        </div>
        {/* Mobile */}
        <div>
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="mobile"
          >
            Mobile - Cell
          </label>
          <div className="flex items-center">
            <div className="flex items-center px-3 py-2 bg-gray-100 border border-gray-300 rounded-l-md">
              <span className="mr-2">🇨🇦</span>
              <span className="text-gray-700 font-medium">+1</span>
            </div>
            <input
              type="tel"
              name="mobile"
              value={mobile}
              onChange={handleChange}
              placeholder="(xxx) xxx-xxxx"
              className={`w-full px-4 py-2 border border-gray-300 rounded-r-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 ${
                errors.mobile ? "border-red-500" : ""
              }`}
            />
          </div>
          {errors.mobile && (
            <p className="text-red-500 text-sm mt-1">{errors.mobile}</p>
          )}
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
            className={`w-full bg-green-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-green-600 transition duration-200 ease-in-out ${
              isSaving ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isSaving}
          >
            {isSaving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
};

export { PersonalInfo };
