import React, { useState, useEffect } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import Modal from "react-responsive-modal";
import toast from "react-hot-toast";
import { useAtom } from "jotai";
import { userProfileAtom, serachParamsAtom } from "../atoms";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";



// Custom loading spinner
function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-green-500"></div>
      <span className="ml-4 text-lg font-semibold text-gray-700">Loading...</span>
    </div>
  );
}


const CheckoutForm = ({ rate, onPaymentSuccess, currPsw }) => {
  const [searchParams, setSearchParams] = useAtom(serachParamsAtom);
  const stripe = useStripe();
  const router = useRouter();
  const elements = useElements();
  const [zip, setZip] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userProfile, setUserProfile] = useAtom(userProfileAtom);
  const userEmail = userProfile?.email;
  const [cards, setCards] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [selectedPaymentAmount, setSelectedPaymentAmount] = useState(null);
  const [useCard, setUseCard] = useState(null);
  const [cardLoading, setCardLoading] = useState(false);


  // Function to retrieve saved cards
  const retriveCards = async () => {
    setCardLoading(true);
    if (userProfile?.cards?.length > 0) {
      try {
        const response = await fetch("/api/retrieve-cards", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ paymentMethods: userProfile.cards }),
        });
        if (response.status === 200) {
          const data = await response.json();
          setCards(data.cardDetails);
        }
        setCardLoading(false);
      }
      catch (error) {
        console.error("Error retrieving cards:", error);
        toast.error("Failed to retrieve saved cards.");
        setCardLoading(false);
      }
    }
    else if (userProfile?.cards?.length === 0) {
      setCards([]);
    }
    setCardLoading(false);
  };

  useEffect(() => {
    if (refresh) {
      // console.log("Refreshing cards...");
      // console.log("Refresh:", refresh);
      // console.log("User Profile:", userProfile);
      // console.log("Cards:", cards);
      setRefresh(false);
      retriveCards();
      router.refresh();
      console.log("Refreshing cards...");
      console.log("Refresh:", refresh);
      console.log("User Profile:", userProfile);
      console.log("Cards:", cards);
    }
  }, [refresh]);

  useEffect(() => {
    retriveCards();
  }, []);

  const handleSaveCard = async (event) => {
    event.preventDefault();
    setIsProcessing(true);

    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);

    try {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
        billing_details: {
          email: userEmail,
          address: { postal_code: zip },
        },
      });

      if (error) {
        toast.error("Error creating payment method.");
        setIsProcessing(false);
        return;
      }

      const jwtToken = Cookies.get("authToken");
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/private/user/payment`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${jwtToken}`,
        },
        body: JSON.stringify({ paymentCard: paymentMethod.id }),
      });

      if (response.status === 200) {
        const data = await response.json();
        const currUser = { ...userProfile, cards: data.cards };
        setUserProfile(currUser);
        setRefresh(true);
        toast.success("Card saved successfully!");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsProcessing(false);
      setIsModalOpen(false);
    }
  };

  const handleUseCard = async (paymentId, last4) => {
    setIsProcessing(true);
    setSelectedPaymentAmount(`Paying with card ending in ${last4}.`);
    setUseCard(paymentId);


    try {
      const response = await fetch("/api/create-customer-and-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: rate * 100,
          paymentMethodId: paymentId,
          email: userEmail,
        }),
      });

      const { clientSecret } = await response.json();
      if (!clientSecret) {
        throw new Error("Failed to create Payment Intent.");
      }

      const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(clientSecret);
      // toast.success("Payment successful! Proceeding with booking.");
      // Proceed with booking after successful payment
      const jwtToken = Cookies.get("authToken");
      const bookingData = {
        pswEmail: currPsw?.email,
        pswName: currPsw?.name,
        pswAppointmentDate: searchParams.day,
        clientEmail: userProfile?.email,
        appointmentAddress: userProfile?.address.address,
        appointmentLocation: userProfile?.address.location,
        clientName: `${userProfile?.fname} ${userProfile?.lname}`,
        pswRate: currPsw?.rate,
      };
    
      const bookingResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/private/user/booking`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${jwtToken}`,
        },
        body: JSON.stringify({ paymentCard: paymentId, bookingData }),
      });
    
      const bookingResult = await bookingResponse.json();
      console.log("Booking Response:", bookingResult);
      
      if (bookingResponse.status !== 201) {
        throw new Error("Failed to complete booking.");
      }
      
      // toast.success("Booking confirmed! Check your email for details.");

      // if (confirmError) {
      //   console.error("Payment Error:", confirmError.message);
      //   toast.error(`Payment failed: ${confirmError.message}`);
      if (paymentIntent.status === "succeeded") {
        toast.success("Payment successful! Thank you for your booking.");
        onPaymentSuccess();
      }
    } catch (error) {
      console.error("Payment Error:", error);
      toast.error("An error occurred. Please try again.");
    }
    finally {
      setIsProcessing(false);
      setSelectedPaymentAmount(null);
    }

  };

  const handleRemoveCard = async (paymentId) => {
    setIsProcessing(true);
    console.log("Payment ID:", paymentId);
    console.log("User Email:", userEmail);
    try {
      // Call the Next.js API to remove the card
      const response = await fetch("/api/remove-card", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ paymentMethodId: paymentId, email: userEmail }),
      });

      if (response.status === 200) {
        const { updatedCards } = await response.json();
        const currUser = { ...userProfile, cards: updatedCards };
        setUserProfile(currUser);
        setRefresh(true);
        toast.success("Card removed successfully!");
      } else {
        const { error } = await response.json();
        toast.error(`Failed to remove card: ${error}`);
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
      console.error("Error removing card:", error.message);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto bg-gray-100 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Checkout
        <span className="text-green-600 font-semibold ml-2">
          - ${rate.toFixed(2)}
        </span>
      </h2>

      {selectedPaymentAmount && (
        <p className="text-blue-600 text-center mb-4 font-semibold">
          {selectedPaymentAmount}
        </p>
      )}

      {cards.length > 0 ? (
        <div className="space-y-4">
          {cards.map((card, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 border rounded-md bg-white shadow-sm"
            >
              <div>
                <p className="text-gray-700 font-semibold">
                  {card.brand} ending in {card.last4}
                </p>
                <p className="text-sm text-gray-500">
                  Expires: {card.exp_month}/{card.exp_year}
                </p>
              </div>
              <div className="flex space-x-2">
                <button
                  className={`px-4 py-2 rounded-md font-semibold transition duration-300 ${isProcessing && useCard === card.paymentId
                    ? "bg-gray-400 text-white cursor-not-allowed"
                    : "bg-green-500 text-white hover:bg-green-600"
                    }`}
                  onClick={() => handleUseCard(card.paymentId, card.last4)}
                  disabled={isProcessing}
                >
                  Use Card
                </button>
                <button
                  className="px-4 py-2 rounded-md font-semibold bg-red-500 text-white hover:bg-red-600 transition duration-300"
                  onClick={() => handleRemoveCard(card.paymentId)}
                  disabled={isProcessing}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        cardLoading ? (<LoadingSpinner />) :
          (<p className="text-gray-500 text-center">No saved cards found.</p>)
      )}

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
            backgroundColor: "#f9f9f9",
          },
        }}
      >
        <form onSubmit={handleSaveCard} className="w-full bg-white p-6 rounded-lg shadow-lg">
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
            {isProcessing ? "Processing..." : "Save Card"}
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default CheckoutForm;
