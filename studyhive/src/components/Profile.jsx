import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../Dashboard.css';
import StudyHiveLogo from '../Images/StudyHiveLogo.webp';

function Profile() {
    const navigate = useNavigate();

    const handleLogout = () => {
        navigate('/login');
    };

    return (
        <div className="Dashboard">
            <nav className="Dashboard-nav">
                <img src={StudyHiveLogo} alt="StudyHive Logo" className="navbar-logo" />
                <button onClick={() => navigate('/dashboard')}>Dashboard</button>
                <button onClick={() => navigate('/profile')}>Profile</button>
                <button onClick={handleLogout}>Log Out</button>
            </nav>
        </div>
    );
}

export default Profile;