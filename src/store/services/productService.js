import { apiSlice } from "../slice/apiSlice";

export const productApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllProducts: builder.query({
            query: () => "/api/product/getAllProduct",
            providesTags: ["Products"],
        }),

        updateProduct: builder.mutation({
            query: ({ body }) => ({
                url: `/api/product/updateProduct`,
                method: "PUT",
                body,
            }),
            invalidatesTags: ["Products"],
        }),
    }),
});

export const {
    useGetAllProductsQuery,
    useUpdateProductMutation
} = productApi;
