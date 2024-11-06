import React, { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import toast from "react-hot-toast";

const CheckoutForm = ({ rate, onPaymentSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [zip, setZip] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

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
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">Checkout</h2>
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">Card Details</label>
        <div className="p-3 border border-gray-300 rounded-md">
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
          value={zip}
          onChange={(e) => setZip(e.target.value)}
          className="p-2 border border-gray-300 rounded-md w-full"
          placeholder="ZIP Code"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-green-500 text-white py-3 rounded-md font-semibold hover:bg-green-600 transition"
      >
        Pay ${rate}
      </button>
    </form>
  );
};

export default CheckoutForm;
