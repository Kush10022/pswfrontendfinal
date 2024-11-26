import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    const { amount, paymentMethodId, email } = await req.json();

    // Step 1: Search for an existing customer by email
    const existingCustomers = await stripe.customers.list({
      email,
      limit: 1,
    });
    console.log("existing" ,existingCustomers);

    let customer;
    if (existingCustomers.data.length > 0) {
      // Use the existing customer
      customer = existingCustomers.data[0];
    } else {
      // Create a new customer if none exists
      customer = await stripe.customers.create({
        email,
        payment_method: paymentMethodId,
        invoice_settings: { default_payment_method: paymentMethodId },
      });
    }

    console.log(customer);
    // Step 2: Attach the payment method to the customer
    await stripe.paymentMethods.attach(paymentMethodId, {
      customer: customer.id,
    });

    // Step 3: Create a Payment Intent using the customer
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "cad",
      customer: customer.id,
      payment_method: paymentMethodId,
      off_session: true,
      confirm: true,
    });

    // Return the clientSecret and paymentMethodId to the frontend
    return new Response(
      JSON.stringify({
        clientSecret: paymentIntent.client_secret,
        paymentMethodId, // Return the payment method ID for saving in your backend
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
