import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getPlayerData } from '../Storage/API';
import { formatter, getAllResonance } from '../utils/Format';
import { FaUser, FaCog, FaQuestionCircle, FaTimes, FaSignOutAlt, FaSearch, FaSortAmountDown, FaDownload, FaHome, FaSortAmountUp, FaShareAlt, FaCopy, FaLink, FaUserCircle } from 'react-icons/fa';

const Characters = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isShareCardOpen, setIsShareCardOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [sortType, setSortType] = useState('newest');
    const [characters, setCharacters] = useState([]);
    const [copiedLink, setCopiedLink] = useState('');

    const queryParams = new URLSearchParams(window.location.search);
    const isViewing = queryParams.has("v");
    const navigate = useNavigate();
    const isAuthenticated = false;

    const importPage = () => {
        navigate("/import");
    };

    const sortedMethod = () => {
        let newSortType;
        switch (sortType) {
            case 'newest':
                newSortType = 'rarity';
                break;
            case 'rarity':
                newSortType = 'sequence';
                break;
            case 'sequence':
            default:
                newSortType = 'newest';
                break;
        }
        setSortType(newSortType);
    };

    const toggleSidebar = () => {
        if(!isAuthenticated) return;
        setIsSidebarOpen(!isSidebarOpen);
    };

    const toggleShareCard = () => {
        setIsShareCardOpen(!isShareCardOpen);
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text)
            .then(() => {
                setCopiedLink(text);
                setTimeout(() => setCopiedLink(''), 2000);
            })
            .catch(err => {
                console.error('Failed to copy: ', err);
            });
    };

    const getSortedCharacters = () => {
        let sortedChars = [...characters];

        const filteredCharacters = sortedChars.filter(character => 
            character.name?.toLowerCase().includes(searchTerm.toLowerCase())
        );

        switch (sortType) {
            case 'newest':
                return filteredCharacters.sort((a, b) => 
                    new Date(b.time || b.id) - new Date(a.time || a.id)
                );
            
            case 'rarity':
                return filteredCharacters.sort((a, b) => b.rarity - a.rarity);
            
            case 'sequence':
                return filteredCharacters.sort((a, b) => b.sequences - a.sequences);
            
            default:
                return filteredCharacters;
        }
    };

    // const filteredCharacters = characters.filter(character => character.name?.toLowerCase().includes(searchTerm.toLowerCase()));

    const getSequence = (t) => {
        if(t > 6) {
            return 6;
        } else {
            return t;
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {

                if(isViewing && queryParams.get('v') === "all") {
                    const resData = await getAllResonance();
                    setCharacters(resData);
                } else {
                    let rawData;
                    if (isViewing) {
                        rawData = await getPlayerData(queryParams.get('v'));
                    } else if (localStorage.getItem("Acc_id")) {
                        rawData = await getPlayerData(localStorage.getItem("Acc_id"));
                    }

                    if (rawData !== false) {
                        const resData = formatter(rawData.data.duplicates);
                        setCharacters(resData);
                        // console.log(resData)
                    }
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (characters.length === 0) {
            return;
        }

        const images = document.querySelectorAll('img');
        let loadedCount = 0;

        const handleImageLoad = () => {
            loadedCount += 1;
            if (loadedCount === images.length) {
                setIsLoading(false);
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

        return () => {
            images.forEach(image => {
                image.removeEventListener('load', handleImageLoad);
                image.removeEventListener('error', handleImageLoad);
            });
        };
    }, []);

    const getRarityColor = (rarity) => { 
        switch (rarity) {
            case 5:
                return 'from-amber-500 to-transparent';
            case 4:
                return 'from-purple-600 to-transparent';
            case 3:
                return 'from-blue-600 to-transparent';
            default:
                return 'from-gray-400 to-gray-600';
        }
    };

    const LoadingSpinner = () => (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-80">
            <div className="flex flex-col items-center">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-amber-500 mb-4"></div>
                <p className="text-amber-100 text-lg font-serif">Loading characters...</p>
            </div>
        </div>
    );

    const getShareLinks = () => {
        const baseUrl = window.location.origin + window.location.pathname;
        const userId = localStorage.getItem("Acc_id") || "";
        const playerName = localStorage.getItem("PlayerName") || "Player";

        return {
            byName: `${baseUrl}?v=${userId}&name=${encodeURIComponent(playerName)}`,
            byUuid: `${baseUrl}?v=${userId}`
        };
    };

    const shareLinks = getShareLinks();

    return (
        <div className="flex flex-col min-h-screen bg-black font-inter">
            {isLoading && <LoadingSpinner />}
            
            {/* Header with logo */}
            <header className="p-4 border-b border-gray-800 bg-black">
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

            {/* Breadcrumb navigation */}
            <div className="container mx-auto p-4 flex items-center space-x-2 text-gray-400">
                <Link to="/" className="hover:text-amber-100 transition-colors">
                    <FaHome />
                </Link>
                <span>›</span>
                <span className="text-amber-100 font-serif">Characters</span>
            </div>

            {/* Search and filter controls */}
            <div className="container mx-auto p-4 flex flex-col md:flex-row gap-4 items-center">
                <div className="w-full md:w-2/3">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search characters..."
                            className="w-full p-3 bg-gray-900 text-white border border-gray-700 rounded-md focus:border-amber-500 focus:outline-none transition-colors"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <FaSearch className="absolute right-3 top-3.5 text-gray-500" />
                    </div>
                </div>
                <div className="flex items-center space-x-4 text-gray-300">
                    <button 
                        onClick={sortedMethod}
                        className="bg-gray-900 hover:bg-gray-800 px-4 py-2 rounded-md flex items-center transition-colors border border-gray-700"
                    >
                        {sortType === 'newest' ? <FaSortAmountDown className="mr-2" /> : <FaSortAmountUp className="mr-2" />}
                        {sortType === 'newest' && 'Newest'}
                        {sortType === 'rarity' && 'Rarity'}
                        {sortType === 'sequence' && 'Sequence'}
                    </button>
                    {!isViewing &&
                        <button 
                            onClick={toggleShareCard}
                            className="bg-gray-900 hover:bg-gray-800 px-4 py-2 rounded-md flex items-center transition-colors border border-gray-700">
                            <FaShareAlt className='mr-2'/>
                            Share
                        </button>
                    }
                    {!isViewing && 
                        <button
                            onClick={importPage}
                            className="bg-amber-900 hover:bg-amber-800 px-4 py-2 rounded-md flex items-center transition-colors text-amber-100 border border-amber-700">
                            <FaDownload className="mr-2" />
                            Import
                        </button>
                    }
                </div>
            </div>

            {/* Share Card */}
            {isShareCardOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
                    <div className="bg-gray-900 rounded-lg w-full max-w-lg p-6 border border-gray-800 shadow-lg">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl text-amber-100 font-serif">Share Your Collection</h3>
                            <button 
                                onClick={toggleShareCard}
                                className="text-gray-400 hover:text-amber-100 transition-colors"
                            >
                                <FaTimes />
                            </button>
                        </div>
                        
                        {isAuthenticated ? (
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <div className="flex items-center space-x-2 text-gray-300 mb-1">
                                        <FaUserCircle />
                                        <span>Share by Name</span>
                                    </div>
                                    <div className="flex">
                                        <input
                                            type="text"
                                            readOnly
                                            value={shareLinks.byName}
                                            className="flex-grow p-3 bg-gray-800 text-white border border-gray-700 rounded-l-md focus:outline-none"
                                        />
                                        <button 
                                            onClick={() => copyToClipboard(shareLinks.byName)}
                                            className={`px-4 flex items-center justify-center rounded-r-md transition-colors ${copiedLink === shareLinks.byName ? 'bg-green-700 text-green-100' : 'bg-gray-700 hover:bg-gray-600 text-gray-200'}`}
                                        >
                                            {copiedLink === shareLinks.byName ? 'Copied!' : <FaCopy />}
                                        </button>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <div className="flex items-center space-x-2 text-gray-300 mb-1">
                                        <FaLink />
                                        <span>Share by UUID</span>
                                    </div>
                                    <div className="flex">
                                        <input
                                            type="text"
                                            readOnly
                                            value={shareLinks.byUuid}
                                            className="flex-grow p-3 bg-gray-800 text-white border border-gray-700 rounded-l-md focus:outline-none"
                                        />
                                        <button 
                                            onClick={() => copyToClipboard(shareLinks.byUuid)}
                                            className={`px-4 flex items-center justify-center rounded-r-md transition-colors ${copiedLink === shareLinks.byUuid ? 'bg-green-700 text-green-100' : 'bg-gray-700 hover:bg-gray-600 text-gray-200'}`}
                                        >
                                            {copiedLink === shareLinks.byUuid ? 'Copied!' : <FaCopy />}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-lg border border-gray-700 text-center">
                                    <div className="text-4xl mb-4">🔒</div>
                                    <h4 className="text-amber-100 font-serif text-lg mb-3">Login Required</h4>
                                    <p className="text-gray-300 mb-6">Please login to share your character collection by name with others.</p>
                                    
                                    <button
                                        className="bg-black hover:bg-gray-900 p-3 rounded border border-gray-700 transition-colors flex items-center mx-auto"
                                    >
                                        <img
                                            src="https://www.gstatic.com/marketing-cms/assets/images/d5/dc/cfe9ce8b4425b410b49b7f2dd3f3/g.webp=s48-fcrop64=1,00000000ffffffff-rw"
                                            alt="Google Logo"
                                            className="w-5 h-5 mr-3"
                                        />
                                        <span className="text-white">Login with Google</span>
                                    </button>
                                </div>
                                {/* Share by UUID */}
                                <div className="space-y-2">
                                    <div className="flex items-center space-x-2 text-gray-300 mb-1">
                                        <FaLink />
                                        <span>Share by UUID</span>
                                    </div>
                                    <div className="flex">
                                        <input
                                            type="text"
                                            readOnly
                                            value={shareLinks.byUuid}
                                            className="flex-grow p-3 bg-gray-800 text-white border border-gray-700 rounded-l-md focus:outline-none"
                                        />
                                        <button 
                                            onClick={() => copyToClipboard(shareLinks.byUuid)}
                                            className={`px-4 flex items-center justify-center rounded-r-md transition-colors ${copiedLink === shareLinks.byUuid ? 'bg-green-700 text-green-100' : 'bg-gray-700 hover:bg-gray-600 text-gray-200'}`}
                                        >
                                            {copiedLink === shareLinks.byUuid ? 'Copied!' : <FaCopy />}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                                                        
                            <div className="text-sm text-gray-400 italic mt-4">
                                        Share these links with friends to let them see your character collection.
                                    </div>
                            <div className="mt-6 pt-4 border-t border-gray-700 flex justify-end">
                            <button
                                onClick={toggleShareCard}
                                className="bg-amber-800 hover:bg-amber-700 text-amber-100 py-2 px-6 rounded-md transition-colors duration-300 border border-amber-700"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Main content area */}
            <div className="container mx-auto p-4">
                {characters.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {getSortedCharacters().map((character) => (
                            <div
                                key={character.id}
                                className="rounded-lg overflow-hidden cursor-pointer group transform hover:scale-105 transition-all duration-300 border border-gray-800">
                                <div className="relative h-full">
                                    <div className="aspect-[400/552] bg-gray-900 relative overflow-hidden">
                                        <img
                                            src={character.image}
                                            alt={character.name}
                                            className={`w-full h-full object-cover ${character.obtained
                                                ? ''
                                                : 'filter grayscale'} group-hover:grayscale-0 transition-all duration-300`}
                                        />
                                        {character.obtained && (
                                            <div className="absolute top-2 left-2 bg-black bg-opacity-70 px-2 py-1 rounded text-amber-100 border border-amber-900 text-sm">
                                                S{getSequence(character.sequences)}
                                            </div>
                                        )}
                                        <div
                                            className={`absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t ${getRarityColor(character.rarity)} opacity-0 group-hover:opacity-40 transition-opacity duration-300`}>
                                        </div>
                                        <div
                                            className="absolute bottom-0 left-0 right-0 py-2 px-3 text-gray-300 text-sm font-medium truncate group-hover:text-amber-100 transition-colors duration-300 bg-gradient-to-t from-black to-transparent">
                                            {character.name}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    !isLoading && (
                        <div className="flex flex-col items-center justify-center py-8">
                            <div className="bg-gradient-to-br from-gray-900 to-black rounded-lg shadow-lg p-6 max-w-md w-full text-center border border-gray-800">
                                <div className="text-4xl mb-3">📝</div>
                                <h2 className="text-xl font-semibold text-amber-100 mb-3 font-serif">No Characters Found</h2>
                                <p className="text-gray-400 mb-6">You don't have any characters in your collection yet. Import them to get started.</p>
                                <button 
                                    onClick={importPage}
                                    className="bg-amber-800 hover:bg-amber-700 text-amber-100 py-2 px-6 rounded-md font-medium transition-colors duration-300 flex items-center justify-center mx-auto border border-amber-700">
                                    <FaDownload className="mr-2" />
                                    Import Characters
                                </button>
                            </div>
                        </div>
                    )
                )}
            </div>

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
        </div>
    );
};

export default Characters;