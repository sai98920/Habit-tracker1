// src/components/Navbar.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext'; // auth context for token and logout

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { authData, logout } = useAuth(); // auth info
  const navigate = useNavigate(); // redirect handler

  const handleLogout = async () => {
    await logout();      // clear token/cookie
    navigate('/login');  // redirect to login
  };

  return (
    <nav className="bg-gradient-to-r from-indigo-600 to-indigo-800 text-white px-6 py-4 flex justify-between items-center shadow-lg relative">
      {/* Logo */}
      <h1 className="text-2xl font-extrabold flex items-center space-x-2">
        <span className="text-yellow-400">Habit</span> Tracker
      </h1>

      {/* Desktop Nav */}
      <div className="hidden md:flex items-center space-x-8">
        <ul className="flex space-x-8">
          {authData && (
            <>
              <li><Link to="/dashboard" className="text-lg font-medium hover:text-yellow-400">Dashboard</Link></li>
              <li><Link to="/add" className="text-lg font-medium hover:text-yellow-400">Add Habit</Link></li>
              <li><Link to="/habits" className="text-lg font-medium hover:text-yellow-400">My Habits</Link></li>
              <li><button onClick={handleLogout} className="text-lg font-medium hover:text-yellow-400">Logout</button></li>
            </>
          )}
          {!authData && (
            <>
              <li><Link to="/login" className="text-lg font-medium hover:text-yellow-400">Login</Link></li>
              <li><Link to="/register" className="text-lg font-medium hover:text-yellow-400">Register</Link></li>
            </>
          )}
        </ul>
      </div>

      {/* Mobile Menu Toggle */}
      <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-white focus:outline-none">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Mobile Nav */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-indigo-800 p-4 shadow-lg rounded-b-lg">
          <ul className="space-y-4">
            {authData && (
              <>
                <li><Link to="/dashboard" className="block text-lg font-medium hover:text-yellow-400">Dashboard</Link></li>
                <li><Link to="/add" className="block text-lg font-medium hover:text-yellow-400">Add Habit</Link></li>
                <li><Link to="/habits" className="block text-lg font-medium hover:text-yellow-400">My Habits</Link></li>
                <li><button onClick={handleLogout} className="block text-lg font-medium hover:text-yellow-400">Logout</button></li>
              </>
            )}
            {!authData && (
              <>
                <li><Link to="/login" className="block text-lg font-medium hover:text-yellow-400">Login</Link></li>
                <li><Link to="/register" className="block text-lg font-medium hover:text-yellow-400">Register</Link></li>
              </>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
