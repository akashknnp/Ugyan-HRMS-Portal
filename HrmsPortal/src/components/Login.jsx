import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import forget from '../components/Forget'
import logo from "../assets/ugyan.png"
import { useState } from 'react'

const Login = () => {
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(''); 

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
        setTimeout(() => {
          navigate('/dashboard'); // Redirect after a short delay
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
            {/* <div className='login-text text-center bg-slate-400'>
             <h1 className='absolute text-white text-5xl '>Welcome to UGYAN Eductech</h1></div> */}
        <div className='login'>  
            <div className='main1'>
                <h1>Login</h1>
                <form onSubmit={handleLogin}>
                    <div className='input1'>
                        <label className='label1'>Username:</label>
                        <input  htmlFor='username' className='input-field' placeholder='Enter Your User-ID' required type="text"
        
                
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                />
                    </div>
                    <div className='input2'>
                        <label className='label2'>Password:</label>
                        <input type='password' htmlFor='password' className='input-field' placeholder='Password' required
                
                
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
                    </div>
                    <div className='forget-link'><Link to={'/forget'}>Forget Password</Link></div>
                    <button className='submit' type='submit'>Submit</button>
                    
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
    )
}

export default Login;
