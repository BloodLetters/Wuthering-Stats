import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaCog, FaQuestionCircle, FaTimes, FaSignOutAlt, FaSave, FaBell, FaGlobe, FaShieldAlt, FaUserCircle, FaMoon, FaSun } from 'react-icons/fa';

const Settings = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [allImagesLoaded, setAllImagesLoaded] = useState(false);
    const [activeTab, setActiveTab] = useState('account');
    const [darkMode, setDarkMode] = useState(true);
    const [formData, setFormData] = useState({
        username: 'WaveRider',
        email: 'waverider@example.com',
        language: 'en',
        region: 'asia',
        privacy: {
            publicProfile: true,
            showStatus: true,
            showActivity: true,
            allowFriendRequests: true
        },
        appearance: {
            theme: 'dark',
            fontSize: 'medium',
            compactMode: false
        }
    });

    const isAuthenticated = false;

    // Toggle sidebar
    const toggleSidebar = () => {
        if(!isAuthenticated) return;
        setIsSidebarOpen(!isSidebarOpen);
    };

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Handle checkbox changes
    const handleCheckboxChange = (category, setting) => {
        setFormData({
            ...formData,
            [category]: {
                ...formData[category],
                [setting]: !formData[category][setting]
            }
        });
    };

    // Handle theme toggle
    const toggleTheme = () => {
        setDarkMode(!darkMode);
        setFormData({
            ...formData,
            appearance: {
                ...formData.appearance,
                theme: darkMode ? 'light' : 'dark'
            }
        });
    };

    // Handle save settings
    const saveSettings = () => {
        // In a real app, you would save to backend here
        alert('Settings saved successfully!');
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
                <Link to="/" className="hover:text-white transition-colors">🏠</Link>
                <span>›</span>
                <span className="text-white">Settings</span>
            </div>

            <div className="container mx-auto p-4">
                <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
                    <div className="p-4 border-b border-gray-700">
                        <h2 className="text-white text-xl font-semibold">Settings</h2>
                    </div>
                    
                    {/* Settings tabs */}
                    <div className="flex border-b border-gray-700">
                        <button 
                            className={`px-4 py-3 ${activeTab === 'account' ? 'text-purple-400 border-b-2 border-purple-400' : 'text-gray-400 hover:text-white'}`}
                            onClick={() => setActiveTab('account')}
                        >
                            <FaUserCircle className="inline mr-2" />
                            Account
                        </button>
                        <button 
                            className={`px-4 py-3 ${activeTab === 'privacy' ? 'text-purple-400 border-b-2 border-purple-400' : 'text-gray-400 hover:text-white'}`}
                            onClick={() => setActiveTab('privacy')}
                        >
                            <FaShieldAlt className="inline mr-2" />
                            Privacy
                        </button>
                        <button 
                            className={`px-4 py-3 ${activeTab === 'appearance' ? 'text-purple-400 border-b-2 border-purple-400' : 'text-gray-400 hover:text-white'}`}
                            onClick={() => setActiveTab('appearance')}
                        >
                            <FaCog className="inline mr-2" />
                            Appearance
                        </button>
                    </div>

                    <div className="p-6">
                        {/* Account Settings */}
                        {activeTab === 'account' && (
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-white mb-2">Username</label>
                                    <input 
                                        type="text" 
                                        name="username" 
                                        value={formData.username} 
                                        onChange={handleInputChange}
                                        className="w-full bg-gray-700 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                                    />
                                </div>

                                <div>
                                    <label className="block text-white mb-2">Email</label>
                                    <input 
                                        type="email" 
                                        name="email" 
                                        value={formData.email} 
                                        onChange={handleInputChange}
                                        className="w-full bg-gray-700 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-white mb-2">Language</label>
                                        <select 
                                            name="language" 
                                            value={formData.language} 
                                            onChange={handleInputChange}
                                            className="w-full bg-gray-700 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                                        >
                                            <option value="en">English</option>
                                            <option value="id">Bahasa Indonesia</option>
                                            <option value="ja">Japanese</option>
                                            <option value="zh">Chinese</option>
                                        </select>
                                    </div>
                                    
                                    <div>
                                        <label className="block text-white mb-2">Region</label>
                                        <select 
                                            name="region" 
                                            value={formData.region} 
                                            onChange={handleInputChange}
                                            className="w-full bg-gray-700 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                                        >
                                            <option value="asia">Asia</option>
                                            <option value="eu">Europe</option>
                                            <option value="na">North America</option>
                                            <option value="sa">South America</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Privacy Settings */}
                        {activeTab === 'privacy' && (
                            <div className="space-y-6">
                                <div className="border-b border-gray-700 pb-4">
                                    <h3 className="text-white text-lg mb-4">Profile Visibility</h3>
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between">
                                            <span className="text-gray-300">Public profile</span>
                                            <label className="inline-flex items-center cursor-pointer">
                                                <input 
                                                    type="checkbox" 
                                                    checked={formData.privacy.publicProfile} 
                                                    onChange={() => handleCheckboxChange('privacy', 'publicProfile')}
                                                    className="sr-only peer"
                                                />
                                                <div className="relative w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-purple-400 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                                            </label>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-gray-300">Show online status</span>
                                            <label className="inline-flex items-center cursor-pointer">
                                                <input 
                                                    type="checkbox" 
                                                    checked={formData.privacy.showStatus} 
                                                    onChange={() => handleCheckboxChange('privacy', 'showStatus')}
                                                    className="sr-only peer"
                                                />
                                                <div className="relative w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-purple-400 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                                            </label>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-gray-300">Show activity history</span>
                                            <label className="inline-flex items-center cursor-pointer">
                                                <input 
                                                    type="checkbox" 
                                                    checked={formData.privacy.showActivity} 
                                                    onChange={() => handleCheckboxChange('privacy', 'showActivity')}
                                                    className="sr-only peer"
                                                />
                                                <div className="relative w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-purple-400 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                                            </label>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-gray-300">Allow friend requests</span>
                                            <label className="inline-flex items-center cursor-pointer">
                                                <input 
                                                    type="checkbox" 
                                                    checked={formData.privacy.allowFriendRequests} 
                                                    onChange={() => handleCheckboxChange('privacy', 'allowFriendRequests')}
                                                    className="sr-only peer"
                                                />
                                                <div className="relative w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-purple-400 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-white text-lg mb-4">Data Management</h3>
                                    <div className="space-y-3">
                                        <button className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors w-full md:w-auto text-left">
                                            Download my data
                                        </button>
                                        <button className="bg-red-900 hover:bg-red-800 text-white px-4 py-2 rounded-lg transition-colors w-full md:w-auto text-left">
                                            Delete account
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Appearance Settings */}
                        {activeTab === 'appearance' && (
                            <div className="space-y-6">
                                <div className="border-b border-gray-700 pb-4">
                                    <h3 className="text-white text-lg mb-4">Theme</h3>
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-300">Dark mode</span>
                                        <button 
                                            onClick={toggleTheme}
                                            className="bg-gray-700 hover:bg-gray-600 p-2 rounded-full transition-colors text-white"
                                        >
                                            {darkMode ? <FaSun /> : <FaMoon />}
                                        </button>
                                    </div>
                                </div>

                                <div className="border-b border-gray-700 pb-4">
                                    <h3 className="text-white text-lg mb-4">Text Size</h3>
                                    <div className="flex space-x-2">
                                        <button 
                                            className={`px-4 py-2 rounded-lg ${formData.appearance.fontSize === 'small' ? 'bg-purple-600' : 'bg-gray-700 hover:bg-gray-600'} text-white transition-colors`}
                                            onClick={() => setFormData({...formData, appearance: {...formData.appearance, fontSize: 'small'}})}
                                        >
                                            Small
                                        </button>
                                        <button 
                                            className={`px-4 py-2 rounded-lg ${formData.appearance.fontSize === 'medium' ? 'bg-purple-600' : 'bg-gray-700 hover:bg-gray-600'} text-white transition-colors`}
                                            onClick={() => setFormData({...formData, appearance: {...formData.appearance, fontSize: 'medium'}})}
                                        >
                                            Medium
                                        </button>
                                        <button 
                                            className={`px-4 py-2 rounded-lg ${formData.appearance.fontSize === 'large' ? 'bg-purple-600' : 'bg-gray-700 hover:bg-gray-600'} text-white transition-colors`}
                                            onClick={() => setFormData({...formData, appearance: {...formData.appearance, fontSize: 'large'}})}
                                        >
                                            Large
                                        </button>
                                    </div>
                                </div>

                                <div className="border-b border-gray-700 pb-4">
                                    <h3 className="text-white text-lg mb-4">Layout</h3>
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-300">Compact mode</span>
                                        <label className="inline-flex items-center cursor-pointer">
                                            <input 
                                                type="checkbox" 
                                                checked={formData.appearance.compactMode} 
                                                onChange={() => handleCheckboxChange('appearance', 'compactMode')}
                                                className="sr-only peer"
                                            />
                                            <div className="relative w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-purple-400 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                                        </label>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-white text-lg mb-4">Accent Color</h3>
                                    <div className="flex space-x-4">
                                        <button className="w-8 h-8 bg-purple-600 rounded-full border-2 border-white"></button>
                                        <button className="w-8 h-8 bg-blue-600 rounded-full"></button>
                                        <button className="w-8 h-8 bg-green-600 rounded-full"></button>
                                        <button className="w-8 h-8 bg-red-600 rounded-full"></button>
                                        <button className="w-8 h-8 bg-yellow-500 rounded-full"></button>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="mt-6 pt-6 border-t border-gray-700 flex justify-end">
                            <button 
                                className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors mr-2"
                            >
                                Cancel
                            </button>
                            <button 
                                onClick={saveSettings}
                                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center"
                            >
                                <FaSave className="mr-2" />
                                Save Settings
                            </button>
                        </div>
                    </div>
                </div>
            </div>

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

export default Settings;