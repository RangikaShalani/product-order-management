// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// import { HYDRATE } from 'next-redux-wrapper';

// import { baseQueryWithReauth } from '../services/rootService';

// export const apiSlice = createApi({
//   reducerPath: "api",
//   baseQuery: baseQueryWithReauth,
//   extractRehydrationInfo(action, { reducerPath }) {
//     if (action.type === HYDRATE) {
//       return action.payload[reducerPath]
//     }
//   },
//   tagTypes: [
//     'user', 'roles', 'priv', 'brPriv', 'customers' , 'accounts', 'comments'
//   ],
//   endpoints: builder => ({})
// });
