import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from "../assets/ugyan.png"

const Forget = () => {
  const navigate = useNavigate();
  const [email1, setEmail1] = useState('');
  const [popupMessage, setPopupMessage] = useState('');  // State for pop-up message
  const [showPopup, setShowPopup] = useState(false);     // State to show/hide pop-up

  // Email validation function
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleButtonClick = (event) => {
    event.preventDefault();

    // Check if email is not empty and valid
    if (!email1) {
      setPopupMessage('Please enter your email address.');
      setShowPopup(true);
    } else if (!validateEmail(email1)) {
      setPopupMessage('Please enter a valid email address.');
      setShowPopup(true);
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
    setShowPopup(false); // Hide pop-up on input change
  };

  return (
    <div className='background-div1'>
    <div className='forget-main'>
      <div className='forget'>
        <div className='flex space-x-2'>
          {/* <img src={logo}className='logo-bg bg-white '></img> */}
          <h1>Find Your Account</h1>
        </div>
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
        {/* Pop-up message */}
        {showPopup && (
          <div className="popup-message bg-red-200 text-red-700 px-4 py-2 rounded-md shadow-md mt-4">
            {popupMessage}
          </div>
        )}
      </div>
    </div>
    </div>
  );
}

export default Forget;
