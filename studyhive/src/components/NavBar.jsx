import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage, db } from '../FireBase'; // Ensure these are correctly set up
import StudyHiveLogo from '../Images/StudyHiveLogo.png';
import PlaceholderPhoto from '../Images/Placeholder.jpg';
import Modal from './Modal';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth'; // Import from modular SDK

function Navbar() {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [profilePhotoURL, setProfilePhotoURL] = useState(PlaceholderPhoto);
    const navigate = useNavigate();
    const auth = getAuth(); // Get the auth instance

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            try {
                const storageRef = ref(storage, `profilePictures/${Date.now()}_${file.name}`);
                await uploadBytes(storageRef, file);
                const downloadURL = await getDownloadURL(storageRef);

                // Save the URL to the database
                await saveProfilePhotoURL(downloadURL);

                setProfilePhotoURL(downloadURL);
            } catch (error) {
                console.error("Error uploading file: ", error);
            }
        }
    };

    const saveProfilePhotoURL = async (url) => {
        const user = auth.currentUser;
        if (user) {
            try {
                await setDoc(doc(db, 'users', user.uid), { profilePhotoURL: url }, { merge: true });
            } catch (error) {
                console.error("Error saving profile photo URL: ", error);
            }
        } else {
            console.error("User not authenticated");
        }
    };

    const fetchProfilePhotoURL = async () => {
        const user = auth.currentUser;
        if (user) {
            try {
                const userDoc = await getDoc(doc(db, 'users', user.uid));
                if (userDoc.exists()) {
                    const userData = userDoc.data();
                    if (userData.profilePhotoURL) {
                        setProfilePhotoURL(userData.profilePhotoURL);
                    }
                }
            } catch (error) {
                console.error("Error fetching profile photo URL: ", error);
            }
        } else {
            console.error("User not authenticated");
        }
    };

    useEffect(() => {
        fetchProfilePhotoURL();
    }, []);

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
                    src={profilePhotoURL}
                    alt="Profile"
                    className="w-16 h-16 rounded-full cursor-pointer mr-4"
                    onClick={toggleDropdown}
                />
                {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2">
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="block w-full text-center px-4 py-2 text-gray-800 hover:bg-gray-200"
                        >
                            Profile
                        </button>
                        <Link to="/settings" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Settings</Link>
                        <button
                            onClick={() => navigate('/login')}
                            className="block w-full text-center px-4 py-2 text-gray-800 hover:bg-gray-200"
                        >
                            Log out
                        </button>
                    </div>
                )}
            </div>
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <h2 className="text-2xl mb-4">My Profile</h2>
                <form>
                    <div className="mb-4">
                        <label className="block text-gray-700">Profile Picture</label>
                        <input type="file" className="mt-2 p-2 border rounded" onChange={handleFileChange} />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Change Password</label>
                        <input type="password" className="mt-2 p-2 border rounded" placeholder="New Password" />
                    </div>
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Save Changes</button>
                </form>
            </Modal>
        </nav>
    );
}

export default Navbar;
