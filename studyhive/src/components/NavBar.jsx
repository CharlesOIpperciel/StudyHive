import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import StudyHiveLogo from '../Images/StudyHiveLogo.png';
import ProfilePhoto from '../Images/PhotoTest.png'; // Ensure this path is correct

function Navbar() {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const navigate = useNavigate();

    return (
        <nav className="flex items-center justify-between p-4 geometric-background text-white">
            <div className="flex items-center">
                <img src={StudyHiveLogo} alt="StudyHive Logo" className="w-20 h-20" />
            </div>
            <div className="flex-grow text-center">
                <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">My</span> Dashboard.
                </h1>
            </div>
            <div className="relative">
                <img
                    src={ProfilePhoto}
                    alt="Profile"
                    className="w-16 h-16 rounded-full cursor-pointer mr-4"
                    onClick={toggleDropdown}
                />
                {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2">
                        <Link to="/profile" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">My Profile</Link>
                        <Link to="/settings" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">My Settings</Link>
                        <button
                            onClick={() => navigate('/login')}
                            className="block w-full text-center px-4 py-2 text-gray-800 hover:bg-gray-200"
                        >
                            Logout
                        </button>
                    </div>
                )}
            </div>
        </nav>
    );
}

export default Navbar;