import { apiSlice } from "../slice/apiSlice";

export const orderApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllOrders: builder.query({
            query: () => "/api/order/getAllOrderList",
            providesTags: ["Orders"],
        }),

    }),
});

export const {
    useGetAllOrdersQuery
} = orderApi;