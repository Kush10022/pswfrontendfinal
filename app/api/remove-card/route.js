import Stripe from "stripe";
import { cookies } from 'next/headers'
import { NextResponse, NextRequest } from "next/server";


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function DELETE(req, res) {

    const cookieStore = await cookies()
    const jwtToken = cookieStore.get('authToken')

    if (req.method !== "DELETE") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const { paymentMethodId, email } = await req.json();

    if (!paymentMethodId || !email) {
        return NextResponse.json({ error: "PaymentMethodId and Email are required" }, {status: 400});
    }
    try {
        // Step 1: Detach the card from Stripe
        await stripe.paymentMethods.detach(paymentMethodId);

        // Step 2: Call your backend to update the card list
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/private/user/payment`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `JWT ${jwtToken.value}`,
            },
            body: JSON.stringify({ paymentCard: paymentMethodId}),
        });

        if (!response.ok) {
            const error = await response.json();
            return NextResponse.json({ error: error.message || "Failed to update backend" }, {status: response.status});
        }

        const data = await response.json();

        return NextResponse.json({
            success: true,
            message: "Card removed successfully.",
            updatedCards: data.cards,
        }, {status: 200});

    } catch (error) {
        console.error("Error removing card:", error.message);
        return NextResponse.json({ error: "Failed to remove card. Please try again." }, {status: 500});
    }
}
