import { apiSlice } from "../slices/apiSlice";

export const orderApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllOrders: builder.query({
            query: () => "/api/order/getAllOrderList",
            providesTags: ["Order"],
        }),

    }),
});

export const {
    useGetAllOrdersQuery
} = orderApi;