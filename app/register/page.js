'use client'

import Head from 'next/head';
import Router from 'next/router';
// import { useRouter} from 'next/navigation';
import 'tailwindcss/tailwind.css';
import { useState } from 'react';

export default function Home() {

  // const router = useRouter()

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate email
    const isValidEmail = validateEmail(formData.email);
    if (!isValidEmail) {
      setEmailError('Please enter a valid email address.');
      return;
    }

    // Validate password match
    const isPasswordMatch = validatePasswordMatch(formData.password, formData.confirmPassword);
    if (!isPasswordMatch) {
      setPasswordError('Passwords do not match.');
      return;
    }

    // Handle form submission logic
    console.log(formData);

    console.log("trying to submit the form data into database...");

    try {
      const res = await fetch('http://localhost:3000/api/users', {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify({ 
          username: formData.username, // Use formData.username instead of username
          password: formData.password, // Use formData.password instead of password
          email: formData.email // Use formData.email instead of email
        })
      })

      if (!res.ok) {
        throw new Error("Failed to register the user")
      }

      console.log("Data successfully submitted")
    } catch (error) {
      console.log(error);
    }

  };

  const handleLogin = () => {
    Router.push('/login');
  };

  const validateEmail = (email) => {
    // Regular expression for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePasswordMatch = (password, confirmPassword) => {
    return password === confirmPassword;
  };

  return (
    <div>
      <Head>
        <title>KalKal</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="h-screen bg-top bg-cover flex flex-col bg-gradient-to-b from-blue-500">
        <div className="h-full flex justify-center items-center">
          <form onSubmit={handleSubmit} className="bg-blue-600 p-8 rounded-md shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-white">Registration Form</h2>
            <div className="mb-4">
              <label htmlFor="name" className="text-white">Username</label>
              <input
                type="text"
                name="username"
                id="username"
                className="w-full px-4 py-2 rounded bg-white"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="text-white">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                className="w-full px-4 py-2 rounded bg-white"
                value={formData.email}
                onChange={handleChange}
                required
              />
              {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="text-white">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                className="w-full px-4 py-2 rounded bg-white"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="confirmPassword" className="text-white">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                className="w-full px-4 py-2 rounded bg-white"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
              {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}
            </div>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded font-bold">
              Submit
            </button>
            <div className="mt-4">
              <p className="text-white">Already registered?</p>
              <button
                type="button"
                className="text-blue-500 underline"
                onClick={handleLogin}
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
