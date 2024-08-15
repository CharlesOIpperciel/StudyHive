// studyhive/src/components/Register.jsx
import { FaArrowLeft } from 'react-icons/fa';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, app } from "../FireBase";
import StudyHiveLogo from '../../../../CharlesOIpperciel.github.io/Projects/StudyHive/ProjectImages/StudyHiveLogo2.png';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [shake, setShake] = useState(false);
    const [h1Text, setH1Text] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const texts = ["Store Smarter", "Study Better"];
        let index = 0;
        let charIndex = 0;
        let isDeleting = false;

        const type = () => {
            setH1Text((prev) => isDeleting ? prev.slice(0, -1) : texts[index].slice(0, charIndex + 1));
            if (!isDeleting) {
                if (charIndex < texts[index].length) {
                    charIndex++;
                } else {
                    isDeleting = true;
                    setTimeout(type, 1000); // Pause before deleting
                    return;
                }
            } else {
                if (charIndex > 0) {
                    charIndex--;
                } else {
                    isDeleting = false;
                    index = (index + 1) % texts.length;
                }
            }
            const randomSpeed = Math.random() * (300 - 100) + 100; // Random speed between 100ms and 300ms
            setTimeout(type, randomSpeed);
        };

        type();
    }, []);

    const register = (e) => {
        e.preventDefault();
        if (password.length < 6) {
            setError("Password needs to be at least 6 characters");
            setShake(true);
            setTimeout(() => setShake(false), 500); // Remove shake class after animation
            return;
        }
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            setShake(true);
            setTimeout(() => setShake(false), 500); // Remove shake class after animation
            return;
        }
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log(userCredential.user);
                navigate('/dashboard');
            })
            .catch((error) => {
                console.log(error);
                setError("Email already in use");
                setShake(true);
                setTimeout(() => setShake(false), 500); // Remove shake class after animation
            });
    }

    return (
        <div className={`flex items-center justify-center min-h-screen geometric-background ${shake ? 'shake' : ''}`}>
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-[500px] h-auto min-h-[400px]">
                <img src={StudyHiveLogo} alt="StudyHive Logo" className="mx-auto mb-6 w-40 h-40 rounded-full"/>
                <form onSubmit={register}>
                    <div className="mb-4">
                        <input placeholder="Enter your email" type="email" id="email" value={email}
                               onChange={(e) => setEmail(e.target.value)} className="w-full px-3 py-2 border rounded-lg"
                               required/>
                    </div>
                    <div className="mb-4">
                        <input placeholder="Enter your password" type="password" id="password" value={password}
                               onChange={(e) => setPassword(e.target.value)}
                               className="w-full px-3 py-2 border rounded-lg" required/>
                    </div>
                    <div className="mb-6">
                        <input placeholder="Confirm your password" type="password" id="confirm-password"
                               value={confirmPassword}
                               onChange={(e) => setConfirmPassword(e.target.value)}
                               className="w-full px-3 py-2 border rounded-lg" required/>
                    </div>
                    {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                    <button type="submit"
                            className="relative inline-flex group items-center justify-center w-full py-2 m-1 cursor-pointer border-b-4 border-l-2 active:border-yellow-600 active:shadow-none shadow-lg bg-yellow-500 border-yellow-700 text-white rounded-lg">
                        <span
                            className="absolute w-0 h-0 transition-all duration-300 ease-out bg-white rounded-full group-hover:w-32 group-hover:h-32 opacity-10"></span>
                        <span className="relative">Register</span>
                    </button>
                    <div className="text-center mt-4">
                        <Link to="/" className="text-yellow-500 hover:underline">
                            <button className="flex items-center justify-center">
                                <FaArrowLeft className="mr-2"/> Back
                            </button>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Register;