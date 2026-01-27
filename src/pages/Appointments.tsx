import { useState } from 'react';
import { useGetAppointmentsQuery, useCreateAppointmentMutation } from '../store/api/appointmentApi';
import { useGetStaffQuery } from '../store/api/staffApi';
import { useGetServicesQuery } from '../store/api/serviceApi';

const Appointments = () => {
    const { data: appointments, isLoading } = useGetAppointmentsQuery({});
    const { data: staffList } = useGetStaffQuery();
    const { data: services } = useGetServicesQuery();
    const [createAppointment] = useCreateAppointmentMutation();

    const [formData, setFormData] = useState({
        customerName: '',
        serviceId: '',
        staffId: '',
        date: '',
        time: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.date || !formData.time) return alert("Date and Time required");

        const dateTime = new Date(`${formData.date}T${formData.time}`);

        try {
            await createAppointment({
                customerName: formData.customerName,
                serviceId: formData.serviceId,
                staffId: formData.staffId || null,
                date: dateTime.toISOString(),
            }).unwrap();
            alert("Appointment Created!");
        } catch (err: any) {
            alert(err?.data?.message || "Error creating appointment");
        }
    };

    if (isLoading) return <div>Loading...</div>;

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Appointments</h2>

            {/* Create Form */}
            <div className="bg-white p-4 rounded shadow mb-6">
                <h3 className="text-lg font-semibold mb-2">New Appointment</h3>
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                        placeholder="Customer Name"
                        className="border p-2 rounded"
                        value={formData.customerName}
                        onChange={e => setFormData({ ...formData, customerName: e.target.value })}
                        required
                    />
                    <select
                        className="border p-2 rounded"
                        value={formData.serviceId}
                        onChange={e => setFormData({ ...formData, serviceId: e.target.value })}
                        required
                    >
                        <option value="">Select Service</option>
                        {services?.map(s => <option key={s._id} value={s._id}>{s.name} ({s.duration}m)</option>)}
                    </select>
                    <select
                        className="border p-2 rounded"
                        value={formData.staffId}
                        onChange={e => setFormData({ ...formData, staffId: e.target.value })}
                    >
                        <option value="">Select Staff (Optional/Auto)</option>
                        {staffList?.map(s => <option key={s._id} value={s._id}>{s.name} ({s.serviceType})</option>)}
                    </select>
                    <div className="flex gap-2">
                        <input
                            type="date"
                            className="border p-2 rounded w-full"
                            value={formData.date}
                            onChange={e => setFormData({ ...formData, date: e.target.value })}
                            required
                        />
                        <input
                            type="time"
                            className="border p-2 rounded w-full"
                            value={formData.time}
                            onChange={e => setFormData({ ...formData, time: e.target.value })}
                            required
                        />
                    </div>
                    <button type="submit" className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
                        Book Appointment
                    </button>
                </form>
            </div>

            {/* List */}
            <div className="bg-white rounded shadow overflow-hidden">
                <table className="min-w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Staff</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {appointments?.map((appt: any) => (
                            <tr key={appt._id}>
                                <td className="px-6 py-4">{appt.customerName}</td>
                                <td className="px-6 py-4">{new Date(appt.date).toLocaleString()}</td>
                                <td className="px-6 py-4">{appt.staffId?.name || "Unassigned"}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded text-xs text-white ${appt.status === 'Pending' ? 'bg-yellow-500' : 'bg-green-500'}`}>
                                        {appt.status} {appt.status === 'Pending' && `#${appt.queuePosition}`}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Appointments;
