import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaCog, FaQuestionCircle, FaTimes, FaSignOutAlt, FaSearch, FaUserAlt } from 'react-icons/fa';

const Home = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [allImagesLoaded, setAllImagesLoaded] = useState(false);
    const isAuthenticated = false;

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    // Handle image loading like in Profile.js
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

    // Featured content for homepage
    const featuredCharacters = [
        { name: "Baizhi", rarity: 5, element: "Water", imageUrl: "/api/placeholder/120/160" },
        { name: "Jianxin", rarity: 5, element: "Fire", imageUrl: "/api/placeholder/120/160" },
        { name: "Lingyang", rarity: 4, element: "Wind", imageUrl: "/api/placeholder/120/160" }
    ];

    return (
        <div className={`flex flex-col min-h-screen bg-gray-900 font-inter ${allImagesLoaded ? 'opacity-100' : 'opacity-0'}`}>
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

            <main className="flex-grow container mx-auto p-4">
                {/* Hero Section */}
                <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg mb-6">
                    <div className="bg-gray-800 p-8 text-center">
                        <h1 className="text-4xl font-bold text-white mb-4">Welcome to Wuthering Stats</h1>
                        <p className="text-lg text-gray-300 mb-6">
                            Your ultimate resource for Wuthering Waves character and weapon statistics
                        </p>
                        <div className="flex justify-center space-x-4">
                            <Link
                                to="/Characters"
                                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg transition-colors font-medium"
                            >
                                Browse Characters
                            </Link>
                            <Link
                                to="/search"
                                className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg transition-colors font-medium flex items-center"
                            >
                                <FaSearch className="mr-2" />
                                Search
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Featured Content */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    {/* Quick Stats */}
                    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
                        <div className="p-4 border-b border-gray-700">
                            <h3 className="text-white text-lg font-semibold">Quick Stats</h3>
                        </div>
                        <div className="p-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-gray-700 p-4 rounded-lg text-center">
                                    <div className="text-3xl text-purple-400 font-bold">34</div>
                                    <div className="text-gray-300 text-sm">Characters</div>
                                </div>
                                <div className="bg-gray-700 p-4 rounded-lg text-center">
                                    <div className="text-3xl text-purple-400 font-bold">68</div>
                                    <div className="text-gray-300 text-sm">Weapons</div>
                                </div>
                                <div className="bg-gray-700 p-4 rounded-lg text-center">
                                    <div className="text-3xl text-purple-400 font-bold">120</div>
                                    <div className="text-gray-300 text-sm">Sonodes</div>
                                </div>
                                <div className="bg-gray-700 p-4 rounded-lg text-center">
                                    <div className="text-3xl text-purple-400 font-bold">5K+</div>
                                    <div className="text-gray-300 text-sm">Users</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Featured Characters */}
                    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg md:col-span-2">
                        <div className="p-4 border-b border-gray-700">
                            <h3 className="text-white text-lg font-semibold">Featured Characters</h3>
                        </div>
                        <div className="p-4">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {featuredCharacters.map((character, index) => (
                                    <div key={index} className="bg-gray-700 rounded-lg overflow-hidden">
                                        <img 
                                            src={character.imageUrl} 
                                            alt={character.name} 
                                            className="w-full h-40 object-cover object-top"
                                        />
                                        <div className="p-3">
                                            <div className="flex items-center justify-between">
                                                <h4 className="text-white font-medium">{character.name}</h4>
                                                <div className={`w-8 h-8 ${character.rarity === 5 ? 'bg-yellow-500' : 'bg-purple-600'} rounded-full flex items-center justify-center text-white font-bold text-xs`}>
                                                    {character.rarity}★
                                                </div>
                                            </div>
                                            <p className="text-gray-400 text-sm">{character.element}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-4">
                                <Link to="/characters" className="block w-full bg-gray-600 hover:bg-gray-500 text-white py-2 rounded text-center transition-colors">
                                    View All Characters
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Game Updates */}
                <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
                    <div className="p-4 border-b border-gray-700">
                        <h3 className="text-white text-lg font-semibold">Latest Updates</h3>
                    </div>
                    <div className="p-4">
                        <div className="space-y-3">
                            <div className="bg-gray-700 p-3 rounded-lg">
                                <div className="flex justify-between">
                                    <span className="text-white font-medium">New Character: Baizhi</span>
                                    <span className="text-gray-400 text-sm">Mar 15, 2025</span>
                                </div>
                                <p className="text-gray-300 text-sm mt-1">
                                    The legendary water resonator has joined the roster!
                                </p>
                            </div>
                            <div className="bg-gray-700 p-3 rounded-lg">
                                <div className="flex justify-between">
                                    <span className="text-white font-medium">Deep Sea Chapter Release</span>
                                    <span className="text-gray-400 text-sm">Mar 10, 2025</span>
                                </div>
                                <p className="text-gray-300 text-sm mt-1">
                                    Explore the depths of the ocean in this new storyline.
                                </p>
                            </div>
                            <div className="bg-gray-700 p-3 rounded-lg">
                                <div className="flex justify-between">
                                    <span className="text-white font-medium">Version 2.3 Notes</span>
                                    <span className="text-gray-400 text-sm">Mar 1, 2025</span>
                                </div>
                                <p className="text-gray-300 text-sm mt-1">
                                    Check out the latest balance changes and bug fixes.
                                </p>
                            </div>
                        </div>
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

export default Home;