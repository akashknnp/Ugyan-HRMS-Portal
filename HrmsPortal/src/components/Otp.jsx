import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import logo from "../assets/ugyan.png"

const Otp = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email; 

  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState(''); 
  const [isError, setIsError] = useState(false); 
  const [isResending, setIsResending] = useState(false); 

  const handleOtpVerification = async (e) => {
    e.preventDefault();

    if (otp.length !== 6 || !/^\d+$/.test(otp)) {
      setMessage('OTP must be a 6-digit number.');
      setIsError(true);
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/employees/verify-otp/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp }),
      });

      const result = await response.json();

      if (result.status === 'success') {
        setMessage(result.message); 
        setIsError(false);

        setTimeout(() => {
          navigate('/reset', { state: { email, otp } });
        }, 2000);
      } else {
        setMessage(result.message); 
        setIsError(true);
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('OTP verification failed. Please try again.');
      setIsError(true);
    }
  };

  const handleResendOtp = async () => {
    setIsResending(true); 
    setMessage(''); 

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}employees/new-joiners/employees/resend-otp/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();

      if (result.status === 'success') {
        setMessage('A new OTP has been sent to your email.');
        setIsError(false);
      } else {
        setMessage(result.message || 'Failed to resend OTP.');
        setIsError(true);
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('Error occurred while resending OTP. Please try again.');
      setIsError(true);
    } finally {
      setIsResending(false); 
    }
  };


  return (
    <div className='background-div1'>
    <div className='Otp'>
      
      <div className='otp verify'>
      <div>
      {/* <img src={logo}className='logo-bg bg-white ml-2'></img> */}
        <h1 className='otp-heading'>OTP Verification</h1></div>
        <form onSubmit={handleOtpVerification}>
          <div className='text1'>
            <label className='l1'>Email:</label>
            <input type='email' value={email} className='input-field1' required />
          </div>
          <div className='text2'>
            <label className='l2'>OTP:</label>
            <input  type='text'
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className='input-field1'
              required
              maxLength={6}
              pattern='\d{6}' />
          </div>
          <div className={`message ${isError ? 'error' : 'success'}`}>
              {message}
            </div>
          <button className='Submit' type='submit'>Submit</button>
        </form>
        {/* <div className="generated-otp">
          <strong>Generated OTP:</strong> {generatedOtp}
        </div> */}
        <button
          onClick={handleResendOtp}
          className='resend-button'
          type='button'
          disabled={isResending}
        >
          {isResending ? 'Resending...' : 'Resend OTP'}
        </button>
      </div>
    </div>
    </div>
  );
};

export default Otp;







