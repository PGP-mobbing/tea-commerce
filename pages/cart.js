import useStore from "../store";

const Cart = () => {
  const cartItems = useStore((state) => state.cartItems);
  console.log(cartItems);
  return (
    <div>
      <h1>Cart</h1>
      <div className="items-container">
        {cartItems.map((item, i) => {
          return (
            <div key={i} >{item.title} {item.quantity} </div>
          )
        })}
      </div>
    </div>
  );
};

export default Cart;
