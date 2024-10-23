import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { APIUrl, handleError, handleSuccess } from '../utils';

function Signup() {
    const [signupInfo, setSignupInfo] = useState({
        name: '',
        email: '',
        password: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        const copySignupInfo = { ...signupInfo };
        copySignupInfo[name] = value;
        setSignupInfo(copySignupInfo);
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        const { name, email, password } = signupInfo;
        if (!name || !email || !password) {
            return handleError('Name, email, and password are required');
        }
        try {
            const url = `${APIUrl}/auth/signup`;
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(signupInfo)
            });
            const result = await response.json();
            const { success, message, error } = result;
            if (success) {
                handleSuccess(message);
                setTimeout(() => {
                    navigate('/login');
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
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg w-full max-w-md shadow-lg">
                <h1 className="mb-5 text-2xl font-bold text-center">Signup</h1>
                <form onSubmit={handleSignup} className="flex flex-col gap-4">
                    <div>
                        <label htmlFor='name' className="text-xl">Name</label>
                        <input
                            onChange={handleChange}
                            type='text'
                            name='name'
                            autoFocus
                            placeholder='Enter your name...'
                            value={signupInfo.name}
                            className="w-full text-lg p-2 border-b border-black focus:outline-none"
                        />
                    </div>
                    <div>
                        <label htmlFor='email' className="text-xl">Email</label>
                        <input
                            onChange={handleChange}
                            type='email'
                            name='email'
                            placeholder='Enter your email...'
                            value={signupInfo.email}
                            className="w-full text-lg p-2 border-b border-black focus:outline-none"
                        />
                    </div>
                    <div>
                        <label htmlFor='password' className="text-xl">Password</label>
                        <input
                            onChange={handleChange}
                            type='password'
                            name='password'
                            placeholder='Enter your password...'
                            value={signupInfo.password}
                            className="w-full text-lg p-2 border-b border-black focus:outline-none"
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-purple-600 text-white text-xl rounded py-2 mt-4 hover:bg-purple-700">
                        Signup
                    </button>
                    <span className="mt-4 text-center">
                        Already have an account?{' '}
                        <Link to="/login" className="text-blue-600 hover:underline">
                            Login
                        </Link>
                    </span>
                </form>
                <ToastContainer />
            </div>
        </div>
    );
}

export default Signup;
