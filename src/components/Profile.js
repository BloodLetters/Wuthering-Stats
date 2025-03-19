import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaCog, FaQuestionCircle, FaTimes, FaEdit, FaSignOutAlt } from 'react-icons/fa';

const Profile = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [allImagesLoaded, setAllImagesLoaded] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    // Dummy user data
    const userData = {
        username: "WaveRider",
        joinDate: "Jan 15, 2025",
        avatarUrl: "/api/placeholder/150/150",
        stats: {
            charactersOwned: 24,
            totalSequences: 42,
            achievements: 18,
            lastActive: "Today"
        },
        recentActivity: [
            { date: "Mar 18, 2025", action: "Obtained Baizhi" },
            { date: "Mar 15, 2025", action: "Completed Deep Sea Chapter" },
            { date: "Mar 10, 2025", action: "Reached Level 60" }
        ]
    };

    // Dummy for authentication
    const isAuthenticated = true;

    // Handle image loading
    useEffect(() => {
        const images = document.querySelectorAll('img');
        let loadedCount = 0;

        const handleImageLoad = () => {
            loadedCount += 1;
            if (loadedCount === images.length) {
                setAllImagesLoaded(true);
            }
        };

        images.forEach(image => {
            if (image.complete) {
                handleImageLoad();
            } else {
                image.addEventListener('load', handleImageLoad);
                image.addEventListener('error', handleImageLoad);
            }
        });
    }, []);

    return (
        <div className={`flex flex-col min-h-screen bg-gray-900 font-inter ${allImagesLoaded ? 'opacity-100' : 'opacity-0'}`}>
            <header className="p-4 border-b border-gray-800">
                <div className="container mx-auto flex justify-center items-center px-4">
                    <div className="text-white text-2xl">Wuthering Stats</div>
                    <div className="flex space-x-2 ml-auto">
                        <button
                            className="bg-gray-800 hover:bg-gray-700 p-2 rounded transition-colors flex items-center"
                            onClick={toggleSidebar}
                        >
                            <span className="text-white">⚙️</span>
                            <span className="ml-2 text-white">Settings</span>
                        </button>
                    </div>
                </div>
            </header>

            <div className="container mx-auto p-4 flex items-center space-x-2 text-gray-400">
                <a href="#" className="hover:text-white transition-colors">🏠</a>
                <span>›</span>
                <span className="text-white">Profile</span>
            </div>

            {isAuthenticated ? (
                <div className="container mx-auto p-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Profile Card */}
                        <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
                            <div className="bg-purple-900 p-4 text-center">
                                <img
                                    src={userData.avatarUrl}
                                    alt="Profile Avatar"
                                    className="w-24 h-24 rounded-full mx-auto border-4 border-gray-700"
                                />
                                <h2 className="text-white text-2xl font-bold mt-2">{userData.username}</h2>
                                <p className="text-gray-300">Member since {userData.joinDate}</p>
                            </div>
                            <div className="p-4">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-white text-lg">Account Info</h3>
                                    <button className="text-gray-300 hover:text-white transition-colors">
                                        <FaEdit />
                                    </button>
                                </div>
                                <div className="space-y-2 text-gray-300">
                                    <div className="flex justify-between">
                                        <span>Server:</span>
                                        <span className="text-purple-400">Asia</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Account Type:</span>
                                        <span className="text-purple-400">Premium</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Last Active:</span>
                                        <span className="text-green-400">{userData.stats.lastActive}</span>
                                    </div>
                                </div>
                                <div className="mt-6">
                                    <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded flex items-center justify-center transition-colors">
                                        <FaEdit className="mr-2" />
                                        Edit Profile
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Stats Card */}
                        <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
                            <div className="p-4 border-b border-gray-700">
                                <h3 className="text-white text-lg font-semibold">Game Statistics</h3>
                            </div>
                            <div className="p-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-gray-700 p-4 rounded-lg text-center">
                                        <div className="text-3xl text-purple-400 font-bold">{userData.stats.charactersOwned}</div>
                                        <div className="text-gray-300 text-sm">Characters</div>
                                    </div>
                                    <div className="bg-gray-700 p-4 rounded-lg text-center">
                                        <div className="text-3xl text-purple-400 font-bold">{userData.stats.totalSequences}</div>
                                        <div className="text-gray-300 text-sm">Sequences</div>
                                    </div>
                                    <div className="bg-gray-700 p-4 rounded-lg text-center">
                                        <div className="text-3xl text-purple-400 font-bold">{userData.stats.achievements}</div>
                                        <div className="text-gray-300 text-sm">Achievements</div>
                                    </div>
                                    <div className="bg-gray-700 p-4 rounded-lg text-center">
                                        <div className="text-3xl text-purple-400 font-bold">82%</div>
                                        <div className="text-gray-300 text-sm">Completion</div>
                                    </div>
                                </div>
                                <div className="mt-4 pt-4 border-t border-gray-700">
                                    <h4 className="text-white mb-2">Progress</h4>
                                    <div className="w-full bg-gray-700 rounded-full h-2.5">
                                        <div className="bg-purple-600 h-2.5 rounded-full" style={{ width: '82%' }}></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Recent Activity */}
                        <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
                            <div className="p-4 border-b border-gray-700">
                                <h3 className="text-white text-lg font-semibold">Recent Activity</h3>
                            </div>
                            <div className="p-4">
                                <ul className="space-y-3">
                                    {userData.recentActivity.map((activity, index) => (
                                        <li key={index} className="bg-gray-700 p-3 rounded-lg">
                                            <div className="flex justify-between">
                                                <span className="text-white">{activity.action}</span>
                                                <span className="text-gray-400 text-sm">{activity.date}</span>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                                <div className="mt-4 text-center">
                                    <button className="text-purple-400 hover:text-purple-300 transition-colors">
                                        View All Activity
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Collection Summary */}
                        <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg md:col-span-3">
                            <div className="p-4 border-b border-gray-700">
                                <h3 className="text-white text-lg font-semibold">Collection Summary</h3>
                            </div>
                            <div className="p-4">
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    <div className="bg-gray-700 p-3 rounded-lg">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <div className="text-gray-400 text-sm">5★ Characters</div>
                                                <div className="text-white font-semibold text-lg">8/16</div>
                                            </div>
                                            <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center text-white font-bold">
                                                5★
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-gray-700 p-3 rounded-lg">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <div className="text-gray-400 text-sm">4★ Characters</div>
                                                <div className="text-white font-semibold text-lg">12/14</div>
                                            </div>
                                            <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                                                4★
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-gray-700 p-3 rounded-lg">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <div className="text-gray-400 text-sm">3★ Characters</div>
                                                <div className="text-white font-semibold text-lg">4/4</div>
                                            </div>
                                            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                                                3★
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-gray-700 p-3 rounded-lg">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <div className="text-gray-400 text-sm">Completion</div>
                                                <div className="text-white font-semibold text-lg">24/34</div>
                                            </div>
                                            <div className="text-green-400 font-bold">70.5%</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <Link to="/characters" className="block w-full bg-gray-700 hover:bg-gray-600 text-white py-2 rounded text-center transition-colors">
                                        View Character Gallery
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="container mx-auto p-4 flex flex-col items-center">
                    <div className="bg-gray-800 text-white p-6 rounded-lg shadow-md w-full md:w-2/3">
                        <h2 className="text-xl font-bold mb-4">Penting</h2>
                        <p className="mb-4">Anda perlu login untuk melihat profil.</p>
                        <div className="flex flex-wrap gap-2">
                            <button
                                className="bg-purple-600 hover:bg-purple-700 p-2 rounded transition-colors flex items-center"
                            >
                                <span className="text-white">🔐</span>
                                <span className="ml-2 text-white">Login</span>
                            </button>
                            <button
                                className="bg-gray-700 hover:bg-gray-600 p-2 rounded transition-colors flex items-center"
                            >
                                <span className="text-white">🔍</span>
                                <span className="ml-2 text-white">Search</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <footer className="mt-auto p-4 bg-gray-800 text-gray-400 text-sm">
                <div className="container mx-auto">
                    © 2025 Wuthering Stats
                </div>
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
                        <li className="mt-6 pt-4 border-t border-gray-700">
                            <button className="text-red-400 flex items-center w-full hover:text-red-300 transition-colors">
                                <FaSignOutAlt className="mr-2" /> Logout
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Profile;