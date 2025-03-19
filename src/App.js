import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Character from './components/Characters';
import Profile from './components/Profile';
import Settings from './components/Settings'

const App = () => {
    return (
        <Router>
            <div className="flex flex-col min-h-screen bg-gray-900 font-inter">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/Characters" element={<Character />} />
                    <Route path="/Profile" element={<Profile />} />
                    <Route path="/Settings" element={<Settings />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;