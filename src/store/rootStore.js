import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "./slice/uiSlice";
import productReducer from "./slice/productSlice";
import orderReducer from "./slice/orderSlice";
import { apiSlice } from "./slice/apiSlice";

export const store = configureStore({
    reducer: {
        ui: uiReducer,
        product: productReducer,
        order: orderReducer,
        [apiSlice.reducerPath]: apiSlice.reducer,  // ✅ Add RTK Query reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware), // ✅ Add RTK Query middleware
});
