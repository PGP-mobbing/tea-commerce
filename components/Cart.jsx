import { CartProvider } from "use-shopping-cart";
import getStripe from "../lib/stripe/getStripe";

const Cart = ({ children }) => {
  return (
    <CartProvider mode="checkout-session" stripe={getStripe()} currency={"nok"}>
      {children}
    </CartProvider>
  );
}

export default Cart;
