import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaCog, FaQuestionCircle, FaTimes } from 'react-icons/fa';

const Home = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const isAuthenticated = false;

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-900 font-inter">
            <header className="p-4 border-b border-gray-800">
                <div className="container mx-auto flex justify-center items-center px-4">
                    <div className="text-white text-2xl">Wuthering Stats</div>
                    <div className="flex space-x-2 ml-auto">
                        {isAuthenticated ? (
                            <button
                                className="bg-gray-800 hover:bg-gray-700 p-2 rounded transition-colors flex items-center"
                                onClick={toggleSidebar}
                            >
                                <span className="text-white">⚙️</span>
                                <span className="ml-2 text-white">Settings</span>
                            </button>
                        ) : (
                            <button
                                className="bg-gray-800 hover:bg-gray-700 p-2 rounded transition-colors flex items-center"
                                onClick={toggleSidebar}
                            >
                                <img
                                    src="https://www.gstatic.com/marketing-cms/assets/images/d5/dc/cfe9ce8b4425b410b49b7f2dd3f3/g.webp=s48-fcrop64=1,00000000ffffffff-rw"
                                    alt="Google Logo"
                                    className="w-5 h-5"
                                />
                                <span className="ml-2 text-white">Login</span>
                            </button>
                        )}
                    </div>
                </div>
            </header>

            <main className="flex-grow flex items-start justify-center container mx-auto p-4">
                <div className="text-center text-white mt-16">
                    <h1 className="text-4xl mb-4">Welcome to Wuthering Stats</h1>
                    <p className="text-lg mb-8">
                        Your ultimate source for Wuthering Waves character statistics and information.
                    </p>
                    <div className="flex justify-center space-x-4">
                        <Link
                            to="/Characters"
                            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded transition-colors"
                        >
                            Character
                        </Link>
                        <Link
                            to="/search"
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors"
                        >
                            Search
                        </Link>
                    </div>
                </div>
            </main>

            <footer className="mt-auto p-4 bg-gray-800 text-gray-400 text-sm">
                <div className="container mx-auto">© 2025 Wuthering Stats</div>
            </footer>

            <div
                className={`fixed inset-0 flex justify-end transform transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}
            >
                <div className="w-64 bg-gray-800 p-4">
                    <button
                        className="text-white mb-4 flex items-center"
                        onClick={toggleSidebar}
                    >
                        <FaTimes className="mr-2" />
                        Close
                    </button>
                    <ul>
                        <li className="mb-2">
                            <Link to="/profile" className="text-white flex items-center">
                                <FaUser className="mr-2" /> Profile
                            </Link>
                        </li>
                        <li className="mb-2">
                            <Link to="/settings" className="text-white flex items-center">
                                <FaCog className="mr-2" /> Settings
                            </Link>
                        </li>
                        <li className="mb-2">
                            <Link to="/help" className="text-white flex items-center">
                                <FaQuestionCircle className="mr-2" /> Help
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Home;