import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Character from './components/Characters';

const App = () => {
    return (
        <Router>
            <div className="flex flex-col min-h-screen bg-gray-900 font-inter">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/portraits" element={<Character />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;