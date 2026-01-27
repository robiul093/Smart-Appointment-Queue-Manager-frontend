import { baseApi } from './baseApi';

export interface Staff {
  _id: string;
  name: string;
  serviceType: string;
  dailyCapacity: number;
  availabilityStatus: 'Available' | 'On Leave';
}

export const staffApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getStaff: builder.query<Staff[], void>({
      query: () => '/staff',
      transformResponse: (response: { data: Staff[] }) => response.data,
      providesTags: ['Staff'],
    }),
    createStaff: builder.mutation({
      query: (data) => ({
        url: '/staff',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Staff'],
    }),
  }),
});

export const { useGetStaffQuery, useCreateStaffMutation } = staffApi;
