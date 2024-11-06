import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY); 

export async function POST(req) {
  try {
    const { amount } = await req.json(); // Parse the request body to get the amount

    // Create a PaymentIntent with the specified amount
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "cad", // Canadian Dollars
      payment_method_types: ["card"],
    });

    return new Response(JSON.stringify({ clientSecret: paymentIntent.client_secret }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
