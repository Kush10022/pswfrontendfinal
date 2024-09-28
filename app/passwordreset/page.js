"use client";
import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  initiatePasswordReset,
  validatePasswordResetToken,
  newPasswordResetting,
} from "../lib/Password";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import toast from "react-hot-toast";

// Loading Spinner Component
const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-green-500"></div>
      <span className="ml-4 text-lg font-semibold text-gray-700">
        Loading...
      </span>
    </div>
  );
};

const Page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [hasToken, setHasToken] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const token = searchParams.get("token");

  useEffect(() => {
    if (!token) {
      return;
    }

    const validation = async () => {
      setLoading(true);
      const toastId = toast.loading("Verifying token...");
      const response = await validatePasswordResetToken(token);

      if (!response.valid) {
        setTimeout(() => {
          toast.error(
            "Token expired, please request a new password reset link",
            {
              id: toastId,
            }
          );
          setLoading(false);
          setModalMessage("Token expired, please request a new reset link.");
          setShowModal(true);
          return;
        }, 1000);
      } else {
        setTimeout(() => {
          toast.success("Token verified, please enter your new password", {
            id: toastId,
          });
          setHasToken(true);
          setLoading(false);
        });
      }
    };
    validation();
  }, [token, router]);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
  };

  const handleRequestReset = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Sending password reset request");

    const isSuccess = await initiatePasswordReset(email);

    if (!isSuccess) {
      setTimeout(() => {
        toast.error("Password reset request failed, please try again", {
          id: toastId,
        });
        setModalMessage("Password reset request failed, please try again.");
        setShowModal(true);
      }, 1000);
    } else {
      setTimeout(() => {
        toast.success(
          "Password reset request sent, check your email (including spam folder)",
          { id: toastId }
        );
        setModalMessage(
          "Password reset request sent! Check your email and spam folder."
        );
        setShowModal(true);
      }, 1000);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (newPassword !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      toast.error("Passwords do not match");
      return;
    }

    if (!passwordRegex.test(newPassword)) {
      setErrorMessage(
        "Password must be 8+ characters, have uppercase, lowercase, number, and special character."
      );
      toast.error(
        "Password must be 8+ characters, have uppercase, lowercase, number, and special character."
      );
      return;
    }

    const toastId = toast.loading("Setting new password...");
    const response = await newPasswordResetting(token, newPassword);

    if (!response.success) {
      setTimeout(() => {
        toast.error("Password reset failed, please try again", {
          id: toastId,
        });
        setModalMessage("Password reset failed, please try again.");
        setShowModal(true);
      });
    } else {
      setTimeout(() => {
        toast.success("Password reset successful!", {
          id: toastId,
        });
        setModalMessage("Password reset successful! You will be redirected.");
        setShowModal(true);
      }, 1000);
    }
  };

  const handleCancel = () => {
    router.back();
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        {hasToken ? (
          <>
            <h1 className="text-2xl font-bold mb-6 text-center">
              Set New Password
            </h1>
            <form onSubmit={handleResetPassword} className="space-y-4">
              <div className="relative">
                <input
                  type={isPasswordVisible ? "text" : "password"}
                  className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  autoComplete="on"
                  onBlur={() => setIsPasswordVisible(false)}
                  required
                />
                <FontAwesomeIcon
                  icon={isPasswordVisible ? faEyeSlash : faEye}
                  className="absolute right-3 top-3 cursor-pointer text-gray-500"
                  onClick={togglePasswordVisibility}
                />
                <p className="text-red-500 text-sm mt-1">{errorMessage}</p>
              </div>
              <div className="relative">
                <input
                  type={isConfirmPasswordVisible ? "text" : "password"}
                  className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  autoComplete="on"
                  onBlur={() => setIsConfirmPasswordVisible(false)}
                  required
                />
                <FontAwesomeIcon
                  icon={isConfirmPasswordVisible ? faEyeSlash : faEye}
                  className="absolute right-3 top-3 cursor-pointer text-gray-500"
                  onClick={toggleConfirmPasswordVisibility}
                />
              </div>
              <div className="flex space-x-4 mt-6">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300 w-full"
                >
                  Set Password
                </button>
                <button
                  type="button"
                  className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500 transition duration-300 w-full"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              </div>
            </form>
          </>
        ) : (
          <>
            <h1 className="text-2xl font-bold mb-6 text-center">
              Reset your password
            </h1>
            <form onSubmit={handleRequestReset} className="space-y-4">
              <div>
                <input
                  type="email"
                  className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="flex space-x-4 mt-6">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300 w-full"
                >
                  Request
                </button>
                <button
                  type="button"
                  className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500 transition duration-300 w-full"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              </div>
            </form>
          </>
        )}
      </div>

      {/* Modal for success or failure */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
            <h2 className="text-xl font-bold mb-4">Status</h2>
            <p>{modalMessage}</p>
            <div className="mt-6 flex justify-end space-x-4">
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded-md"
                onClick={() => {
                  setShowModal(false);
                  router.push("/login");
                }}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default function PasswordResetPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Page />
    </Suspense>
  );
}
