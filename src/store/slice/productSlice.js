import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    productList: [],
};

const productSlice = createSlice({
    name: 'Product',
    initialState,
    reducers: {
        setProductDetails: (state, action) => {
            state.productList = action.payload;
        },
        clearProductDetails: (state) => {
            state.productList = [];
        },
    },
});

export const { setProductDetails, clearProductDetails } = productSlice.actions;
export default productSlice.reducer;