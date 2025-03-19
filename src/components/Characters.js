import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaCog, FaQuestionCircle, FaTimes } from 'react-icons/fa';

const WutheringWavesGallery = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const characters = [
        {
            id: 1,
            name: 'Baizhi',
            image: 'https://wuthering.gg/_ipx/q_70&s_800x1104/images/IconRolePile/T_IconRole_Pile_ba' +
                'ilian_UI.png',
            rarity: 4,
            obtained: false,
            sequences: 0
        }
    ];

    const getRarityColor = (rarity) => { 
        switch (rarity) {
            case 5:
                return 'from-yellow-500 to-transparent';
            case 4:
                return 'from-purple-900 to-transparent';
            case 3:
                return 'from-blue-900 to-transparent';
            default:
                return 'from-gray-400 to-gray-600';
        }
    };

    const filteredCharacters = characters.filter(character => character.name.toLowerCase().includes(searchTerm.toLowerCase()));

    // Dummy
    const isAuthenticated = true;

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

            <div className="container mx-auto p-4 flex items-center space-x-2 text-gray-400">
                <a href="#" className="hover:text-white transition-colors">🏠</a>
                <span>›</span>
                {/* <a href="#" className="hover:text-white transition-colors">Wuthering Waves</a>
                <span>›</span> */}
                <span className="text-white">Characters</span>
            </div>

            <div className="container mx-auto p-4 flex flex-col md:flex-row gap-4 items-center">
                <div className="w-full md:w-2/3">
                    <input
                        type="text"
                        placeholder="Search assets..."
                        className="w-full p-2 bg-gray-800 text-white border border-gray-700 rounded focus:border-purple-500 focus:outline-none transition-colors"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex items-center space-x-4 text-gray-300">
                    <button
                        className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded flex items-center transition-colors">
                        <span className="mr-2">👁️</span>
                        Mode: View
                    </button>
                    <button
                        className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded flex items-center transition-colors">
                        <span className="mr-2">↓</span>
                        Newest
                    </button>
                </div>
            </div>

            <div className="container mx-auto p-4">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {filteredCharacters.map((character) => (
                        <div
                            key={character.id}
                            className="rounded overflow-hidden cursor-pointer group transform hover:scale-105 transition-all duration-300">
                            <div className="relative h-full">
                                <div className="aspect-[400/552] bg-gray-800 relative overflow-hidden">
                                    <img
                                        src={character.image}
                                        alt={character.name}
                                        className={`w-full h-full object-cover ${character.obtained
                                        ? ''
                                        : 'filter grayscale'} group-hover:grayscale-0 transition-all duration-300`}
                                    />
                                    {character.obtained && (
                                        <div className="absolute top-2 left-2 text-white p-1" style={{ backgroundColor: 'transparent' }}>
                                            S{character.sequences}
                                        </div>
                                    )}
                                    <div
                                        className={`absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t ${getRarityColor(character.rarity)} to-transparent opacity-0 group-hover:opacity-40 transition-opacity duration-300`}></div>
                                    <div
                                        className="absolute bottom-0 left-0 right-0 py-2 px-2 text-gray-300 text-sm font-medium truncate group-hover:text-white transition-colors duration-300 bg-gradient-to-t from-black to-transparent">
                                        {character.name}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

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
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default WutheringWavesGallery;