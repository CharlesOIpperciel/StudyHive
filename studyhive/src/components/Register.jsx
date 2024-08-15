import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import '../Login.css';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, app } from "../FireBase";
import StudyHiveLogo from '../Images/StudyHiveLogo.webp';

function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [shake, setShake] = useState(false);

    const register = (e) => {
        e.preventDefault();
        if (password.length < 6) {
            setError("Password needs to be at least 6 characters");
            setShake(true);
            setTimeout(() => setShake(false), 500); // Remove shake class after animation
            return;
        }
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log(userCredential.user);
            })
            .catch((error) => {
                console.log(error);
                setError("Email already in use");
                setShake(true);
                setTimeout(() => setShake(false), 500); // Remove shake class after animation
            });
    }

    return (
        <div className="Login">
            <form onSubmit={register} className={shake ? 'shake' : ''}>
                <img src={StudyHiveLogo} alt="StudyHive Logo" className="logo"/>
                <div>
                    <input placeholder="Enter your email" type="email" id="email" value={email}
                           onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div>
                    <input placeholder="Enter your password" type="password" id="password" value={password}
                           onChange={(e) => setPassword(e.target.value)}/>
                </div>
                {error && <p className="error-message">{error}</p>}
                <button type="submit">Register</button>
                <div className="back-button-container">
                    <Link to="/">
                        <button className="back-button">
                            <FaArrowLeft/>
                        </button>
                    </Link>
                </div>
            </form>
        </div>
    );
}

export default Register;