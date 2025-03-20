import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaCog, FaQuestionCircle, FaTimes, FaSignOutAlt, FaSearch, FaUserAlt } from 'react-icons/fa';

const Search = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [hasSearched, setHasSearched] = useState(false);
    const [allImagesLoaded, setAllImagesLoaded] = useState(false);
    const isAuthenticated = true;

    // Mock user data - in a real app this would come from API
    const userAccounts = [
        { id: 1, username: 'Roverin', avatar: '..\\Assets\\Avatar\\avatar-1.jpg', level: 65, lastSeen: '2 hours ago' },
        { id: 2, username: 'WavesMaster', avatar: '..\\Assets\\Avatar\\avatar-2.jpg', level: 42, lastSeen: '1 day ago' },
        { id: 3, username: 'SonodeQueen', avatar: '..\\Assets\\Avatar\\avatar-3.jpg', level: 78, lastSeen: 'Just now' },
        { id: 4, username: 'ResonateGuy', avatar: '..\\Assets\\Avatar\\avatar-4.jpg', level: 37, lastSeen: '3 days ago' },
        { id: 5, username: 'WutheringPro', avatar: '..\\Assets\\Avatar\\avatar-5.jpg', level: 90, lastSeen: '1 week ago' }
    ];

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

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
    }, [searchResults]);

    // Handle search submission
    const handleSearch = (e) => {
        e.preventDefault();
        setHasSearched(true);
        
        if (searchTerm.trim() === '') {
            setSearchResults([]);
            return;
        }

        // Filter user accounts based on search term
        const results = userAccounts.filter(user => 
            user.username.toLowerCase().includes(searchTerm.toLowerCase())
        );
        
        setSearchResults(results);
    };

    // Handle key press (Enter) in search input
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch(e);
        }
    };

    return (
        <div className={`flex flex-col min-h-screen bg-gray-900 font-inter transition-opacity duration-300`}>
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

            <div className="container mx-auto p-4 flex items-center space-x-2 text-gray-400">
                <Link to="/" className="hover:text-white transition-colors">🏠</Link>
                <span>›</span>
                <span className="text-white">User Search</span>
            </div>

            <main className="flex-grow container mx-auto p-4">
                {/* Search Hero Section */}
                <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg mb-6">
                    <div className="bg-gray-800 p-8 text-center">
                        <h1 className="text-3xl font-bold text-white mb-4">Find Other Players</h1>
                        <p className="text-lg text-gray-300 mb-6">
                            Search for other Wuthering Waves players by username
                        </p>
                        
                        <div className="max-w-2xl mx-auto">
                            <form onSubmit={handleSearch} className="flex items-center">
                                <div className="relative w-full">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                        <FaSearch className="w-5 h-5 text-gray-400" />
                                    </div>
                                    <input 
                                        type="text" 
                                        className="bg-gray-700 border border-gray-600 text-white text-lg rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full pl-10 p-4" 
                                        placeholder="Enter username..." 
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        onKeyPress={handleKeyPress}
                                        required
                                    />
                                </div>
                                <button 
                                    type="submit" 
                                    className="p-4 ml-2 text-white bg-purple-600 hover:bg-purple-700 font-medium rounded-lg text-sm px-5 py-2.5 transition-colors"
                                >
                                    Search
                                </button>
                            </form>
                        </div>
                    </div>
                </div>

                {/* Search Results Section */}
                {hasSearched && (
                    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
                        <div className="p-4 border-b border-gray-700 flex justify-between items-center">
                            <h3 className="text-white text-lg font-semibold">
                                {searchResults.length > 0 
                                    ? `Search Results (${searchResults.length})` 
                                    : "Search Results"}
                            </h3>
                            {searchResults.length > 0 && (
                                <span className="text-gray-400 text-sm">
                                    Showing {searchResults.length} {searchResults.length === 1 ? 'user' : 'users'} for "{searchTerm}"
                                </span>
                            )}
                        </div>
                        
                        <div className="p-4">
                            {searchResults.length > 0 ? (
                                <div className="space-y-3">
                                    {searchResults.map(user => (
                                        <div key={user.id} className="bg-gray-700 rounded-lg overflow-hidden shadow transition-all hover:bg-gray-600 cursor-pointer">
                                            <div className="flex items-center p-3">
                                                <div className="flex-shrink-0">
                                                    <div className="w-14 h-14 rounded-full bg-purple-800 flex items-center justify-center overflow-hidden">
                                                        {user.avatar ? (
                                                            <img 
                                                                src={user.avatar} 
                                                                alt={user.username} 
                                                                className="w-full h-full object-cover"
                                                            />
                                                        ) : (
                                                            <FaUserAlt className="text-gray-300 text-2xl" />
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="ml-4 flex-grow">
                                                    <div className="flex justify-between">
                                                        <h4 className="text-white font-medium text-lg">{user.username}</h4>
                                                        <span className="text-gray-400 text-sm">Last seen: {user.lastSeen}</span>
                                                    </div>
                                                    <div className="flex items-center mt-1">
                                                        <div className="bg-purple-900 px-2 py-1 rounded text-xs text-white">
                                                            Level {user.level}
                                                        </div>
                                                        <div className="ml-2 text-gray-400 text-sm">
                                                            ID: #{user.id}
                                                        </div>
                                                    </div>
                                                </div>
                                                <button className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded transition-colors ml-2">
                                                    View Profile
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="py-8 text-center">
                                    <div className="flex justify-center mb-4">
                                        <FaSearch className="w-16 h-16 text-gray-600" />
                                    </div>
                                    <h3 className="text-xl font-medium text-white mb-2">Account not found</h3>
                                    <p className="text-gray-400">
                                        No accounts found matching "{searchTerm}".
                                    </p>
                                    <p className="text-gray-400 mt-2">
                                        Try a different username or check your spelling.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Search Tips Section - shown when no search has been performed */}
                {!hasSearched && (
                    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
                        <div className="p-4 border-b border-gray-700">
                            <h3 className="text-white text-lg font-semibold">Search Tips</h3>
                        </div>
                        <div className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-gray-700 p-4 rounded-lg">
                                    <h4 className="text-purple-400 font-medium mb-2">Find Friends</h4>
                                    <p className="text-gray-300">
                                        Search for your friends by their exact username to find their profiles.
                                    </p>
                                </div>
                                <div className="bg-gray-700 p-4 rounded-lg">
                                    <h4 className="text-purple-400 font-medium mb-2">Discover Top Players</h4>
                                    <p className="text-gray-300">
                                        Find the most active and high-level players in the community.
                                    </p>
                                </div>
                                <div className="bg-gray-700 p-4 rounded-lg">
                                    <h4 className="text-purple-400 font-medium mb-2">Complete Username</h4>
                                    <p className="text-gray-300">
                                        For best results, enter the complete username rather than partial matches.
                                    </p>
                                </div>
                                <div className="bg-gray-700 p-4 rounded-lg">
                                    <h4 className="text-purple-400 font-medium mb-2">Connect &amp; Collaborate</h4>
                                    <p className="text-gray-300">
                                        Find players to team up with for challenging game content.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </main>

            <footer className="mt-auto p-4 bg-gray-800 text-gray-400 text-sm">
                <div className="container mx-auto">© 2025 Wuthering Stats</div>
            </footer>

            {/* Sidebar */}
            <div
                className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={toggleSidebar}
            ></div>
            <div
                className={`fixed top-0 right-0 bottom-0 w-64 bg-gray-800 z-50 transform transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'} shadow-xl`}
            >
                <div className="p-4">
                    <button
                        className="text-white mb-6 flex items-center"
                        onClick={toggleSidebar}
                    >
                        <FaTimes className="mr-2" />
                        Close
                    </button>
                    <ul className="space-y-3">
                        <li>
                            <Link to="/profile" className="text-white flex items-center p-2 rounded hover:bg-gray-700 transition-colors">
                                <FaUser className="mr-3" /> My Profile
                            </Link>
                        </li>
                        <li>
                            <Link to="/settings" className="text-white flex items-center p-2 rounded hover:bg-gray-700 transition-colors">
                                <FaCog className="mr-3" /> Settings
                            </Link>
                        </li>
                        <li>
                            <Link to="/help" className="text-white flex items-center p-2 rounded hover:bg-gray-700 transition-colors">
                                <FaQuestionCircle className="mr-3" /> Help Center
                            </Link>
                        </li>
                        <li className="mt-6 pt-4 border-t border-gray-700">
                            <button className="text-red-400 flex items-center w-full p-2 rounded hover:bg-gray-700 transition-colors">
                                <FaSignOutAlt className="mr-3" /> Logout
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Search;