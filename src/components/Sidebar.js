import React from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaCog, FaQuestionCircle, FaTimes, FaSignOutAlt } from 'react-icons/fa';

const Sidebar = ({ isOpen, toggleSidebar, isAuthenticated }) => {
    return (
        <div
            className={`fixed inset-0 bg-black bg-opacity-70 flex justify-end transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
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
                    {isAuthenticated ? (
                        <>
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
                        </>
                    ) : (
                        <li>
                            <p className="text-gray-300 text-center">Please log in to access features</p>
                        </li>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;