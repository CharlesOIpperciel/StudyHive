import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth, app } from '../FireBase';
import { signInWithEmailAndPassword } from "firebase/auth";
import StudyHiveLogo from '../Images/StudyHiveLogo2.png';

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
        <div className={`flex items-center justify-center min-h-screen geometric-background ${shake ? 'shake' : ''}`}>
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-[500px] h-auto min-h-[600px]">
                <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl black">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">Store Better</span>
                    <span className="outline-black"> Study Smarter.</span>
                </h1>
                <img src={StudyHiveLogo} alt="StudyHive Logo" className="mx-auto mb-6 w-40 h-40 rounded-full"/>
                <form onSubmit={signIn}>
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
                    {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                    <button type="submit"
                            className="relative inline-flex group items-center justify-center w-full py-2 m-1 cursor-pointer border-b-4 border-l-2 active:border-yellow-600 active:shadow-none shadow-lg bg-yellow-500 border-yellow-700 text-white rounded-lg">
                        <span
                            className="absolute w-0 h-0 transition-all duration-300 ease-out bg-white rounded-full group-hover:w-32 group-hover:h-32 opacity-10"></span>
                        <span className="relative">Login</span>
                    </button>
                    <div className="text-center mt-4">
                        <p>Don't have an account? <Link to="/register"
                                                        className="text-yellow-500 hover:underline">Register</Link></p>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;