/* eslint-disable @next/next/no-img-element */
"use client";
import { useState, useEffect } from "react";
import { AssitiveFetch } from "../lib/utils/assitivefetch";
import { useAtom } from "jotai";
import { userProfileAtom } from "../lib/atoms";
import Cookies from "js-cookie";

// import { JsonWebTokenError } from "jsonwebtoken";
export default function Contact() {
  const [userProfile] = useAtom(userProfileAtom);
  const token = Cookies.get("authToken");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  useEffect(() => {
    if (userProfile) {
      setFormData({
        name: userProfile.fname + " " + userProfile.lname,
        email: userProfile.email,
        message: "",
      });
    }
  }, [userProfile]);

  const { name, email, message } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { name, email, message };
    
    // await AssitiveFetch(
    //   `${process.env.NEXT_PUBLIC_API_URL}/v1/private/sendemail`,
    //   "POST",
    //   payload
    // );

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/private/sendemail`, {
      method: "POST",
      headers: {
        Authorization: `JWT ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    });
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center">
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-red-500">
              <img
                src="/contactpgwimg.jpg"
                alt="Contact Us"
                style={{ objectFit: "cover", width: "100%", height: "500px" }}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-white">
              <div className="rounded-t mb-0 px-6 py-6">
                <div className="text-center mb-3">
                  <h6 className="text-xl font-semibold">Contact Us</h6>
                </div>
                <form onSubmit={handleSubmit} className="px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={name}
                      onChange={handleChange}
                      className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                      placeholder="Enter your name"
                      required
                    />
                  </div>

                  <div className="relative w-full mb-3">
                    <label className="block uppercase text-gray-700 text-xs font-bold mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={email}
                      onChange={handleChange}
                      className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                      placeholder="Enter your email"
                      required
                    />
                  </div>

                  <div className="relative w-full mb-3">
                    <label className="block uppercase text-gray-700 text-xs font-bold mb-2">
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={message}
                      onChange={handleChange}
                      rows="4"
                      className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                      placeholder="Type a message..."
                      required
                    ></textarea>
                  </div>

                  <div className="text-center mt-6">
                    <button
                      className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
                      type="submit"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
