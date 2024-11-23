import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/ugyan.png';

const Login = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  // Function to fetch role based on username
  const fetchUserRole = async (username) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}employees/get-role/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username }),
      });

      const result = await response.json();
      if (response.ok && result.role) {
        return result.role;
      } else {
        throw new Error(result.message || 'Unable to fetch role');
      }
    } catch (error) {
      console.error('Error fetching role:', error);
      throw error; // Re-throw the error to handle it in the login flow
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}employees/login/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const result = await response.json();
      console.log(result);

      if (result.status === 'success') {
        setMessage(result.message); // Display success message

        // Fetch the user's role
        const role = await fetchUserRole(username);

        // Store username and role in localStorage
        localStorage.setItem('username', username);
        localStorage.setItem('role', role);

        // Navigate to the dashboard
        setTimeout(() => {
          navigate('/dashboard');
        }, 1000); // Optional: Add a delay before navigating
      } else {
        setMessage(result.message); // Display error message
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div className='background-div1'>
      <div className='login'>
        <div className='main1'>
          <h1>Login</h1>
          <form onSubmit={handleLogin}>
            <div className='input1'>
              <label className='label1'>Username:</label>
              <input
                htmlFor='username'
                className='input-field'
                placeholder='Enter Your User-ID'
                required
                type='text'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className='input2'>
              <label className='label2'>Password:</label>
              <input
                type='password'
                htmlFor='password'
                className='input-field'
                placeholder='Password'
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className='forget-link'>
              <Link to={'/forget'}>Forget Password</Link>
            </div>
            <button className='submit' type='submit'>
              Submit
            </button>
          </form>
          {message && (
            <div
              className={`message ${
                message === 'Login successful.' ? 'success' : 'error'
              }`}
            >
              {message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
