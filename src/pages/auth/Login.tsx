import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useLoginMutation } from '../../store/api/authApi';
import { setCredentials } from '../../store/authSlice';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');

    const [login, { isLoading }] = useLoginMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        try {
            const result = await login({ email, password }).unwrap();
            dispatch(setCredentials({ user: result.user, token: result.token }));
            navigate('/dashboard');
        } catch (err: any) {
            setError(err.data?.message || 'Login failed. Please try again.');
        }
    };

    const handleDemoLogin = async () => {
        setError('');
        try {
            const result = await login({ email: 'abcd@gmail.com', password: '123456' }).unwrap();
            dispatch(setCredentials({ user: result.user, token: result.token }));
            navigate('/dashboard');
        } catch (err: any) {
            setError(err.data?.message || 'Demo login failed.');
        }
    };


    return (
        <div className="bg-background-light dark:bg-background-dark text-[#1b140e] dark:text-[#fcfaf8] min-h-screen flex items-center justify-center p-6">
            {/* Background blobs */}
            <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden opacity-50 dark:opacity-20">
                <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-[5%] right-[0%] w-[30%] h-[30%] bg-primary/5 rounded-full blur-[100px]"></div>
            </div>

            {/* Card */}
            <div className="w-full max-w-[440px] bg-white dark:bg-[#1a130d] rounded-card shadow-xl shadow-[#cf6d1715] border border-[#f3ede7] dark:border-[#3d2d22] p-8 md:p-10">
                {/* Header */}
                <div className="flex flex-col items-center mb-8">
                    <div className="bg-primary size-12 rounded-xl flex items-center justify-center text-white mb-4">
                        <span className="material-symbols-outlined text-3xl">
                            event_seat
                        </span>
                    </div>
                    <h1 className="text-2xl font-bold tracking-tight font-display">
                        Smart Queue
                    </h1>
                    <p className="text-[#97704e] dark:text-[#b08e70] text-sm mt-1">
                        Sign in to your provider portal
                    </p>
                </div>

                {error && (
                    <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-5 text-center">
                        {error}
                    </div>
                )}

                {/* Form */}
                <form className="space-y-5" onSubmit={handleSubmit}>
                    {/* Email */}
                    <div>
                        <label className="block text-sm font-semibold mb-1.5">
                            Email Address
                        </label>
                        <div className="relative">
                            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#97704e] text-xl">
                                mail
                            </span>
                            <input
                                type="email"
                                placeholder="alex@company.com"
                                className="w-full bg-[#fcfaf8] dark:bg-[#2a1f16] border border-[#f3ede7] dark:border-[#3d2d22] rounded-lg pl-10 pr-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    {/* Password */}
                    <div>
                        <div className="flex justify-between items-center mb-1.5">
                            <label className="block text-sm font-semibold">Password</label>
                            <a href="#" className="text-xs font-medium text-primary hover:underline">
                                Forgot password?
                            </a>
                        </div>
                        <div className="relative">
                            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#97704e] text-xl">
                                lock
                            </span>
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="••••••••"
                                className="w-full bg-[#fcfaf8] dark:bg-[#2a1f16] border border-[#f3ede7] dark:border-[#3d2d22] rounded-lg pl-10 pr-12 py-2.5 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <button
                                type="button"
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#97704e] hover:text-[#1b140e]"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                <span className="material-symbols-outlined text-xl">
                                    {showPassword ? 'visibility_off' : 'visibility'}
                                </span>
                            </button>
                        </div>
                    </div>

                    {/* Remember me */}
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            className="h-4 w-4 text-primary focus:ring-primary border-[#f3ede7] rounded"
                        />
                        <label className="ml-2 text-sm text-[#97704e] dark:text-[#b08e70]">
                            Remember me for 30 days
                        </label>
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-primary hover:bg-[#b8661a] text-white font-bold py-3 rounded-lg transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2 mt-2 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        <span>{isLoading ? 'Logging in...' : 'Login'}</span>
                        <span className="material-symbols-outlined text-xl">login</span>
                    </button>
                </form>

                {/* Divider */}
                <div className="relative my-8">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-[#f3ede7] dark:border-[#3d2d22]"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-3 bg-white dark:bg-[#1a130d] text-[#97704e] font-medium">
                            Quick Access
                        </span>
                    </div>
                </div>

                {/* Demo Login */}
                <button
                    onClick={handleDemoLogin}
                    disabled={isLoading}
                    className="w-full bg-white dark:bg-[#3d2d22] border-2 border-primary/20 hover:border-primary hover:bg-[#fcfaf8] dark:hover:bg-[#4d3d32] text-primary font-bold py-3 rounded-lg transition-all flex items-center justify-center gap-2 mb-8 disabled:opacity-70"
                >
                    <span className="material-symbols-outlined text-xl">
                        play_circle
                    </span>
                    <span>Demo User Login</span>
                </button>

                {/* Footer */}
                <div className="text-center pt-2">
                    <p className="text-sm text-[#97704e] dark:text-[#b08e70]">
                        Don't have an account?
                        <Link to="/register" className="text-primary font-bold hover:underline ml-1">
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;

