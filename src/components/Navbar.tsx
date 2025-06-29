import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/logo.svg';

const Navbar: React.FC = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const links = [
    { to: '/', label: 'Home' },
    { to: '/account', label: 'Account' },
    { to: '/journal', label: 'Journal' },
    { to: '/trial-balance', label: 'Trial Balance' },
  ];

  return (
    <nav className="bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-500 text-white px-6 py-4 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center space-x-3 select-none">
          <div className="bg-white rounded-full p-2 shadow-md">
            <img src={logo} alt="Logo" className="w-12 h-12" />
          </div>
          <span className="text-3xl font-bold tracking-wide text-white">Qtec</span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-8">
          {links.map(({ to, label }) => {
            const isActive = location.pathname === to;
            return (
              <Link
                key={to}
                to={to}
                className={`relative px-3 py-2 font-semibold transition-colors duration-300 hover:text-yellow-300 ${
                  isActive ? 'text-yellow-300' : 'text-white'
                }`}
              >
                {label}
                {isActive && (
                  <span className="absolute left-0 bottom-0 w-full h-1 bg-yellow-300 rounded-t-md" />
                )}
              </Link>
            );
          })}
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden focus:outline-none"
          aria-label="Toggle menu"
        >
          <svg
            className="w-8 h-8 text-white"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {mobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-4 bg-indigo-700 rounded-md shadow-lg">
          {links.map(({ to, label }) => {
            const isActive = location.pathname === to;
            return (
              <Link
                key={to}
                to={to}
                onClick={() => setMobileMenuOpen(false)} // close menu on click
                className={`block px-6 py-3 font-semibold transition-colors duration-300 hover:text-yellow-300 border-b border-indigo-600 ${
                  isActive ? 'text-yellow-300' : 'text-white'
                }`}
              >
                {label}
              </Link>
            );
          })}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
