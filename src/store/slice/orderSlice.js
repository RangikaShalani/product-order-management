import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    orderList: [],
};

const orderSlice = createSlice({
    name: 'Orders',
    initialState,
    reducers: {
        setOrderDetails: (state, action) => {
            state.orderList = action.payload;
        },
        clearOrderDetails: (state) => {
            state.orderList = [];
        },
    },
});

export const { setOrderDetails, clearOrderDetails } = orderSlice.actions;
export default orderSlice.reducer;