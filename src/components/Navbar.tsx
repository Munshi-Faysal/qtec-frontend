import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/logo.svg';

const Navbar: React.FC = () => {
  const location = useLocation();

  const links = [
    { to: '/', label: 'Home' },
    { to: '/account', label: 'Account' },
    { to: '/journal', label: 'Journal' },
    { to: '/trial-balance', label: 'Trial Balance' },
  ];

  return (
    <nav className="bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-500 text-white px-8 py-4 flex justify-between items-center shadow-lg sticky top-0 z-50">
      {/* Logo Section */}
      <div className="flex items-center space-x-3 select-none">
  <div className="bg-white rounded-full p-2 shadow-md">
    <img src={logo} alt="Logo" className="w-12 h-12" />
  </div>
  <span className="text-3xl font-bold tracking-wide text-white">Qtec</span>
</div>

      {/* Navigation Links */}
      <div className="flex space-x-8">
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
    </nav>
  );
};

export default Navbar;
