import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


import { baseQueryWithReauth } from '../services/rootService';

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: baseQueryWithReauth,
    extractRehydrationInfo(action, { reducerPath }) {
        return action.payload?.[reducerPath];
    },
    tagTypes: [
        'User', 'Permissions', 'Products', 'Orders'
    ],
    endpoints: () => ({})
});
