import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: JSON.parse(localStorage.getItem("cart")) || [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      console.log("Adding to cart:", action.payload);

      // Create a new array to trigger re-render
      const updatedCart = [...state.cartItems];
      const existingItem = updatedCart.find(item => item.id === action.payload.id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        updatedCart.push({ ...action.payload, quantity: 1 });
      }

      state.cartItems = updatedCart; // Update Redux state
      localStorage.setItem("cart", JSON.stringify(updatedCart)); // Persist cart
    },
    removeFromCart: (state, action) => {
      const updatedCart = state.cartItems.filter(item => item.id !== action.payload);
      state.cartItems = updatedCart;
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    },
    clearCart: (state) => {
      state.cartItems = [];
      localStorage.removeItem("cart");
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
