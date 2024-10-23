import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import logo from "../assets/ugyan.png"

const Otp = () => {
  const location = useLocation();
  const navigate1 = useNavigate();
  const { email1 } = location.state || {};

  const [otp, setOtp] = useState('');
  const [email, setEmail] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [error, setError] = useState('');

  const generateOtp = () => {
    const otp = Math.floor(100000 + Math.random() * 9000).toString(); 
    setGeneratedOtp(otp);
  };

  useEffect(() => {
    generateOtp(); 
  }, []);

  const handleInputChange = (e) => {
    setOtp(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleButtonClick = (e) => {  
    e.preventDefault();

    if (otp.length !== 6) {
      setError('OTP must be 6 digits long.');
      return;
    }

    if (otp === generatedOtp) {
      setError('');
      navigate1('/reset')
      
    } else {
      setError('Incorrect OTP. Please try again.');
    }
  };

  return (
    <div className='background-div1'>
    <div className='Otp'>
      
      <div className='otp verify'>
      <div className='flex gap-1'>
      {/* <img src={logo}className='logo-bg bg-white ml-2'></img> */}
        <h1>OTP Verification</h1></div>
        <form onSubmit={handleButtonClick}>
          <div className='text1'>
            <label className='l1'>Email:</label>
            <input type='email' value={email1} onChange={handleEmailChange} className='input-field1' required />
          </div>
          <div className='text2'>
            <label className='l2'>OTP:</label>
            <input type='text' value={otp} onChange={handleInputChange} className='input-field1' required maxLength={6} pattern="\d{6}" />
          </div>
          {error && <div className="popup-message bg-red-200 text-red-700 px-4 py-2 rounded-md shadow-md mt-4">{error}</div>}
          <button className='Submit' type='submit'>Submit</button>
        </form>
        <div className="generated-otp">
          <strong>Generated OTP:</strong> {generatedOtp}
        </div>
      </div>
    </div>
    </div>
  );
};

export default Otp;







