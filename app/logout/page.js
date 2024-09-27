"use client";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { destroyCookie } from "nookies";
import { useAtom } from "jotai";
import { userProfileAtom } from "../atoms/userAtom";
import toast from "react-hot-toast";

export default function Logout() {
  const [, setUser] = useAtom(userProfileAtom);
  const [isLoggingOut, setIsLoggingOut] = useState(false); // For spinner loading state
  const [isModalVisible, setIsModalVisible] = useState(true); // Modal visibility
  const router = useRouter();
  const modalRef = useRef(null); // For focus trap

  // Close the modal when clicking outside of it
  useEffect(() => {
    const onClose3 = () => {
      setIsModalVisible(false);
      router.back(); // Return to the previous page
    };
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose3();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [router]);

  // Trap focus inside the modal
  useEffect(() => {
    const focusableElements = "button";
    const modal = modalRef.current;
    const firstFocusableElement = modal.querySelectorAll(focusableElements)[0];
    const focusableContent = modal.querySelectorAll(focusableElements);
    const lastFocusableElement = focusableContent[focusableContent.length - 1];

    const handleTab = (event) => {
      const isTabPressed = event.key === "Tab";
      if (!isTabPressed) return;

      if (event.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstFocusableElement) {
          event.preventDefault();
          lastFocusableElement.focus();
        }
      } else {
        // Tab
        if (document.activeElement === lastFocusableElement) {
          event.preventDefault();
          firstFocusableElement.focus();
        }
      }
    };

    document.addEventListener("keydown", handleTab);
    return () => document.removeEventListener("keydown", handleTab);
  }, []);

  // Handle keyboard shortcuts and close on Esc
  useEffect(() => {
    const onConfirm2 = () => {
      setIsLoggingOut(true); // Set the loading state
      setTimeout(() => {
        setUser(null);
        destroyCookie(null, "authToken");
        toast.success("Logged out successfully");

        // Navigate to login after setting state
        router.push("/login"); // This will happen after the state updates, avoiding the warning
      }, 1500); // Simulate delay to show the loader
    };

    const onClose2 = () => {
      setIsModalVisible(false);
      router.back(); // Return to the previous page
    };

    const handleKeydown = (event) => {
      if (event.key === "Escape") {
        onClose2();
      }
      if (event.key === "Enter") {
        onConfirm2();
      }
    };
    document.addEventListener("keydown", handleKeydown);
    return () => document.removeEventListener("keydown", handleKeydown);
  }, [router, setUser]);

  const onConfirm = () => {
    setIsLoggingOut(true); // Set the loading state
    setTimeout(() => {
      setUser(null);
      destroyCookie(null, "authToken");
      toast.success("Logged out successfully");

      // Navigate to login after setting state
      router.push("/login"); // This will happen after the state updates, avoiding the warning
    }, 1500); // Simulate delay to show the loader
  };

  // Close modal and go back to the previous page
  const onClose = () => {
    setIsModalVisible(false);
    router.back(); // Return to the previous page
  };

  return isModalVisible ? (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      role="dialog"
      aria-modal="true"
    >
      <div
        ref={modalRef}
        className="bg-white p-6 rounded shadow-lg max-w-sm w-full transform transition-all duration-300 ease-out opacity-100 scale-100"
      >
        <h2 className="text-lg font-bold mb-4">Confirm Logout</h2>
        <p className="mb-6">Are you sure you want to log out?</p>
        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-500 text-white hover:bg-gray-600 transition focus:outline-none focus:ring-2 focus:ring-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600 transition focus:outline-none focus:ring-2 focus:ring-red-400 disabled:opacity-50"
            disabled={isLoggingOut}
          >
            {isLoggingOut ? (
              <svg
                className="animate-spin h-5 w-5 mr-2 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 0116 0"
                ></path>
              </svg>
            ) : (
              "Logout"
            )}
          </button>
        </div>
      </div>
    </div>
  ) : null;
}
