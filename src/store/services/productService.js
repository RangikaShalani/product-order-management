import { apiSlice } from "../slice/apiSlice";

export const productApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllProducts: builder.query({
            query: () => "/api/product/getAllProduct",
            providesTags: ["Products"],
        }),

    }),
});

export const {
    useGetAllProductsQuery
} = productApi;
