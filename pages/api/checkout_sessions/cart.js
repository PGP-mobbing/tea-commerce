// import { validateCartItems } from "use-shopping-cart/src/serverUtil";
import Stripe from "stripe";
import { sanityClient } from "../../../lib/sanity/client";

import { validateCartItems } from '../../../utils/apiHelpers';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  // https://github.com/stripe/stripe-node#configuration
  apiVersion: "2020-03-02",
});

const formatLineItems = (cartDetails) => {
  const lineItems = []
  for (const id in cartDetails) {
    lineItems.push({ price: id, quantity: cartDetails[id].quantity })
  }

  return lineItems
}

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      // Validate the cart details that were sent from the client.
      const cartItems = req.body;
      //Sanity client performs merchQuery
      const query = '*[_type == "tea"] { title, tagline, image, price, "id": _id, stock, slug, details }'
      let sanityData = await sanityClient.fetch(query);


      console.log(sanityData[3]);
      console.log('----------------------------')
      console.log(cartItems);

			// The POST request is then validated against the data from Sanity.
      const line_items = validateCartItems(sanityData, cartItems);

      console.log('line items', line_items);
      // Create Checkout Sessions from body params.
      const params = {
        submit_type: "pay",
        mode: "payment",
        payment_method_types: ["card"],
        billing_address_collection: "auto",
        shipping_address_collection: {
          allowed_countries: ["US", "NO"],
        },
				//The validated cart items are inserted.
        line_items,
        success_url: `${req.headers.origin}/result?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}`,
      };
      const checkoutSession = await stripe.checkout.sessions.create(params);

      res.status(200).json(checkoutSession);
    } catch (err) {
      res.status(500).json({ statusCode: 500, message: err.message });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
