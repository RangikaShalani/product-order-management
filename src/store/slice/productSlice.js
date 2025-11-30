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
        updateProductInStore: (state, action) => {
            const updatedProduct = action.payload;

            state.productList = state.productList.map((product) =>
                product.productId === updatedProduct.productId
                    ? { ...product, ...updatedProduct }
                    : product
            );
        },
    },
});

export const { setProductDetails, clearProductDetails, updateProductInStore } = productSlice.actions;
export default productSlice.reducer;