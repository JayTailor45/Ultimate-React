import { createSlice } from '@reduxjs/toolkit';
import {getAddress} from '../../services/apiGeocoding';

const initialState = {
  cart: [],
  // cart: [
  //   {
  //     pizzaId: 123,
  //     name: 'Mergratia',
  //     quantity: 2,
  //     unitPrice: 12,
  //     totalPrice: 32,
  //   },
  // ],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      state.cart.push(action.payload);
    },
    deleteItem(state, action) {
      state.cart = state.cart.filter(item => item.pizzaId != action.payload);
    },
    increaseItemQuantity(state, action) {
      const item = state.cart.find(item => item.pizzaId === action.payload);
      if(item) {
        item.quantity += 1;
        item.totalPrice = item.quantity * item.unitPrice;
      }
    },
    decreaseItemQuantity(state, action) {
      const item = state.cart.find(item => item.pizzaId === action.payload);
      if(item) {
        item.quantity -= 1;
        item.totalPrice = item.quantity * item.unitPrice;

        if(item.quantity === 0) {
          cartSlice.caseReducers.deleteItem(state, action);
        }
      }
    },
    clearCart(state) {
      state.cart = [];
    },
  }
});

export const {increaseItemQuantity, decreaseItemQuantity, addItem, deleteItem, clearCart} = cartSlice.actions;
export default cartSlice.reducer;

export const getTotalCartItem = state => state.cart.cart.reduce((acc, curr) => acc + curr.quantity, 0);
export const getTotalPrize = state => state.cart.cart.reduce((acc, curr) => acc + curr.totalPrice, 0);

export const getCart = state => state?.cart?.cart || [];

export const getCurrentQty = id => state => state.cart.cart.find(item => item.pizzaId === id)?.quantity ?? 0;
