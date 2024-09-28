"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AssitiveFetch } from "../lib/utils";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

// Modal Component with Escape key handling
const Modal = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      aria-modal="true"
      role="dialog"
    >
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
        <h2 className="text-2xl font-bold mb-4">Congratulations!</h2>
        <p className="mb-4">
          Registration successful! Please check your email (also check your spam
          folder) to verify your account. Once verified, you can log in.
        </p>
        <button
          onClick={onClose}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPSW, setIsPSW] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false); // Track registration status
  const [isModalOpen, setIsModalOpen] = useState(false); // Track modal state
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);
  const router = useRouter();

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
  };

  // Redirect if the user is already authenticated
  useEffect(() => {
    if (Cookies.get("authToken")) {
      router.push("/dashboard");
    }
  }, [router]);

  // Function to validate email
  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  // Function to validate password strength (min 8 characters)
  const validatePassword = (password) => {
    return password.length >= 8;
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setIsSubmitting(true);

    // Check if passwords match
    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      setIsSubmitting(false);
      return;
    }

    // Check if email is valid
    if (!validateEmail(email)) {
      toast.error("Please enter a valid email address.");
      setIsSubmitting(false);
      return;
    }

    // Check password strength
    if (!validatePassword(password)) {
      toast.error("Password must be at least 8 characters long.");
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

      // If registration is successful
      setTimeout(() => {
        toast.dismiss(toastId);
        setIsRegistered(true); // Disable the form
        setIsModalOpen(true); // Show the modal
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

  // Handle modal close and redirect to login
  const handleModalClose = () => {
    setIsModalOpen(false);
    router.push("/login");
  };

  return (
    <>
      <div className="h-full flex justify-center items-center my-10 pt-5">
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
                  disabled={isSubmitting || isRegistered}
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
                  disabled={isSubmitting || isRegistered}
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
                  disabled={isSubmitting || isRegistered}
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
                    disabled={isSubmitting || isRegistered}
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

              <div className="relative">
                <input
                  type={isPasswordVisible ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  autoComplete="on"
                  onBlur={() => setIsPasswordVisible(false)}
                  required
                  disabled={isSubmitting || isRegistered}
                />
                <FontAwesomeIcon
                  icon={isPasswordVisible ? faEyeSlash : faEye}
                  className="absolute right-3 top-3 cursor-pointer text-gray-500"
                  onClick={togglePasswordVisibility}
                />
              </div>

              <div className="relative">
                <input
                  type={isConfirmPasswordVisible ? "text" : "password"}
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  autoComplete="on"
                  onBlur={() => setIsConfirmPasswordVisible(false)}
                  required
                  disabled={isSubmitting || isRegistered}
                />
                <FontAwesomeIcon
                  icon={isConfirmPasswordVisible ? faEyeSlash : faEye}
                  className="absolute right-3 top-3 cursor-pointer text-gray-500"
                  onClick={toggleConfirmPasswordVisibility}
                />
              </div>

              <button
                type="submit"
                className={`w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded ${
                  isSubmitting || isRegistered
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
                disabled={isSubmitting || isRegistered}
              >
                {isSubmitting
                  ? "Signing up..."
                  : isRegistered
                  ? "Registration complete"
                  : "Sign Up"}
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

      {/* Modal Component */}
      <Modal isOpen={isModalOpen} onClose={handleModalClose} />
    </>
  );
}
