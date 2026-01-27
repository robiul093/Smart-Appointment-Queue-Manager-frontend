import { baseApi } from './baseApi';

export const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getStats: builder.query<any, void>({
      query: () => '/dashboard/stats',
      transformResponse: (response: { data: any }) => response.data,
      providesTags: ['Dashboard'],
    }),
  }),
});

export const { useGetStatsQuery } = dashboardApi;
