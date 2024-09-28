/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Cookies from "js-cookie";

export default function Home() {
  const router = useRouter();

  if (Cookies.get("authToken")) {
    router.push("/dashboard");
  }

  return (
    <div className="max-w-full mx-auto bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex min-h-screen bg-white">
          {/* Text Section */}
          <div className="flex-1 flex flex-col justify-center px-6 md:px-12 lg:px-12">
            <h1 className="text-3xl md:text-3xl font-bold mb-6">
              Connecting Care, Creating Community
            </h1>
            {/* Corrected the structure by removing <p> tag wrapping around headings and lists */}
            <div className="text-base md:text-lg mb-8">
              <h2 className="text-xl font-bold mb-2">
                Discover Seamless Care Solutions:
              </h2>
              <ul className="list-none pl-6">
                <li>
                  <strong>Find Verified PSWs:</strong> Connect with top-tier
                  Personal Support Workers.
                </li>
                <li>
                  <strong>Tailored Assistance:</strong> Access personalized care
                  plans.
                </li>
                <li>
                  <strong>Reliable Support:</strong> Rely on seamless
                  communication and coordination.
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-2">Empowering PSWs:</h2>
              <ul className="list-none pl-6">
                <li>
                  <strong>Rewarding Opportunities:</strong> Explore fulfilling
                  job opportunities.
                </li>
                <li>
                  <strong>Professional Growth:</strong> Access resources to
                  enhance your skills.
                </li>
                <li>
                  <strong>Secure Platform:</strong> Trust in our privacy-focused
                  environment.
                </li>
              </ul>
            </div>

            <p className="mt-4">
              Join PSW Support today for care and career satisfaction.
            </p>
          </div>

          {/* Image Section */}
          <div className="flex-1 hidden lg:flex justify-center items-center">
            <div className="shadow-xl rounded-lg overflow-hidden">
              <Image
                src="/bglanding.jpg"
                width={500}
                height={500}
                alt="Support Finder"
                className="rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
