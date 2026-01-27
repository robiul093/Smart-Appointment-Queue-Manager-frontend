import { useGetStatsQuery } from '../store/api/dashboardApi';
import { Clock, CircleCheck, CircleAlert } from 'lucide-react';

const Dashboard = () => {
    const { data, isLoading } = useGetStatsQuery();

    if (isLoading) return <div>Loading stats...</div>;

    return (
        <div>
            <h2 className="text-3xl font-semibold text-gray-800 dark:text-white mb-6">Dashboard</h2>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex items-center">
                    <div className="p-3 rounded-full bg-blue-100 text-blue-500 mr-4">
                        <Clock className="w-8 h-8" />
                    </div>
                    <div>
                        <p className="text-gray-500 dark:text-gray-400">Total Today</p>
                        <p className="text-2xl font-bold text-gray-800 dark:text-white">{data?.totalAppointments || 0}</p>
                    </div>
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex items-center">
                    <div className="p-3 rounded-full bg-yellow-100 text-yellow-500 mr-4">
                        <CircleAlert className="w-8 h-8" />
                    </div>
                    <div>
                        <p className="text-gray-500 dark:text-gray-400">Waiting Queue</p>
                        <p className="text-2xl font-bold text-gray-800 dark:text-white">{data?.pendingCount || 0}</p>
                    </div>
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex items-center">
                    <div className="p-3 rounded-full bg-green-100 text-green-500 mr-4">
                        <CircleCheck className="w-8 h-8" />
                    </div>
                    <div>
                        <p className="text-gray-500 dark:text-gray-400">Completed</p>
                        <p className="text-2xl font-bold text-gray-800 dark:text-white">{data?.completedCount || 0}</p>
                    </div>
                </div>
            </div>

            {/* Staff Load */}
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Staff Load</h3>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                <table className="min-w-full">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Staff Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Load</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                        {data?.staffLoad?.map((staff: any) => (
                            <tr key={staff._id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{staff.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{staff.appointmentCount} / {staff.dailyCapacity}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${staff.appointmentCount >= staff.dailyCapacity ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                                        {staff.appointmentCount >= staff.dailyCapacity ? 'Full' : 'Available'}
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

export default Dashboard;
