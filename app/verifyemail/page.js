'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

// Placeholder for a loading component or any other fallback UI
const Loading = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-b from-green-400 to-blue-500">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-white"></div>
      <span className="mt-4 text-2xl font-semibold text-white">
        Verifying...
      </span>
    </div>
  );
};

// Modal for missing token alert
const Modal = ({ message, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-lg shadow-lg p-6 text-center max-w-sm"
      >
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Notice</h2>
        <p className="text-gray-600 mb-6">{message}</p>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
          onClick={onClose}
        >
          OK
        </button>
      </motion.div>
    </div>
  );
};

// Async component that utilizes useSearchParams
const VerifyEmail = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get('token');
  const [statusMessage, setStatusMessage] = useState('Verifying...');
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'
  const [showModal, setShowModal] = useState(false); // Modal visibility

  // Modal close handler
  const handleModalClose = () => {
    setShowModal(false);
    router.push('/login'); // Redirect to login page after the user acknowledges
  };

  useEffect(() => {
    async function retrieveSendToken() {
      try {
        if (!token) {
          setShowModal(true); // Show modal if token is missing
          return;
        }

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/v1/auth/verifyemail`,
          {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token }),
          }
        );

        if (response.ok) {
          const responseData = await response.json();
          console.log(`response is ", ${responseData}`);
          setStatusMessage('Email verified successfully! Redirecting...');
          setMessageType('success');

          // Adding a delay before redirecting
          setTimeout(() => {
            router.push('/login');
          }, 3000);
        } else {
          setStatusMessage('Failed to verify email. Please register again.');
          setMessageType('error');
        }
      } catch (error) {
        setStatusMessage('An error occurred. Please register again.');
        setMessageType('error');
      }
    }

    retrieveSendToken();
  }, [token, router]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50 p-4">
      {showModal ? (
        <Modal
          message="No verification token found. You will be redirected to the login page."
          onClose={handleModalClose}
        />
      ) : (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white shadow-lg rounded-lg p-6 md:p-10 lg:p-12 text-center"
        >
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Email Verification
          </h1>
          {messageType && (
            <FeedbackMessage message={statusMessage} type={messageType} />
          )}
          {!messageType && (
            <p className="text-lg text-gray-600">
              Please wait while we verify your email.
            </p>
          )}
        </motion.div>
      )}
    </div>
  );
};

// Animated success or failure message
const FeedbackMessage = ({ message, type }) => {
  const messageStyles = {
    success: 'bg-green-100 text-green-600 border-green-500',
    error: 'bg-red-100 text-red-600 border-red-500',
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className={`border-l-4 p-4 rounded shadow-md mb-4 ${messageStyles[type]}`}
    >
      <p className="text-lg font-medium">{message}</p>
    </motion.div>
  );
};

// Default exported component wrapped with Suspense
export default function Verification() {
  return (
    <Suspense fallback={<Loading />}>
      <VerifyEmail />
    </Suspense>
  );
}
