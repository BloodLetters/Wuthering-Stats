import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaCog, FaQuestionCircle, FaTimes, FaSignOutAlt, FaSearch, FaUserAlt } from 'react-icons/fa';

const Search = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [hasSearched, setHasSearched] = useState(false);
    const [allImagesLoaded, setAllImagesLoaded] = useState(false);
    const isAuthenticated = false;

    // Mock user data - in a real app this would come from API
    const userAccounts = [
        { id: 1, username: 'Roverin', avatar: '..\\Assets\\Avatar\\avatar-1.jpg', level: 65, lastSeen: '2 hours ago' },
        { id: 2, username: 'WavesMaster', avatar: '..\\Assets\\Avatar\\avatar-2.jpg', level: 42, lastSeen: '1 day ago' },
        { id: 3, username: 'SonodeQueen', avatar: '..\\Assets\\Avatar\\avatar-3.jpg', level: 78, lastSeen: 'Just now' },
        { id: 4, username: 'ResonateGuy', avatar: '..\\Assets\\Avatar\\avatar-4.jpg', level: 37, lastSeen: '3 days ago' },
        { id: 5, username: 'WutheringPro', avatar: '..\\Assets\\Avatar\\avatar-5.jpg', level: 90, lastSeen: '1 week ago' }
    ];

    const toggleSidebar = () => {
        if(!isAuthenticated) return;
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
        <div className="flex flex-col min-h-screen bg-black font-inter transition-opacity duration-300">
            {/* Background overlay with subtle pattern */}
            <div className="fixed inset-0 bg-[url('https://via.placeholder.com/100')] opacity-5 bg-repeat"></div>
            
            <header className="p-4 border-b border-gray-800 bg-gradient-to-b from-black via-black/80 to-transparent">
                <div className="container mx-auto flex items-center justify-between px-4">
                    <div className="text-lg sm:text-xl md:text-2xl lg:text-2xl xl:text-2xl
                                    font-serif tracking-wider text-white 
                                    transition-all duration-300 ease-in-out
                                    hover:text-amber-100">
                        WUTHERING WAVES
                    </div>
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

            <div className="relative z-10 container mx-auto p-4 flex items-center space-x-2 text-gray-400">
                <Link to="/" className="hover:text-amber-300 transition-colors">🏠</Link>
                <span>›</span>
                <span className="text-amber-200">User Search</span>
            </div>

            <main className="relative z-10 flex-grow container mx-auto p-4">
                {/* Title Section with styling similar to the Known Issue & Compensation image */}
                {/* <div className="mb-8 text-center">
                    <h1 className="text-4xl font-serif tracking-wide text-amber-100 mb-2">Find Resonators</h1>
                    <div className="flex justify-center items-center">
                        <div className="h-px w-16 bg-amber-700"></div>
                        <p className="mx-4 text-amber-300 text-sm font-serif">Wuthering Waves</p>
                        <div className="h-px w-16 bg-amber-700"></div>
                    </div>
                </div> */}
                
                {/* Search Hero Section */}
                <div className="bg-gray-900 bg-opacity-80 rounded-lg overflow-hidden shadow-2xl mb-6 border border-gray-800">
                    <div className="p-8 text-center">
                        <h2 className="text-2xl font-serif text-amber-100 mb-4">Search Resonators</h2>
                        <p className="text-lg text-gray-300 mb-6">
                            Find other Wuthering Waves players by username
                        </p>
                        
                        <div className="max-w-2xl mx-auto">
                            <form onSubmit={handleSearch} className="flex items-center">
                                <div className="relative w-full flex items-center">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                        <FaSearch className="w-5 h-5 text-amber-700" />
                                    </div>
                                    <input 
                                        type="text" 
                                        className="bg-gray-800 border border-amber-900/40 text-amber-100 text-lg rounded-md focus:ring-amber-700 focus:border-amber-600 block w-full pl-10 p-4 h-[50px]" 
                                        placeholder="Enter username or player id..." 
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        onKeyPress={handleKeyPress}
                                        required
                                    />
                                </div>
                                <button 
                                    type="submit" 
                                    className="ml-2 text-gray-300 bg-amber-800 hover:bg-amber-700 font-medium rounded-md text-sm px-5 py-2.5 h-[50px] flex items-center justify-center transition-all duration-300 border border-amber-600/30"
                                >
                                    Search
                                </button>
                            </form>
                        </div>
                    </div>
                </div>

                {/* Search Results Section */}
                {hasSearched && (
                    <div className="bg-gray-900 bg-opacity-80 rounded-lg overflow-hidden shadow-2xl border border-gray-800">
                        <div className="p-4 border-b border-gray-700 flex justify-between items-center">
                            <h3 className="text-amber-100 text-lg font-serif">
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
                                        <div key={user.id} className="bg-gray-800 bg-opacity-70 rounded-md overflow-hidden shadow transition-all hover:bg-gray-700 cursor-pointer border border-gray-700">
                                            <div className="flex items-center p-3">
                                                <div className="flex-shrink-0">
                                                    <div className="w-14 h-14 rounded-md bg-gray-900 flex items-center justify-center overflow-hidden border border-amber-900/40">
                                                        {user.avatar ? (
                                                            <img 
                                                                src={user.avatar} 
                                                                alt={user.username} 
                                                                className="w-full h-full object-cover"
                                                            />
                                                        ) : (
                                                            <FaUserAlt className="text-amber-200 text-2xl" />
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="ml-4 flex-grow">
                                                    <div className="flex justify-between">
                                                        <h4 className="text-amber-100 font-medium text-lg">{user.username}</h4>
                                                        <span className="text-gray-400 text-sm">Last seen: {user.lastSeen}</span>
                                                    </div>
                                                    <div className="flex items-center mt-1">
                                                        <div className="bg-amber-900/50 px-2 py-1 rounded-sm text-xs text-amber-100 border border-amber-800/50">
                                                            Level {user.level}
                                                        </div>
                                                        <div className="ml-2 text-gray-400 text-sm">
                                                            ID: #{user.id}
                                                        </div>
                                                    </div>
                                                </div>
                                                <button className="bg-amber-800 hover:bg-amber-700 text-gray-300 px-3 py-1 rounded-md transition-all duration-300 ml-2 border border-amber-600/30">
                                                    View Profile
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="py-8 text-center">
                                    <div className="flex justify-center mb-4">
                                        <FaSearch className="w-16 h-16 text-amber-900/50" />
                                    </div>
                                    <h3 className="text-xl font-serif text-amber-100 mb-2">Account not found</h3>
                                    <p className="text-gray-400">
                                        No accounts found matching "{searchTerm}".
                                    </p>
                                    <p className="text-gray-400 mt-2">
                                        Try a different username or check your spelling.
                                    </p>
                                </div>
                            )}
                        </div>
                        
                        {/* Next Slide button similar to the image */}
                        {searchResults.length > 0 && (
                            <div className="flex justify-end p-4 border-t border-gray-700">
                                <button className="bg-amber-800 hover:bg-amber-700 text-gray-300 px-4 py-2 rounded-md transition-all duration-300 flex items-center space-x-2 border border-amber-600/30">
                                    <span>Next Slide</span>
                                    <span>›</span>
                                </button>
                            </div>
                        )}
                    </div>
                )}

                {/* Search Tips Section - shown when no search has been performed */}
                {!hasSearched && (
                    <div className="bg-gray-900 bg-opacity-80 rounded-lg overflow-hidden shadow-2xl border border-gray-800">
                        <div className="p-4 border-b border-gray-700">
                            <h3 className="text-amber-100 text-lg font-serif">Search Tips</h3>
                        </div>
                        <div className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-gray-800 bg-opacity-70 p-4 rounded-md border border-gray-700">
                                    <h4 className="text-amber-500 font-medium mb-2">Find Friends</h4>
                                    <p className="text-gray-300">
                                        Search for your friends by their exact username to find their profiles.
                                    </p>
                                </div>
                                <div className="bg-gray-800 bg-opacity-70 p-4 rounded-md border border-gray-700">
                                    <h4 className="text-amber-500 font-medium mb-2">Discover Top Resonators</h4>
                                    <p className="text-gray-300">
                                        Find the most active and high-level players in the community.
                                    </p>
                                </div>
                                <div className="bg-gray-800 bg-opacity-70 p-4 rounded-md border border-gray-700">
                                    <h4 className="text-amber-500 font-medium mb-2">Complete Username</h4>
                                    <p className="text-gray-300">
                                        For best results, enter the complete username rather than partial matches.
                                    </p>
                                </div>
                                <div className="bg-gray-800 bg-opacity-70 p-4 rounded-md border border-gray-700">
                                    <h4 className="text-amber-500 font-medium mb-2">Connect &amp; Collaborate</h4>
                                    <p className="text-gray-300">
                                        Find players to team up with for challenging game content.
                                    </p>
                                </div>
                            </div>
                        </div>
                        
                        {/* Next Slide button similar to the image */}
                        <div className="flex justify-end p-4 border-t border-gray-700">
                            <button className="bg-amber-800 hover:bg-amber-700 text-gray-300 px-4 py-2 rounded-md transition-all duration-300 flex items-center space-x-2 border border-amber-600/30">
                                <span>Next Slide</span>
                                <span>›</span>
                            </button>
                        </div>
                    </div>
                )}
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
                className={`fixed inset-0 bg-black bg-opacity-70 z-40 transition-opacity duration-300 backdrop-blur-sm ${isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={toggleSidebar}
            ></div>
            <div
                className={`fixed top-0 right-0 bottom-0 w-64 bg-gray-900 z-50 transform transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'} shadow-2xl border-l border-amber-900/30`}
            >
                <div className="p-4">
                    <button
                        className="text-amber-100 mb-6 flex items-center hover:text-amber-300 transition-colors"
                        onClick={toggleSidebar}
                    >
                        <FaTimes className="mr-2" />
                        Close
                    </button>
                    <ul className="space-y-3">
                        <li>
                            <Link to="/profile" className="text-gray-300 flex items-center p-2 rounded-md hover:bg-gray-800 transition-colors border border-transparent hover:border-amber-900/30">
                                <FaUser className="mr-3 text-amber-600" /> My Profile
                            </Link>
                        </li>
                        <li>
                            <Link to="/settings" className="text-gray-300 flex items-center p-2 rounded-md hover:bg-gray-800 transition-colors border border-transparent hover:border-amber-900/30">
                                <FaCog className="mr-3 text-amber-600" /> Settings
                            </Link>
                        </li>
                        <li>
                            <Link to="/help" className="text-gray-300 flex items-center p-2 rounded-md hover:bg-gray-800 transition-colors border border-transparent hover:border-amber-900/30">
                                <FaQuestionCircle className="mr-3 text-amber-600" /> Help Center
                            </Link>
                        </li>
                        <li className="mt-6 pt-4 border-t border-gray-700">
                            <button className="text-red-400 flex items-center w-full p-2 rounded-md hover:bg-gray-800 transition-colors border border-transparent hover:border-amber-900/30">
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