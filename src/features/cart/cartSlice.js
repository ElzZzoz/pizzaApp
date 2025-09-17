import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      const newItem = action.payload;
      const existingItem = state.cart.find(
        (item) => item.pizzaId === newItem.pizzaId,
      );

      if (existingItem) {
        existingItem.quantity++;
        existingItem.totalPrice =
          existingItem.quantity * existingItem.unitPrice;
      } else {
        state.cart.push(newItem);
      }
    },
    deleteItem(state, action) {
      state.cart = state.cart.filter((item) => item.pizzaId !== action.payload);
    },
    increaseItemQuantity(state, action) {
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      if (item) {
        item.quantity++;
        item.totalPrice = item.quantity * item.unitPrice;
      }
    },
    decreaseItemQuantity(state, action) {
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      if (item) {
        item.quantity--;
        item.totalPrice = item.quantity * item.unitPrice;

        if (item.quantity === 0) {
          state.cart = state.cart.filter(
            (cartItem) => cartItem.pizzaId !== action.payload,
          );
        }
      }
    },
    clearCart(state) {
      state.cart = [];
    },
  },
});

export const {
  addItem,
  deleteItem,
  increaseItemQuantity,
  decreaseItemQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;

// Total quantity
export const getTotalCartQuantity = (state) =>
  state.cart.cart.reduce((total, item) => total + item.quantity, 0);

// Total price
export const getTotalCartPrice = (state) =>
  state.cart.cart.reduce((total, item) => total + item.totalPrice, 0);

// Raw cart items
export const getCartItems = (state) => state.cart.cart;

// Get current quantity of a given pizza by id
export const getCurrentQuantity = (id) => (state) =>
  state.cart.cart.find((item) => item.pizzaId === id)?.quantity || 0;
