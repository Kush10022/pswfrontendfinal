import React, { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import toast from "react-hot-toast";

const CheckoutForm = ({ rate, onPaymentSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [zip, setZip] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);


  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsProcessing(true);

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    try {
      // Step 1: Create a Payment Intent by calling your backend
      const response = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: rate * 100 }), // Convert to cents
      });

      const { clientSecret } = await response.json();

      // Step 2: Confirm the payment using Stripe
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            address: { postal_code: zip }, // Include the ZIP code here
          },
        },
      });

      if (error) {
        toast.error("Payment failed. Please try again.");
      } else if (paymentIntent.status === "succeeded") {
        toast.success("Payment successful! Thank you for your booking.");
        onPaymentSuccess();
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Checkout</h2>
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">Card Details</label>
        <div className="p-3 border border-gray-300 rounded-md shadow-sm bg-gray-50">
          <CardElement
            options={{
              style: {
                base: { fontSize: "16px", color: "#32325d", "::placeholder": { color: "#a0aec0" } },
                invalid: { color: "#fa755a" },
              },
              hidePostalCode: true, // Hide the built-in postal code field
            }}
            className="outline-none"
          />
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">ZIP Code</label>
        <input
          type="text"
          className="p-3 border border-gray-300 rounded-md w-full shadow-sm bg-gray-50 focus:border-green-500 focus:ring focus:ring-green-200 transition"
          placeholder="ZIP Code"
          required
        />
      </div>
      <button
        type="submit"
        disabled={!stripe || isProcessing}
        className="w-full bg-green-500 text-white py-3 rounded-md font-semibold hover:bg-green-600 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50"
      >
        {isProcessing ? "Processing..." : `Pay $${rate}`}
      </button>
    </form>
  );
};

export default CheckoutForm;
