"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AssitiveFetch } from "../lib/utils";
import Link from "next/link";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const router = useRouter();

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  // Check if authToken exists and redirect to dashboard
  useEffect(() => {
    if (Cookies.get("authToken")) {
      router.push("/dashboard");
    }
  }, [router]);

  function setCookie(name, value, hours) {
    let expires = "";
    if (hours) {
      const date = new Date();
      date.setTime(date.getTime() + hours * 60 * 60 * 1000);
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie =
      name +
      "=" +
      (value || "") +
      expires +
      "; path=/; Secure; SameSite=Strict";
  }

  async function handleSubmit(e) {
    setIsLoggingIn(true);
    const toastId = toast.loading("Logging in...");
    e.preventDefault();
    const payload = {
      email: email,
      password: password,
    };
    try {
      const responseData = await AssitiveFetch(
        `${process.env.NEXT_PUBLIC_API_URL}/v1/auth/login`,
        "POST",
        payload
      );

      if (responseData.status === 403) {
        setTimeout(() => {
          toast.error(
            "Please verify your email before logging in or check your email for verification link.",
            { id: toastId }
          );
          setIsLoggingIn(false);
        }, 1000);
      } else if (responseData.status === "ok") {
        setCookie("authToken", responseData.token, 24); // Sets a cookie named 'authToken' with the token value, expiring in 24 hours.
        setTimeout(() => {
          toast.success("Login successful!", { id: toastId });
          setIsLoggingIn(false);
          router.push("/dashboard");
        }, 1000);
      } else {
        setTimeout(() => {
          if (responseData.error.code == 404) {
            toast.error("Please check your email and password.", {
              id: toastId,
            });
          } else {
            toast.error(responseData.error.message, { id: toastId });
          }
          setIsLoggingIn(false);
        }, 1000);
      }
    } catch (error) {
      setTimeout(() => {
        toast.error("An error occurred during login. Please try again.", {
          id: toastId,
        });
        setIsLoggingIn(false);
      }, 1000);
      console.error("Error during user login", error);
    }
  }

  return (
    <div className="my-10 pt-10">
      <div className="my-1 flex justify-center items-center h-full pt-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-1 w-full md:w-3/4">
          {/* Login Form Section */}
          <div className="bg-white p-8 rounded-lg shadow-md flex flex-col justify-center items-center w-full max-w-md">
            <h1 className="text-2xl font-bold mb-4">PSW Support and Care</h1>
            <p className="mb-4">Welcome Back, Please login to your account.</p>

            <form
              className="w-full"
              onSubmit={handleSubmit}
              role="form"
              data-testid="form-button"
            >
              <div className="mb-4">
                <input
                  type="email"
                  placeholder="Email Address"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4 relative">
                <input
                  type={isPasswordVisible ? "text" : "password"}
                  placeholder="Password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  autoComplete="on"
                  onBlur={() => setIsPasswordVisible(false)}
                  onAbort={() => setIsPasswordVisible(false)}
                />
                <FontAwesomeIcon
                  icon={isPasswordVisible ? faEyeSlash : faEye}
                  className="absolute right-3 top-3 cursor-pointer text-gray-500"
                  onClick={togglePasswordVisibility}
                />
              </div>
              <Link
                href="/passwordreset"
                className="text-sm text-blue-500 hover:underline"
              >
                Forgot password?
              </Link>
              <button
                data-testid="login-button"
                type="submit"
                className={`w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 ${
                  isLoggingIn ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={isLoggingIn}
              >
                {isLoggingIn ? "Logging in..." : "Login"}
              </button>

              <p className="text-center mt-4 text-sm">
                Don't have an account?{" "}
                <Link
                  href="/registeruser"
                  className="text-blue-500 hover:underline"
                >
                  Sign Up
                </Link>
              </p>
            </form>
          </div>

          {/* Info Section */}
          <div className="bg-green-700 p-8 rounded-lg text-white flex flex-col justify-center items-center text-center">
            <h2 className="text-2xl font-bold mb-4">How we work?</h2>
            <p className="mb-4">
              Find out how we are changing lives of hundreds of people needing
              special assistance.
            </p>
            <Link href="https://www.youtube.com/">
              <button className="text-white text-3xl">▶️</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
