import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
    FaGoogle, 
    FaEnvelope, 
    FaLock, 
    FaEye, 
    FaEyeSlash, 
    FaUser, 
    FaCheckCircle, 
    FaTimesCircle 
} from 'react-icons/fa';

const Register = () => {
    const [activeTab, setActiveTab] = useState('email'); // 'email' or 'google'
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [showPassword, setShowPassword] = useState({
        password: false,
        confirmPassword: false
    });
    const [passwordStrength, setPasswordStrength] = useState({
        isValid: false,
        hasLength: false,
        hasNumber: false,
        hasSpecial: false,
        hasUppercase: false
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        if (name === 'password') {
            checkPasswordStrength(value);
        }
    };

    const checkPasswordStrength = (password) => {
        setPasswordStrength({
            isValid: password.length >= 8 && 
                    /[0-9]/.test(password) && 
                    /[!@#$%^&*]/.test(password) && 
                    /[A-Z]/.test(password),
            hasLength: password.length >= 8,
            hasNumber: /[0-9]/.test(password),
            hasSpecial: /[!@#$%^&*]/.test(password),
            hasUppercase: /[A-Z]/.test(password)
        });
    };

    const handleEmailRegister = (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords don't match!");
            return;
        }
        if (!passwordStrength.isValid) {
            alert("Please meet all password requirements!");
            return;
        }
        // Implement registration logic here
        console.log('Email registration:', formData);
    };

    const handleGoogleRegister = () => {
        // Implement Google registration logic here
        console.log('Google registration clicked');
    };

    const PasswordRequirement = ({ met, text }) => (
        <div className={`flex items-center space-x-2 text-sm ${met ? 'text-green-400' : 'text-gray-400'}`}>
            {met ? <FaCheckCircle /> : <FaTimesCircle />}
            <span>{text}</span>
        </div>
    );

    return (
        <div className="flex flex-col min-h-screen bg-black font-inter">
            {/* Header */}
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

            {/* Main Content */}
            <main className="flex-grow container mx-auto p-4 flex justify-center items-center">
                <div className="w-full max-w-md">
                    <div className="bg-gradient-to-br from-gray-900 to-black rounded-lg overflow-hidden shadow-2xl border border-gray-800">
                        {/* Register Tabs */}
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
                                Email Register
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
                                <form onSubmit={handleEmailRegister}>
                                    {/* Username Input */}
                                    <div className="mb-4">
                                        <div className="relative">
                                            <input
                                                type="text"
                                                name="username"
                                                value={formData.username}
                                                onChange={handleInputChange}
                                                className="w-full bg-gray-900 text-gray-100 border border-gray-800 rounded-lg py-3 px-4 pl-11 focus:outline-none focus:border-amber-700 transition-colors"
                                                placeholder="Username"
                                                required
                                            />
                                            <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
                                        </div>
                                    </div>

                                    {/* Email Input */}
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

                                    {/* Password Input */}
                                    <div className="mb-4">
                                        <div className="relative">
                                            <input
                                                type={showPassword.password ? "text" : "password"}
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
                                                onClick={() => setShowPassword(prev => ({...prev, password: !prev.password}))}
                                                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-amber-100"
                                            >
                                                {showPassword.password ? <FaEyeSlash /> : <FaEye />}
                                            </button>
                                        </div>
                                    </div>

                                    {/* Confirm Password Input */}
                                    <div className="mb-4">
                                        <div className="relative">
                                            <input
                                                type={showPassword.confirmPassword ? "text" : "password"}
                                                name="confirmPassword"
                                                value={formData.confirmPassword}
                                                onChange={handleInputChange}
                                                className="w-full bg-gray-900 text-gray-100 border border-gray-800 rounded-lg py-3 px-4 pl-11 pr-11 focus:outline-none focus:border-amber-700 transition-colors"
                                                placeholder="Confirm Password"
                                                required
                                            />
                                            <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(prev => ({...prev, confirmPassword: !prev.confirmPassword}))}
                                                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-amber-100"
                                            >
                                                {showPassword.confirmPassword ? <FaEyeSlash /> : <FaEye />}
                                            </button>
                                        </div>
                                    </div>

                                    {/* Password Requirements */}
                                    <div className="mb-6 p-4 bg-gray-900 rounded-lg border border-gray-800">
                                        <h4 className="text-amber-100 mb-2">Password Requirements:</h4>
                                        <div className="space-y-2">
                                            <PasswordRequirement met={passwordStrength.hasLength} text="At least 8 characters" />
                                            {/* <PasswordRequirement met={passwordStrength.hasNumber} text="Contains a number" />
                                            <PasswordRequirement met={passwordStrength.hasSpecial} text="Contains a special character (!@#$%^&*)" /> */}
                                            <PasswordRequirement met={passwordStrength.hasUppercase} text="Contains an uppercase letter" />
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full bg-amber-800 hover:bg-amber-700 text-amber-100 py-3 rounded-lg transition-colors font-medium border border-amber-700"
                                    >
                                        Create Account
                                    </button>
                                </form>
                            ) : (
                                <button
                                    onClick={handleGoogleRegister}
                                    className="w-full bg-gray-900 hover:bg-gray-800 text-gray-300 py-3 rounded-lg transition-colors font-medium border border-gray-700 flex items-center justify-center"
                                >
                                    <FaGoogle className="mr-2" />
                                    Register with Google
                                </button>
                            )}

                            {/* Login Link */}
                            <div className="mt-6 text-center border-t border-gray-800 pt-6">
                                <p className="text-gray-400">
                                    Already have an account?{' '}
                                    <Link to="/login" className="text-amber-100 hover:text-amber-200 transition-colors">
                                        Sign in here
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

export default Register;