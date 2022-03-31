import useStore from "../store";
import { useEffect, useState } from "react";

const Cart = () => {
  const cartItems = useStore((state) => state.cartItems);
  const removeFromCart = useStore((state) => state.removeFromCart);
  const addToCart = useStore((state) => state.addToCart);
  const subtractFromQuantity = useStore((state) => state.subtractFromQuantity);
  const [rehydrate, setRehydrate] = useState(false);

  return (
    <div>
      <h1>Cart</h1>
      <div className="items-container">
        {cartItems.map((item, i) => {
          return (
            <div key={i}>
              <div>{item.title}</div>
              <div>
                <button
                onClick={
                  (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    subtractFromQuantity(item);
                    setRehydrate(!rehydrate);
                  }
                }
                >-</button>
                { item.quantity}
                <button
                onClick={
                  (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    addToCart(item);
                    setRehydrate(!rehydrate);
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
                Remove
              </button>
              
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Cart;
