import { Navigate, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import MainLayout from './layouts/MainLayout';
import Dashboard from './pages/Dashboard';
import Appointments from './pages/Appointments';
import StaffPage from './pages/Staff';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import { selectCurrentToken } from './store/authSlice';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const token = useSelector(selectCurrentToken);
    if (!token) {
        return <Navigate to="/login" replace />;
    }
    return <>{children}</>;
};

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Signup />} />

            <Route
                path="/"
                element={
                    <ProtectedRoute>
                        <MainLayout />
                    </ProtectedRoute>
                }
            >
                <Route index element={<Navigate to="/dashboard" replace />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="appointments" element={<Appointments />} />
                <Route path="staff" element={<StaffPage />} />
                <Route path="services" element={<div>Services Page (Coming Soon)</div>} />
            </Route>

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
};

export default AppRoutes;
