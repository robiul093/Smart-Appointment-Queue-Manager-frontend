import { baseApi } from './baseApi';

export interface Service {
  _id: string;
  name: string;
  duration: number;
  requiredStaffType: string;
}

export const serviceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getServices: builder.query<Service[], void>({
      query: () => '/services',
      transformResponse: (response: { data: Service[] }) => response.data,
      providesTags: ['Services'],
    }),
    createService: builder.mutation({
      query: (data) => ({
        url: '/services',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Services'],
    }),
  }),
});

export const { useGetServicesQuery, useCreateServiceMutation } = serviceApi;
