import { baseApi } from './baseApi';

export interface Appointment {
  _id: string;
  customerName: string;
  serviceId: any;
  staffId?: any;
  date: string;
  status: 'Scheduled' | 'Completed' | 'Cancelled' | 'No-Show' | 'Pending';
  queuePosition: number;
}

export const appointmentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAppointments: builder.query<Appointment[], { date?: string; staffId?: string }>({
      query: (params) => ({
        url: '/appointments',
        params,
      }),
      transformResponse: (response: { data: Appointment[] }) => response.data,
      providesTags: ['Appointments'],
    }),
    createAppointment: builder.mutation({
      query: (data) => ({
        url: '/appointments',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Appointments', 'Dashboard', 'Staff'],
    }),
  }),
});

export const { useGetAppointmentsQuery, useCreateAppointmentMutation } = appointmentApi;
