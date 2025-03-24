import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaCog, FaQuestionCircle, FaTimes, FaSignOutAlt, FaSearch, FaUserAlt, FaChevronRight } from 'react-icons/fa';

const Home = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [allImagesLoaded, setAllImagesLoaded] = useState(false);
    const isAuthenticated = false;

    const toggleSidebar = () => {
        if(!isAuthenticated) return;
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
        { name: "Brant", rarity: 5, imageUrl: "Assets\\Portrait\\T_IconRole_Pile_Bulante_UI.png" },
        { name: "Phoebe", rarity: 5, imageUrl: "..\\Assets\\Portrait\\T_IconRole_Pile_Feibi_UI.png" },
        { name: "Charlotta", rarity: 5, imageUrl: "..\\Assets\\Portrait\\T_IconRole_Pile_kelaita_UI.png" },
    ];

    return (
        <div className={`flex flex-col min-h-screen bg-black font-inter ${allImagesLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`}>
            {/* Header with logo */}
            <header className="p-4 border-b border-gray-800 bg-black">
                <div className="container mx-auto flex justify-between items-center px-4">
                    <div className="text-white text-2xl font-serif tracking-wider">WUTHERING WAVES</div>
                    <div className="flex space-x-2">
                        {isAuthenticated ? (
                            <button
                                className="bg-black hover:bg-gray-900 p-2 rounded border border-gray-700 transition-colors flex items-center"
                                onClick={toggleSidebar}
                            >
                                <span className="text-white">⚙️</span>
                                <span className="ml-2 text-white">Settings</span>
                            </button>
                        ) : (
                            <button
                                className="bg-black hover:bg-gray-900 p-2 rounded border border-gray-700 transition-colors flex items-center"
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
                {/* Hero Section - Updated to match image style */}
                <div className="bg-gradient-to-br from-gray-900 to-black rounded-lg overflow-hidden shadow-2xl mb-6 border border-gray-800 relative">
                    <div className="p-8 text-center relative z-10">
                        <div className="absolute inset-0 opacity-10 bg-pattern pointer-events-none"></div>
                        <h1 className="text-4xl font-bold text-amber-100 mb-4 font-serif">Welcome to Wuthering Stats</h1>
                        <p className="text-lg text-gray-300 mb-6">
                            Your ultimate companion for Wuthering Waves character and weapon information
                        </p>
                        <div className="flex justify-center space-x-4 relative z-10">
                            <Link
                                to="/Characters"
                                className="bg-amber-800 hover:bg-amber-700 text-amber-100 px-6 py-3 rounded-md transition-colors font-medium flex items-center border border-amber-700 cursor-pointer"
                            >
                                <FaUserAlt className="mr-2" />
                                Profile
                            </Link>

                            <Link
                                to="/search"
                                className="bg-gray-900 hover:bg-gray-800 text-gray-300 px-6 py-3 rounded-md transition-colors font-medium flex items-center border border-gray-700 cursor-pointer"
                            >
                                <FaSearch className="mr-2" />
                                Search
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Content Sections */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    {/* Known Issues & Compensation Section */}
                    <div className="bg-gradient-to-br from-gray-900 to-black rounded-lg overflow-hidden shadow-2xl border border-gray-800">
                        <div className="p-4 border-b border-gray-800 flex justify-between items-center">
                            <h3 className="text-amber-100 text-lg font-serif tracking-wide">Known Issues & Compensation</h3>
                            {/* <button className="text-amber-100 bg-amber-900 hover:bg-amber-800 px-3 py-1 rounded-md flex items-center text-sm border border-amber-700">
                                Next Slide <FaChevronRight className="ml-1" />
                            </button> */}
                        </div>
                        <div className="p-4">
                            <div className="space-y-3">
                                <div className="bg-gray-900 p-3 rounded-lg border border-gray-800">
                                    <div className="flex justify-between">
                                        <span className="text-amber-100 font-medium">Bug: Character Animation Freeze</span>
                                        <span className="text-gray-400 text-sm">Mar 20, 2025</span>
                                    </div>
                                    <p className="text-gray-300 text-sm mt-1">
                                        Fixed issue with character animations freezing during special moves.
                                    </p>
                                    <div className="mt-2">
                                        <span className="text-xs bg-amber-900 text-amber-100 px-2 py-1 rounded-sm">Compensation: 500 Astrite</span>
                                    </div>
                                </div>
                                <div className="bg-gray-900 p-3 rounded-lg border border-gray-800">
                                    <div className="flex justify-between">
                                        <span className="text-amber-100 font-medium">Server Maintenance Extended</span>
                                        <span className="text-gray-400 text-sm">Mar 18, 2025</span>
                                    </div>
                                    <p className="text-gray-300 text-sm mt-1">
                                        Extended maintenance period by 3 hours for critical updates.
                                    </p>
                                    <div className="mt-2">
                                        <span className="text-xs bg-amber-900 text-amber-100 px-2 py-1 rounded-sm">Compensation: 300 Astrite</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Featured Characters */}
                    <div className="bg-gradient-to-br from-gray-900 to-black rounded-lg overflow-hidden shadow-2xl border border-gray-800">
                        <div className="p-4 border-b border-gray-800 flex justify-between items-center">
                            <h3 className="text-amber-100 text-lg font-serif tracking-wide">Latest Characters</h3>
                            <Link to="/Characters?v=all" className="text-amber-100 bg-amber-900 hover:bg-amber-800 px-3 py-1 rounded-md flex items-center text-sm border border-amber-700">
                                View All <FaChevronRight className="ml-1" />
                            </Link>
                        </div>
                        <div className="p-4">
                            <div className="grid grid-cols-3 gap-4">
                                {featuredCharacters.slice(0, 3).map((character, index) => (
                                    <div key={index} className="bg-gray-900 rounded-lg overflow-hidden border border-gray-800">
                                        <div className="relative">
                                            <img 
                                                src={character.imageUrl} 
                                                alt={character.name} 
                                                className="w-full aspect-square object-cover"
                                            />
                                            <div className="absolute bottom-2 right-2">
                                                <div className={`w-8 h-8 ${character.rarity === 5 ? 'bg-amber-600' : 'bg-purple-600'} rounded-full flex items-center justify-center text-white font-bold text-xs border border-amber-500`}>
                                                    {character.rarity}★
                                                </div>
                                            </div>
                                        </div>
                                        <div className="p-2">
                                            <h4 className="text-amber-100 font-medium">{character.name}</h4>
                                            <p className="text-gray-400 text-sm">{character.element}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            
                {/* Game Updates */}
                <div className="bg-gradient-to-br from-gray-900 to-black rounded-lg overflow-hidden shadow-2xl border border-gray-800">
                    <div className="p-4 border-b border-gray-800 flex justify-between items-center">
                        <h3 className="text-amber-100 text-lg font-serif tracking-wide">Latest Updates</h3>
                        {/* <button className="text-amber-100 bg-amber-900 hover:bg-amber-800 px-3 py-1 rounded-md flex items-center text-sm border border-amber-700">
                            More Updates <FaChevronRight className="ml-1" />
                        </button> */}
                    </div>
                    <div className="p-4">
                        <div className="space-y-3">
                            <div className="bg-gray-900 p-3 rounded-lg border border-gray-800">
                                <div className="flex justify-between">
                                    <span className="text-amber-100 font-medium">Initial Release</span>
                                    <span className="text-gray-400 text-sm">Mar 20, 2025</span>
                                </div>
                                <p className="text-gray-300 text-sm mt-1">
                                    Release development version of wuwastats
                                </p>
                            </div>
                            {/* <div className="bg-gray-900 p-3 rounded-lg border border-gray-800">
                                <div className="flex justify-between">
                                    <span className="text-amber-100 font-medium">Deep Sea Chapter Release</span>
                                    <span className="text-gray-400 text-sm">Mar 10, 2025</span>
                                </div>
                                <p className="text-gray-300 text-sm mt-1">
                                    Explore the depths of the ocean in this new storyline.
                                </p>
                            </div>
                            <div className="bg-gray-900 p-3 rounded-lg border border-gray-800">
                                <div className="flex justify-between">
                                    <span className="text-amber-100 font-medium">Version 2.3 Notes</span>
                                    <span className="text-gray-400 text-sm">Mar 1, 2025</span>
                                </div>
                                <p className="text-gray-300 text-sm mt-1">
                                    Check out the latest balance changes and bug fixes.
                                </p>
                            </div> */}
                        </div>
                    </div>
                </div>
            </main>

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

            {/* Sidebar */}
            <div
                className={`fixed inset-0 bg-black bg-opacity-70 flex justify-end transform transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}
                style={{ zIndex: 1000 }}
            >
                <div className="w-64 bg-gray-900 p-4 border-l border-gray-800">
                    <button
                        className="text-amber-100 mb-6 flex items-center"
                        onClick={toggleSidebar}
                    >
                        <FaTimes className="mr-2" />
                        Close
                    </button>
                    <ul>
                        <li className="mb-3">
                            <Link to="/profile" className="text-gray-300 hover:text-amber-100 flex items-center p-2 transition-colors">
                                <FaUser className="mr-2" /> Profile
                            </Link>
                        </li>
                        <li className="mb-3">
                            <Link to="/settings" className="text-gray-300 hover:text-amber-100 flex items-center p-2 transition-colors">
                                <FaCog className="mr-2" /> Settings
                            </Link>
                        </li>
                        <li className="mb-3">
                            <Link to="/help" className="text-gray-300 hover:text-amber-100 flex items-center p-2 transition-colors">
                                <FaQuestionCircle className="mr-2" /> Help
                            </Link>
                        </li>
                        <li className="mt-6 pt-4 border-t border-gray-700">
                            <button className="text-red-400 flex items-center w-full hover:text-red-300 transition-colors p-2">
                                <FaSignOutAlt className="mr-2" /> Logout
                            </button>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Custom CSS for background patterns */}
            <style jsx>{`
                .bg-pattern {
                    background-image: radial-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px);
                    background-size: 20px 20px;
                }
            `}</style>
        </div>
    );
};

export default Home;