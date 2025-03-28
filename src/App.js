import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useParams } from 'react-router-dom';
import Home from './components/Home';
import Character from './components/Characters';
import Profile from './components/Profile';
import Settings from './components/Settings';
import AccountImport from './components/Account';
import Search from './components/Search';
import Login from './components/Login';
import Register from './components/Register';

const UserRedirect = () => {
    const { userId } = useParams();
    return <Navigate to={`/Characters?v=${userId}`} replace />;
};

const App = () => {
    return (
        <Router>
            <div className="flex flex-col min-h-screen bg-gray-900 font-inter">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/Characters" element={<Character />} />
                    <Route path="/Profile" element={<Profile />} />
                    <Route path="/Settings" element={<Settings />} />
                    <Route path="/Import" element={<AccountImport />} />
                    <Route path="/Search" element={<Search />} />

                    {/* Login Menus */}
                    <Route path="/Login" element={<Login />} />
                    <Route path="/Register" element={<Register />} />

                    <Route path="/u/:userId" element={<UserRedirect />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
