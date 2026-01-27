import { useState } from 'react';
import { useGetStaffQuery, useCreateStaffMutation } from '../store/api/staffApi';

const StaffPage = () => {
    const { data: staff, isLoading } = useGetStaffQuery();
    const [createStaff] = useCreateStaffMutation();
    const [name, setName] = useState('');
    const [role, setRole] = useState('Doctor');

    const handleAdd = async (e: React.FormEvent) => {
        e.preventDefault();
        await createStaff({ name, serviceType: role, dailyCapacity: 5 }).unwrap();
        setName('');
    };

    if (isLoading) return <div>Loading...</div>;

    return (
        <div>
            <h2 className="text-2xl font-bold mb-6">Staff Management</h2>
            <form onSubmit={handleAdd} className="mb-6 bg-white p-4 rounded shadow flex gap-4">
                <input
                    placeholder="Staff Name"
                    className="border p-2 rounded flex-1"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    required
                />
                <select className="border p-2 rounded" value={role} onChange={e => setRole(e.target.value)}>
                    <option value="Doctor">Doctor</option>
                    <option value="Consultant">Consultant</option>
                    <option value="Support">Support</option>
                </select>
                <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Add Staff</button>
            </form>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {staff?.map((s) => (
                    <div key={s._id} className="bg-white p-4 rounded shadow border-l-4 border-blue-500">
                        <h3 className="font-bold text-lg">{s.name}</h3>
                        <p className="text-gray-600">{s.serviceType}</p>
                        <p className="text-sm mt-2">Capacity: {s.dailyCapacity}/day</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StaffPage;
