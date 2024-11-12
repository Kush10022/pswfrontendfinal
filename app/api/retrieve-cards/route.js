import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    const { paymentMethods } = await req.json();

    // Use Promise.all to handle multiple asynchronous operations
    const cardDetails = await Promise.all(
      paymentMethods.map(async (method) => {
        const card = await stripe.paymentMethods.retrieve(method);
        return {
          brand: card.card.brand,
          paymentId: method,
          last4: card.card.last4,
          exp_month: card.card.exp_month,
          exp_year: card.card.exp_year,
        };
      })
    );

    return new Response(JSON.stringify({ cardDetails }), {
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
