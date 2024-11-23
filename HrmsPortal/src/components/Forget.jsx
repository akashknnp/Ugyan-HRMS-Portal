import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Forget = () => {
  const navigate = useNavigate();
  const [email1, setEmail1] = useState('');
  const [popupMessage, setPopupMessage] = useState('');  // State for pop-up message
  const [showPopup, setShowPopup] = useState(false); 
  const [message, setMessage] = useState(''); // State for both error and success messages
  const [isError, setIsError] = useState(false); // Track if the message is an error

  // Email validation function
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleButtonClick = async (event) => {
    event.preventDefault();

    // Validate email input
    if (!email1) {
      setMessage('Please enter your email address.');
      setIsError(true);
      // setShowPopup(true);
      // setPopupMessage('Please enter your email address.');
      return;
    }

    if (!validateEmail(email1)) {
      setMessage('Please enter a valid email address.');
      setIsError(true);
      // setShowPopup(true);
      // setPopupMessage('Please enter a valid email address.');
      return;
    }

    // If validation passes, make the API call
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/employees/verify-email/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email1 }),
      });

      const result = await response.json();

      if (result.status === 'success') {
        setMessage(result.message); // Set success message
        setIsError(false);
        // setShowPopup(true);
        // setPopupMessage(result.message);

        // Delay navigation for 2 seconds to show the success message
        setTimeout(() => {
          navigate('/otp', { state: { email: email1 } });
        }, 2000);
      } else {
        setMessage(result.message); // Set error message
        setIsError(true);
        setShowPopup(true);
        setPopupMessage(result.message);
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('Failed to send OTP. Please try again.');
      setIsError(true);
      // setShowPopup(true);
      // setPopupMessage('Failed to send OTP. Please try again.');
    }
  };

  const handleButtonCancel = () => {
    navigate('/');
  };

  const handleEmailChange = (event) => {
    setEmail1(event.target.value);
    setMessage(''); // Clear the message when modifying input
  };

  return (
    <div className='background-div1'>
      <div className='forget-main'>
        <div className='forget'>
          <h1>Find Your Account</h1>
          <p>Please enter your email address to search for your account.</p>
          <form>
            <input 
              type='email' 
              name='mail' 
              placeholder='Email address' 
              value={email1} 
              onChange={handleEmailChange}
              required
            /><div className={`message ${isError ? 'error' : 'success'}`}>
            {message}
          </div>
            <div className='forget-button'>
              <button onClick={handleButtonCancel} className="cancel-button" type='button'>Cancel</button>
              <button onClick={handleButtonClick} className="search-button" type='submit'>Search</button>
            </div>
          </form>
          {/* Pop-up message */}
          {/* {showPopup && (
            <div className={`popup-message ${isError ? 'error' : 'success'}`}>
              {popupMessage}
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
};

export default Forget;
