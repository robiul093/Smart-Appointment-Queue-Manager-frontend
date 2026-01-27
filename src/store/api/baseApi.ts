import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://smart-appointment-queue-manager.onrender.com/api' }),  //http://localhost:5000/api
  tagTypes: ['Auth', 'Staff', 'Services', 'Appointments', 'Dashboard'],
  endpoints: () => ({}),
});
