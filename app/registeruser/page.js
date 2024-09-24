"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AssitiveFetch } from "../lib/assitivefetch";
import toast from "react-hot-toast";
import Cookies from "js-cookie";

export default function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPSW, setIsPSW] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  if (Cookies.get("authToken")) {
    router.push("/dashboard");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setIsSubmitting(true);

    // Check if passwords match
    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      setIsSubmitting(false);
      return;
    }

    const toastId = toast.loading("Registering...");

    try {
      const payload = {
        firstName,
        lastName,
        email,
        password,
        PSW: isPSW,
      };

      const responseData = await AssitiveFetch(
        `${process.env.NEXT_PUBLIC_API_URL}/v1/auth/register`,
        "POST",
        payload
      );

      if (responseData.status === "error" && responseData.error.message) {
        setTimeout(() => {
          toast.error(responseData.error.message, { id: toastId });
          setIsSubmitting(false);
        }, 1000);
        return;
      }

      setTimeout(() => {
        toast.success("Registration successful!", { id: toastId });
        router.push("/afterEmailregister");
      }, 1000);
    } catch (err) {
      setTimeout(() => {
        toast.error("An error occurred. Please try again later.", {
          id: toastId,
        });
        setIsSubmitting(false);
      }, 1000);
    }
  }

  return (
    <>
      <div className="h-full flex justify-center items-center pt-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full md:w-3/4">
          {/* Registration Form Section */}
          <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md flex flex-col justify-center">
            <h2 className="text-3xl font-bold mb-6 text-center">
              Create an account
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <input
                  type="text"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Switch toggle for PSW or client */}
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm font-semibold">
                  I am a Personal Support Worker
                </span>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={isPSW}
                    onChange={(e) => setIsPSW(e.target.checked)}
                    className="sr-only"
                  />
                  <div
                    className={`relative w-14 h-8 transition duration-200 ease-linear rounded-full ${
                      !isPSW ? "bg-green-600" : "bg-gray-400"
                    }`}
                  >
                    <span
                      className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform ${
                        !isPSW ? "transform translate-x-6" : ""
                      }`}
                    />
                  </div>
                </label>
                <span className="text-sm font-semibold pl-4">
                  I want to hire a PSW
                </span>
              </div>

              <div>
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <input
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <button
                type="submit"
                className={`w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded ${
                  isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Signing up..." : "Sign Up"}
              </button>
            </form>
            <p className="text-center mt-4 text-sm">
              Already have an account?{" "}
              <Link href="/login" className="text-blue-500 hover:underline">
                Login
              </Link>
            </p>
          </div>

          {/* Info Section */}
          <div className="bg-green-700 p-8 rounded-lg text-white flex flex-col justify-center items-center text-center">
            <h2 className="text-2xl font-bold mb-4">PSW Support and Care</h2>
            <p className="mb-4">
              Support Worker is an innovative online company dedicated to
              providing personal support services. Our mission is to offer
              accessible, high-quality assistance to individuals in need,
              directly through our online platform.
            </p>
            <p className="mb-4">
              Whether it's assistance with daily activities, health-related
              support, or companionship, our goal is to enhance the quality of
              life for those we serve.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
