import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Forget = () => {
  const navigate = useNavigate();
  const [email1, setEmail1] = useState('');

  // Email validation function
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleButtonClick = (event) => {
    event.preventDefault();

    // Check if email is not empty and valid
    if (!email1) {
      alert('Please enter your email address.');
    } else if (!validateEmail(email1)) {
      alert('Please enter a valid email address.');
    } else {
      navigate('/otp', { state: { email1 } });
    }
  };

  const handleButtonCancel = (event) => {
    event.preventDefault();
    navigate('/');
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const handleEmailChange = (event) => {
    setEmail1(event.target.value);
  };

  return (
    <div className='forget-main'>
      <div className='forget'>
        <h1>Find Your Account</h1>
        <p>Please enter your email address to search for your account.</p>
        <form onSubmit={handleSubmit}>
          <input 
            type='email' 
            name='mail' 
            placeholder='Email address' 
            value={email1} 
            onChange={handleEmailChange}
            required
          />
          <div className='forget-button'>
            <button onClick={handleButtonCancel} className="cancel-button" type='button'>Cancel</button>
            <button onClick={handleButtonClick} className="search-button" type='submit'>Search</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Forget;
