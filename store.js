import create from "zustand";
import { devtools, persist } from "zustand/middleware";

const store = (set)=>({
  cartItems :[],
  addToCart : (item) => {
    set(state => {
      if (state.cartItems.length === 0) {
        state.cartItems.push({...item, quantity: 1});
      } else {
        const itemIndex = state.cartItems.findIndex(i => i._id === item._id);
        if (itemIndex === -1) {
          state.cartItems.push({...item, quantity: 1});
        } else {
          state.cartItems[itemIndex].quantity += 1;
        }
      }
    })
  },
  removeFromCart : (item)=>{
    set(state => ({
      cartItems : state.cartItems.filter(cartItem => cartItem.id !== item.id)
    }))
  }
})
const useStore = create(devtools(persist(store), {name:"cart"}));
export default useStore;