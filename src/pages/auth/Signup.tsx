
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useRegisterMutation } from '../../store/api/authApi';

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const [register, { isLoading }] = useRegisterMutation();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            await register({ name, email, password }).unwrap();
            setSuccess(true);
            setTimeout(() => {
                navigate('/login');
            }, 2000);
        } catch (err: any) {
            setError(err.data?.message || 'Registration failed. Please try again.');
        }

    };

    return (
        <div className="bg-background-light dark:bg-background-dark text-[#1b140e] dark:text-[#fcfaf8] min-h-screen flex items-center justify-center p-6">
            {/* Background blobs (same as login) */}
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
                            confirmation_number
                        </span>
                    </div>
                    <h1 className="text-2xl font-bold tracking-tight font-display">
                        Create Account
                    </h1>
                    <p className="text-[#97704e] dark:text-[#b08e70] text-sm mt-1 text-center">
                        Join Smart Queue and start managing appointments
                    </p>
                </div>

                {error && (
                    <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-5 text-center">
                        {error}
                    </div>
                )}

                {success && (
                    <div className="bg-green-50 text-green-600 p-3 rounded-lg text-sm mb-5 text-center">
                        Account created successfully! Redirecting to login...
                    </div>
                )}

                {/* Form */}
                <form className="space-y-5" onSubmit={handleSubmit}>
                    {/* Full Name */}
                    <div>
                        <label className="block text-sm font-semibold mb-1.5">
                            Full Name
                        </label>
                        <input
                            type="text"
                            placeholder="John Doe"
                            className="w-full bg-[#fcfaf8] dark:bg-[#2a1f16] border border-[#f3ede7] dark:border-[#3d2d22] rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-semibold mb-1.5">
                            Email Address
                        </label>
                        <input
                            type="email"
                            placeholder="name@company.com"
                            className="w-full bg-[#fcfaf8] dark:bg-[#2a1f16] border border-[#f3ede7] dark:border-[#3d2d22] rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm font-semibold mb-1.5">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Min. 8 characters"
                                className="w-full bg-[#fcfaf8] dark:bg-[#2a1f16] border border-[#f3ede7] dark:border-[#3d2d22] rounded-lg px-4 pr-12 py-2.5 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <span
                                className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-[#97704e] cursor-pointer hover:text-[#1b140e]"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? 'visibility_off' : 'visibility'}
                            </span>
                        </div>
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <label className="block text-sm font-semibold mb-1.5">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            placeholder="Repeat your password"
                            className="w-full bg-[#fcfaf8] dark:bg-[#2a1f16] border border-[#f3ede7] dark:border-[#3d2d22] rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>

                    {/* Terms */}
                    <p className="text-xs text-[#97704e] dark:text-[#b08e70] text-center">
                        By clicking “Create Account”, you agree to our{" "}
                        <a href="#" className="text-primary font-semibold hover:underline">
                            Terms of Service
                        </a>
                    </p>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-primary hover:bg-[#b8661a] text-white font-bold py-3 rounded-lg transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2 mt-2 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        <span>{isLoading ? 'Creating Account...' : 'Create Account'}</span>
                    </button>
                </form>

                {/* Footer */}
                <div className="text-center pt-6">
                    <p className="text-sm text-[#97704e] dark:text-[#b08e70]">
                        Already have an account?
                        <Link to="/login" className="text-primary font-bold hover:underline ml-1">
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Signup;

