import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../Login.css';
import { auth, app } from '../FireBase';
import { signInWithEmailAndPassword } from "firebase/auth";
import StudyHiveLogo from '../Images/StudyHiveLogo.webp';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [shake, setShake] = useState(false);
    const navigate = useNavigate();

    const signIn = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log(userCredential.user);
                navigate('/dashboard');
            })
            .catch((error) => {
                console.log(error);
                setError("Account doesn't exist or invalid credentials");
                setShake(true);
                setTimeout(() => setShake(false), 500); // Remove shake class after animation
            });
    }

    return (
        <div className="Login">
            <form onSubmit={signIn} className={shake ? 'shake' : ''}>
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
                <button type="submit">Login</button>
                <div className="register-link">
                    <p>Don't have an account? <Link to="/register">Register</Link></p>
                </div>
            </form>
        </div>
    );
}

export default Login;