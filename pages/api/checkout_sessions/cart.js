import { validateCartItems } from "use-shopping-cart/src/serverUtil";
import Stripe from "stripe";
import { sanityClient } from "../../../lib/sanity/client";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  // https://github.com/stripe/stripe-node#configuration
  apiVersion: "2020-03-02",
});

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      // Validate the cart details that were sent from the client.
      const cartItems = req.body;
      //Sanity client performs merchQuery
      const query = '*[_type == "tea"]'
      let sanityData = await sanityClient.fetch(query);

      const newSanityData = [
        {
          _createdAt: '2022-03-29T06:59:28Z',
          _id: 'd5073b0f-4c83-4404-91a3-5316d568a5e6',
          _rev: 'RAE1GuVCIXJFcnPduhUt59',
          _type: 'tea',
          _updatedAt: '2022-03-29T07:02:58Z',
          details: {
            _type: 'document',
            caffeine: 30,
            description: 'Blend of the finest Assam and Ceylon teas with the choicest Italian bergamot with a sprinkling of Iranian orange blossoms make this a very special cup of earl grey. This Great Taste Award winning Earl Grey tea makes for a very satisfying cup with notes of maltiness perfectly blending with the citrus of the bergamot and floral lingering notes of orange blossom.\n' +
              '\n' +
              '"A bright liquor, the tea comes through well (great Assam quality) . The tea is nicely in balance with the citrus notes." Great Taste judges',
            ingredients: [ 'Premium black tea', 'Bergamot oil', 'Orange blossoms' ],
            intructions: 'Steep 1 tea pyramid per cup for 3-4 mins in 95-100° C water. Add milk and sugar to taste if you like or try with a slice of lemon.'
          },
          image: {
            _type: 'image',
            asset: {
              _ref: 'image-61503deca9ede13b78662b48f7d89efdb942e9ab-1575x1521-jpg',
              _type: 'reference'
            }
          },
          price: 69,
          slug: { _type: 'slug', current: 'earl-grey-tea-envelopes' },
          stock: 100,
          tagline: "Premium blend of black tea with classic bergamot flavour in biodegradable 'silky' pyramid teabags\n",
          title: 'Earl Grey - Tea Envelopes'
        }
      ];

      console.log(cartItems);
      console.log(newSanityData);

			// The POST request is then validated against the data from Sanity.
      const line_items = validateCartItems(newSanityData, cartItems);

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
