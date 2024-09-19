"use client";
import dynamic from "next/dynamic";
import React from "react";

// Custom loading spinner
function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-green-500"></div>
      <span className="ml-4 text-lg font-semibold text-gray-700">Loading...</span>
    </div>
  );
}

// Dynamically import the ProfilePage component with a loading spinner
const DynamicProfilePage = dynamic(() => import("../lib/profile"), {
  loading: () => <LoadingSpinner />, // Use custom loading spinner here
  ssr: false,
});

export default function ProfilePage() {
  return <DynamicProfilePage />;
}
