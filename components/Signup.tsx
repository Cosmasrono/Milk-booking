'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';
 
const Signup = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  // Access router directly within the component (assuming Signup is a page)
  
  const handleRegister = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    // Check if passwords match
    if (password !== confirmPassword) {
      toast.error('Passwords do not match', {
        style: {
          border: '1px solid #713200',
          padding: '16px',
          color: '#713200',
        },
        iconTheme: {
          primary: '#713200',
          secondary: '#FFFAEE',
        },
      });
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/Auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName,
          lastName,
          password,
          email,
        }),
      });
      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message, {
          style: {
            border: '1px solid #713200',
            padding: '16px',
            color: '#713200',
          },
          iconTheme: {
            primary: '#713200',
            secondary: '#FFFAEE',
          },
        });
        setLoading(false);

        return;
      }

      toast.success(data.message, {
        style: {
          border: '1px solid #713200',
          padding: '16px',
          color: '#713200',
        },
        iconTheme: {
          primary: '#713200',
          secondary: '#FFFAEE',
        },
      });

      setTimeout(() => {
        setLoading(false);
        window.location.href = '/login'; // Use window.location.href instead of router.push
      }, 1000);
    } catch (error) {
      toast.error('An error occurred. Please try again.', {
        style: {
          border: '1px solid #713200',
          padding: '16px',
          color: '#713200',
        },
        iconTheme: {
          primary: '#713200',
          secondary: '#FFFAEE',
        },
      });
      setLoading(false);
      console.error(error);
    }
  };

  return (
    <div className="bg-white p-5 py-6 max-w-md flex justify-center items-center mx-auto flex-col rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-2 text-center">Get Started</h2>
      <div className="mb-4 flex w-full justify-center items-center justify-self-center ">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full py-3 px-1 justify-self-center flex items-center border border-gray-300  rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-4 flex w-full justify-center items-center justify-self-center ">
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="w-full py-3 px-1 justify-self-center flex items-center border border-gray-300  rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mb-4 flex w-full justify-center items-center justify-self-center ">
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="w-full py-3 px-1 justify-self-center flex items-center border border-gray-300  rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mb-4 flex w-full justify-center items-center justify-self-center ">
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full py-3 px-1 justify-self-center flex items-center border border-gray-300  rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mb-4 flex w-full justify-center items-center justify-self-center">
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full py-3 px-1 justify-self-center flex items-center border border-gray-300  rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <button
        onClick={handleRegister}
        disabled={loading}
        className="w-full py-3 text-white bg-blue-600 rounded-md transition duration-300 hover:bg-blue-700 focus:outline-none"
      >
        {loading ? (
          <svg
            className="animate-spin h-5 w-5 mx-auto"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
        ) : (
          'Register'
        )}
      </button>
      <div className="my-6 h-px bg-gray-200" />
      <p className="text-center text-gray-500 text-sm">
        &copy; 2024 Our Services. All rights reserved.
      </p>
      <div className="flex justify-center mt-4">
        <h5 className="text-center text-gray-500 text-sm mr-2">
          Have an account?
          <Link
            className="text-blue-600 ml-2 hover:text-blue-700 hover:underline"
            href="/login"
          >
            Login
          </Link>
        </h5>
        <h5 className="text-center text-gray-500 text-sm ml-2">
          New to Our Services?
          <Link
            className="text-blue-600 ml-2 hover:text-blue-700 hover:underline"
            href="/Auth"
          >
            Register
          </Link>
        </h5>
      </div>
    </div>
  );
};

export default Signup;