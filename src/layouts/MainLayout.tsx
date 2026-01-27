import { Link, Outlet } from 'react-router-dom';
import { LayoutDashboard, Calendar, Users, Briefcase } from 'lucide-react';

const MainLayout = () => {
    return (
        <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
            {/* Sidebar */}
            <aside className="w-64 bg-white dark:bg-gray-800 shadow-md">
                <div className="p-6">
                    <h1 className="text-2xl font-bold text-gray-800 dark:text-white">SmartQ</h1>
                </div>
                <nav className="mt-6">
                    <Link
                        to="/dashboard"
                        className="flex items-center px-6 py-3 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
                    >
                        <LayoutDashboard className="w-5 h-5 mr-3" />
                        Dashboard
                    </Link>
                    <Link
                        to="/appointments"
                        className="flex items-center px-6 py-3 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
                    >
                        <Calendar className="w-5 h-5 mr-3" />
                        Appointments
                    </Link>
                    <Link
                        to="/staff"
                        className="flex items-center px-6 py-3 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
                    >
                        <Users className="w-5 h-5 mr-3" />
                        Staff
                    </Link>
                    <Link
                        to="/services"
                        className="flex items-center px-6 py-3 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
                    >
                        <Briefcase className="w-5 h-5 mr-3" />
                        Services
                    </Link>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 dark:bg-gray-900 p-6">
                <Outlet />
            </main>
        </div>
    );
};

export default MainLayout;
