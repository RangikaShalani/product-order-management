import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "./slice/uiSlice";
import { apiSlice } from "./slice/apiSlice";

export const store = configureStore({
    reducer: {
        ui: uiReducer,
        [apiSlice.reducerPath]: apiSlice.reducer,  // ✅ Add RTK Query reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware), // ✅ Add RTK Query middleware
});
