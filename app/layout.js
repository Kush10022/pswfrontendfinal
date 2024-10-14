import React from "react";
import Navigation from "./lib/Navigation";
import { Toaster } from "react-hot-toast";
import "./global.css";
import "bootstrap/dist/css/bootstrap.css";

export const metadata = {
  title: "Support Worker",
  description: "Find the best support workers near you",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <Toaster />
        <div className="sticky top-0 z-50">
          <Navigation />
        </div>

        <div className="fixed top-10 left-0 right-0 w-screen h-screen bg-white shadow-lg border border-gray-300 overflow-hidden">
          <div className="h-full overflow-y-auto p-4">{children}</div>
        </div>
      </body>
    </html>
  );
}
