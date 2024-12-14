import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useRegisterUserMutation } from '../../redux/features/auth/authApi'
import { use } from 'react';
const Register = () => {
    const [username, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [registerUser, { isLoading }] = useRegisterUserMutation();
    const usernameRef = useRef(null);
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        const data = {
            username,
            email,
            password,
        }
        try {
            await registerUser(data).unwrap();
            alert("register successful");
            navigate('/login');
        } catch (error) {
            setMessage("Please provide a valid email and password!");
        }
    }

    useEffect(() => {
        usernameRef.current.focus();
    }, []);

    return (
        <div className='max-w-sm bg-white mx-auto p-8 mt-36'>
            <h2 className="text-2xl font-semibold pt-5">Please Login</h2>
            <form
                className='space-y-5 max-w-sm mx-auto pt-8'
                onSubmit={handleRegister}
            >
                <input type="text"
                    ref={usernameRef}
                    className='w-full bg-bgprimary focus:outline-none px-5 py-3'
                    value={username}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder='username'
                    required
                />
                <input type="text"
                    className='w-full bg-bgprimary focus:outline-none px-5 py-3'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder='Email'
                    required
                />
                <input type="password"
                    className='w-full bg-bgprimary focus:outline-none px-5 py-3'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder='password'
                    required
                />{
                    message && <p className='text-red-500'>{message}</p>
                }
                <button className='w-full bg-primary hover:bg-indigo-600 text-white font-medium py-3 rounded-md'>Login</button>
            </form>
            <p className='my-5 text-center'>Already have an account? Please <Link className='text-red-500 italic font-semibold' to='/login'> Register </Link>
            </p>
        </div>
    )
}

export default Register