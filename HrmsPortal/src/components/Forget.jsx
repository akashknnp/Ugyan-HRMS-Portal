import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Forget = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  const handleButtonClick = (event) => {
    event.preventDefault();  
    if (email) {
      navigate('/otp');
    } else {
      alert('Please enter your email address.');
    }
  }

  const handleButtonCancel = (event) => {
    event.preventDefault();
    navigate('/');
  }

  const handleSubmit = (event) => {
    event.preventDefault();
  }

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  }

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
            value={email} 
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
