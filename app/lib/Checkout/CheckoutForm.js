import React, { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import Modal from "react-responsive-modal";
import toast from "react-hot-toast";

const CheckoutForm = ({ rate, onPaymentSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [zip, setZip] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const savedCards = [
    { id: 1, last4: "4242", brand: "Visa", exp: "12/27" },
    { id: 2, last4: "1234", brand: "Mastercard", exp: "11/25" },
  ];

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsProcessing(true);

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    try {
      const response = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: rate * 100 }),
      });

      const { clientSecret } = await response.json();

      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            address: { postal_code: zip },
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
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto bg-gray-100 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Checkout</h2>

      <div className="space-y-4">
        {savedCards.map((card) => (
          <div
            key={card.id}
            className="flex items-center justify-between p-4 border rounded-md bg-white shadow-sm"
          >
            <div>
              <p className="text-gray-700 font-semibold">
                {card.brand} ending in {card.last4}
              </p>
              <p className="text-sm text-gray-500">Expires: {card.exp}</p>
            </div>
            <button className="text-green-500 font-medium hover:underline">
              Use Card
            </button>
          </div>
        ))}
      </div>

      <button
        className="mt-4 w-full bg-blue-500 text-white py-2 rounded-md font-semibold hover:bg-blue-600 transition-all duration-300"
        onClick={() => setIsModalOpen(true)}
      >
        Add New Card
      </button>

      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        center
        styles={{
          modal: {
            width: "500px",
            maxWidth: "90%",
            padding: "40px",
            backgroundColor: "#f9f9f9", // Light gray background for better contrast
          },
        }}
      >
        <form onSubmit={handleSubmit} className="w-full bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Add New Card</h2>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Card Details</label>
            <div className="p-3 border border-gray-300 rounded-md shadow-sm bg-gray-50">
              <CardElement
                options={{
                  style: {
                    base: { fontSize: "16px", color: "#32325d", "::placeholder": { color: "#a0aec0" } },
                    invalid: { color: "#fa755a" },
                  },
                  hidePostalCode: true,
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
              className="p-3 border border-gray-300 rounded-md w-full shadow-sm bg-gray-50 focus:border-green-500 focus:ring focus:ring-green-200 transition"
              placeholder="ZIP Code"
              required
            />
          </div>
          <button
            type="submit"
            disabled={!stripe || isProcessing}
            className="w-full bg-green-500 text-white py-3 rounded-md font-semibold hover:bg-green-600 transition-all duration-300"
          >
            {isProcessing ? "Processing..." : `Pay $${rate}`}
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default CheckoutForm;
