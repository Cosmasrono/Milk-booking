'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
 
 
  const handleLogin = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      const response = await fetch('/api/Auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
  
      if (!response.ok) {
        if (data.message === 'Incorrect password') {
          toast.error('Incorrect password. Please try again.', {
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
        } else {
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
        }
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
        window.location.href = '/home';
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
    <div className="bg-white p-5 my-auto py-6 max-w-md flex justify-center items-center mx-auto flex-col rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-center">Welcome Back</h2>
      <div className="mb-4 flex w-full justify-center items-center justify-self-center ">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-4 flex w-full justify-center items-center justify-self-center ">
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <button
        onClick={handleLogin}
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
          'Login'
        )}
      </button>
      <div className="my-6 h-px bg-gray-200" />
       
      <div className="flex justify-center mt-4">
     
          <Link
            className="text-blue-600 ml-2 hover:text-blue-700 hover:underline"
            href="/Auth"
          >
            Register
          </Link>
 
      </div>
    </div>
  );
};

export default Login;