import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Otp = () => {
const navigate1 = useNavigate();

  const [otp, setOtp] = useState('');
  const [email, setEmail] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [error, setError] = useState('');

  const generateOtp = () => {
    const otp = Math.floor(1000 + Math.random() * 9000).toString(); 
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

    if (otp.length !== 4) {
      setError('OTP must be 4 digits long.');
      return;
    }

    if (otp === generatedOtp) {
      setError('');
      alert('OTP verified successfully!');
      
      
    } else {
      setError('Incorrect OTP. Please try again.');
    }
  };

  return (
    <div className='Otp'>
      <div className='otp verify'>
        <h1>OTP Verification</h1>
        <form onSubmit={handleButtonClick}>
          <div className='text1'>
            <label className='l1'>Email:</label>
            <input type='email' value={email} onChange={handleEmailChange} className='input-field' required />
          </div>
          <div className='text2'>
            <label className='l2'>OTP:</label>
            <input type='text' value={otp} onChange={handleInputChange} className='input-field' required maxLength={4} pattern="\d{4}" />
          </div>
          {error && <div className="error">{error}</div>}
          <button className='Submit' type='submit'>Submit</button>
        </form>
        <div className="generated-otp">
          <strong>Generated OTP:</strong> {generatedOtp}
        </div>
      </div>
    </div>
  );
};

export default Otp;






   
   
     