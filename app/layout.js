"use client";
import React from "react";
import Navigation from "./lib/Navigation";
import { Toaster } from "react-hot-toast";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import "./global.css";
import "bootstrap/dist/css/bootstrap.css";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

// export const metadata = {
//   title: "Support Worker",
//   description: "Find the best support workers near you",
// };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <Toaster />
        <div className="sticky top-0 z-50">
          <Navigation />
        </div>
        <Elements stripe={stripePromise}>
        <div className="fixed top-10 left-0 right-0 w-screen h-screen bg-white shadow-lg border border-gray-300 overflow-hidden">
          <div className="h-full overflow-y-auto p-4">{children}</div>
        </div>
        </Elements>
      </body>
    </html>
  );
}
