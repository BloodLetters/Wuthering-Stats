import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaGoogle, FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';

const Login = () => {
    const [activeTab, setActiveTab] = useState('email'); // 'email' or 'google'
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [showPassword, setShowPassword] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleEmailLogin = (e) => {
        e.preventDefault();
        // Implement email login logic here
        console.log('Email login:', formData);
    };

    const handleGoogleLogin = () => {
        // Implement Google login logic here
        console.log('Google login clicked');
    };

    return (
        <div className="flex flex-col min-h-screen bg-black font-inter">
            <header className="p-4 border-b border-gray-800 bg-black">
                <div className="container mx-auto flex items-center justify-between px-4">
                    <div className="text-lg sm:text-xl md:text-2xl lg:text-2xl xl:text-2xl
                                    font-serif tracking-wider text-white 
                                    transition-all duration-300 ease-in-out
                                    hover:text-amber-100">
                        WUTHERING WAVES
                    </div>
                </div>
            </header>

            <main className="flex-grow container mx-auto p-4 flex justify-center items-center">
                <div className="w-full max-w-md">
                    <div className="bg-gradient-to-br from-gray-900 to-black rounded-lg overflow-hidden shadow-2xl border border-gray-800">
                        {/* Login Tabs */}
                        <div className="flex border-b border-gray-800">
                            <button
                                className={`flex-1 py-4 text-center transition-colors ${
                                    activeTab === 'email' 
                                        ? 'bg-amber-900 text-amber-100' 
                                        : 'text-gray-400 hover:text-amber-100'
                                }`}
                                onClick={() => setActiveTab('email')}
                            >
                                <FaEnvelope className="inline mr-2" />
                                Email Login
                            </button>
                            <button
                                className={`flex-1 py-4 text-center transition-colors ${
                                    activeTab === 'google' 
                                        ? 'bg-amber-900 text-amber-100' 
                                        : 'text-gray-400 hover:text-amber-100'
                                }`}
                                onClick={() => setActiveTab('google')}
                            >
                                <FaGoogle className="inline mr-2" />
                                Google Login
                            </button>
                        </div>

                        <div className="p-6">
                            {activeTab === 'email' ? (
                                <form onSubmit={handleEmailLogin}>
                                    <div className="mb-4">
                                        <div className="relative">
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                className="w-full bg-gray-900 text-gray-100 border border-gray-800 rounded-lg py-3 px-4 pl-11 focus:outline-none focus:border-amber-700 transition-colors"
                                                placeholder="Email Address"
                                                required
                                            />
                                            <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
                                        </div>
                                    </div>
                                    <div className="mb-6">
                                        <div className="relative">
                                            <input
                                                type={showPassword ? "text" : "password"}
                                                name="password"
                                                value={formData.password}
                                                onChange={handleInputChange}
                                                className="w-full bg-gray-900 text-gray-100 border border-gray-800 rounded-lg py-3 px-4 pl-11 pr-11 focus:outline-none focus:border-amber-700 transition-colors"
                                                placeholder="Password"
                                                required
                                            />
                                            <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-amber-100"
                                            >
                                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                                            </button>
                                        </div>
                                    </div>
                                    <button
                                        type="submit"
                                        className="w-full bg-amber-800 hover:bg-amber-700 text-amber-100 py-3 rounded-lg transition-colors font-medium border border-amber-700"
                                    >
                                        Sign In
                                    </button>
                                </form>
                            ) : (
                                <button
                                    onClick={handleGoogleLogin}
                                    className="w-full bg-gray-900 hover:bg-gray-800 text-gray-300 py-3 rounded-lg transition-colors font-medium border border-gray-700 flex items-center justify-center"
                                >
                                    <FaGoogle className="mr-2" />
                                    Continue with Google
                                </button>
                            )}

                            {/* Register Link */}
                            <div className="mt-6 text-center border-t border-gray-800 pt-6">
                                <p className="text-gray-400">
                                    Don't have an account?{' '}
                                    <Link to="/register" className="text-amber-100 hover:text-amber-200 transition-colors">
                                        Register here
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="mt-auto p-4 bg-black text-gray-500 text-sm border-t border-gray-800">
                <div className="container mx-auto flex justify-between">
                    <div>© 2025 Wuthering Stats</div>
                    <div className="flex space-x-4">
                        <a href="#" className="hover:text-amber-100">Terms</a>
                        <a href="#" className="hover:text-amber-100">Privacy</a>
                        <a href="#" className="hover:text-amber-100">Contact</a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Login;