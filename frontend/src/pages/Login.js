import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { APIUrl, handleError, handleSuccess } from '../utils';

function Login() {
    const [loginInfo, setLoginInfo] = useState({
        email: '',
        password: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        const copyLoginInfo = { ...loginInfo };
        copyLoginInfo[name] = value;
        setLoginInfo(copyLoginInfo);
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        const { email, password } = loginInfo;
        if (!email || !password) {
            return handleError('Email and password are required');
        }
        try {
            const url = `${APIUrl}/auth/login`;
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginInfo)
            });
            const result = await response.json();
            const { success, message, jwtToken, name, error } = result;
            if (success) {
                handleSuccess(message);
                localStorage.setItem('token', jwtToken);
                localStorage.setItem('loggedInUser', name);
                setTimeout(() => {
                    navigate('/home');
                }, 1000);
            } else if (error) {
                const details = error?.details[0].message;
                handleError(details);
            } else if (!success) {
                handleError(message);
            }
        } catch (err) {
            handleError(err);
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg w-full max-w-md shadow-lg">
                <h1 className="mb-5 text-2xl font-bold text-center">Login</h1>
                <form onSubmit={handleLogin} className="flex flex-col gap-4">
                    <div>
                        <label htmlFor="email" className="text-xl">Email</label>
                        <input
                            onChange={handleChange}
                            type="email"
                            name="email"
                            placeholder="Enter your email..."
                            value={loginInfo.email}
                            className="w-full text-lg p-2 border-b border-black focus:outline-none"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="text-xl">Password</label>
                        <input
                            onChange={handleChange}
                            type="password"
                            name="password"
                            placeholder="Enter your password..."
                            value={loginInfo.password}
                            className="w-full text-lg p-2 border-b border-black focus:outline-none"
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-purple-600 text-white text-xl rounded py-2 mt-4 hover:bg-purple-700">
                        Login
                    </button>
                    <span className="mt-4 text-center">
                        Don't have an account?{' '}
                        <Link to="/signup" className="text-blue-600 hover:underline">
                            Signup
                        </Link>
                    </span>
                </form>
                <ToastContainer />
            </div>
        </div>
    );
}

export default Login;
