"use client";
import React from 'react';
import jwt from 'jsonwebtoken';
import nookies from 'nookies';
import Cookie from 'js-cookie';
import { useEffect } from 'react';
import { useState } from 'react';

// Default export function that returns a page object
export default function DashboardPage() {
  const [username, setusername] = useState(null);
  const getUsernameFromToken = async () => {
    // Your logic to decode the session token and get the username
    const token = Cookie.get('authToken');
    console.log(token);
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/private/user`, {
      method: 'GET',
      headers: {
        'Authorization': `JWT ${token}`,
      },
    });
    const responseData = await response.json();
    console.log(responseData);
    if (response.ok) {
      console.log('User profile metadata fetched successfully', responseData);
      setusername(responseData.user.fname);
    } 
    else {
      console.log('Failed to fetch user profile metadata', responseData);
      throw new Error(responseData.message || 'Failed to fetch user profile metadata');
    }
  };
  
  useEffect(() => {
    getUsernameFromToken();
  }, [])

  return (
    <div className="font-sans">
    {/* Hero Section with Personalized Greeting */}
    <div className="bg-green-600 text-white text-center py-12 px-4">
      <h1 className="text-5xl font-bold mb-3">Welcome to PSW Support Finder</h1>
      <p className="text-2xl mb-4">Hi, {username || 'Guest'}</p>
      <p className="text-lg mt-2 max-w-4xl mx-auto">
        Connecting care seekers with professional Personal Support Workers. 
        Together, we create a community where quality care meets convenience and compassion.
      </p>
    </div>

    {/* About Section */}
    <div className="bg-white py-8 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-semibold mb-6">Empowering Personal Support Workers</h2>
        <p className="text-gray-700">
          At PSW Support Finder, we believe in empowering Personal Support Workers by providing them with a platform
          to offer their essential services to those in need. Whether it's assisting with daily living activities, providing companionship, 
          or specialized care, our PSWs are dedicated to enhancing the quality of life for our clients.
        </p>
      </div>
    </div>

    {/* Features Section */}
    <div className="py-8 px-4">
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Feature 1 */}
        <div className="bg-white shadow-lg rounded-lg p-6 text-center">
            {/* <Image src="/path-to-feature-icon-1.svg" alt="Seamless Connections" width={64} height={64} className="mb-4 mx-auto"/> */}
            <h4 className="text-xl font-semibold mb-2">Seamless Connections</h4>
            <p>Easily connect with available PSWs in your area through our intuitive platform.</p>
          </div>
        {/* Feature 2 */}
        <div className="bg-white shadow-lg rounded-lg p-6 text-center">
          {/* <img src="/path-to-feature2-image.jpg" alt="Feature 2" className="w-48 h-48 object-cover mb-4" />  */}
          <h4 className="text-xl font-semibold mb-2">Trusted Professionals</h4>
          <p>
            Every PSW is thoroughly vetted to ensure the highest standard of care and expertise.
          </p>
        </div>
        {/* Add more features as needed */}
      </div>
    </div>

    {/* CTA Section */}
    <div className="bg-green-600 text-white text-center py-8 px-4">
      <h2 className="text-3xl font-bold mb-3">Join Our Community</h2>
      <p className="mb-6">
        Become a part of a growing network that values exceptional care and support.
      </p>
      <button className="bg-white text-green-600 font-semibold py-2 px-4 rounded-full hover:bg-gray-100 transition duration-300">
        Sign Up to newsletter
      </button>
    </div>
  </div>
  );
}
