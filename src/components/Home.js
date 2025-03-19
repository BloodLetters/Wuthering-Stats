import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="flex flex-col min-h-screen bg-gray-900 font-inter">
            <header className="p-4 border-b border-gray-800">
                <div className="container mx-auto flex justify-center items-center px-4">
                    <div className="text-white text-2xl">Wuthering Stats</div>
                    <div className="flex space-x-2 ml-auto">
                        <button className="bg-gray-800 hover:bg-gray-700 p-2 rounded transition-colors">
                            <span className="text-white">⚙️</span>
                        </button>
                    </div>
                </div>
            </header>

            <main className="flex-grow flex items-start justify-center container mx-auto p-4">
                <div className="text-center text-white mt-16">
                    <h1 className="text-4xl mb-4">Welcome to Wuthering Stats</h1>
                    <p className="text-lg mb-8">Your ultimate source for Wuthering Waves character statistics and information.</p>
                    <div className="flex justify-center space-x-4">
                        <Link to="/portraits" className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded transition-colors">
                            Character
                        </Link>
                        <Link to="/search" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors">
                            Search
                        </Link>
                    </div>
                </div>
            </main>

            <footer className="mt-auto p-4 bg-gray-800 text-gray-400 text-sm">
                <div className="container mx-auto">
                    © 2025 Wuthering Stats
                </div>
            </footer>
        </div>
    );
};

export default Home;