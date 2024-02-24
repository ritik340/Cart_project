import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const url = 'http://course-api.com/react-useReducer-cart-project';
export const getCartItems = createAsyncThunk(
    'cart/getCartItems', async () => {
        try {
            const resp = await fetch(url);
            if(!resp.ok)
               throw new Error('error')
            const respInJson = resp.json();
            console.log(respInJson, 'response from fetch');
            return respInJson;
        } catch (error) {
           console.log(error);
        }
        //if we don't return promise from async function then it will bind the data into promise and return
    }
)
console.log(getCartItems, 'getCartItems');
const initialState = {
    cartItems: [],
    amount: 4,
    total: 0,
    isLoading: true,
}
const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        clearCart: (state) => {
            state.cartItems = [];
        },
        removeCart: (state, action) => {
            const id = action.payload;
            state.cartItems = state.cartItems.filter((cartItem) => cartItem.id !== id);
        },
        increase: (state, { payload }) => {
            let cartItem = state.cartItems.find((cartItem) => cartItem.id === payload);
            cartItem.amount++;
        },
        decrease: (state, { payload }) => {
            let cartItem = state.cartItems.find((cartItem) => cartItem.id === payload);
            cartItem.amount--;
        },
        calculateTotals: (state) => {
            let amount = 0;
            let total = 0;
            state.cartItems.forEach((item) => {
                amount += item.amount;
                total += item.amount * item.price;
            });
            state.amount = amount;
            state.total = total;
        },
    },
    extraReducers: {
        [getCartItems.pending]: (state) => {
            state.isLoading = true;
        },
        [getCartItems.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.cartItems = action.payload
        },
        [getCartItems.rejected]: (state) => {
            state.isLoading = true;
        }
    }
}
)
console.log(cartSlice);
export const { clearCart, removeCart, increase, decrease, calculateTotals } = cartSlice.actions;//this is action creater
export default cartSlice.reducer;
