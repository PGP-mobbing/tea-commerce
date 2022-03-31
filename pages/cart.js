import useStore from "../store";
import { useEffect, useState } from "react";

const Cart = () => {
  const cartItems = useStore((state) => state.cartItems);
  const removeFromCart = useStore((state) => state.removeFromCart);
  const addToCart = useStore((state) => state.addToCart);
  const [rerender, setRerender] = useState(false);

  return (
    <div>
      <h1>Cart</h1>
      <div className="items-container">
        {cartItems.map((item, i) => {
          return (
            <div key={i}>
              <div>{item.title}</div>
              <div>
                <button>-</button>
                { item.quantity}
                <button
                onClick={
                  (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    addToCart(item);
                    setRerender(!rerender);
                  }
                }
                >+</button>
              </div>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  removeFromCart(item);
                }}
              >
                Remove from cart
              </button>
              
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Cart;
