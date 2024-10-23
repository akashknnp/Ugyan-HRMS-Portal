import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RiInformation2Line } from "react-icons/ri";
import logo from "../assets/ugyan.png";

const Reset = () => {
  const navigate = useNavigate();

  const [ishover, setishover] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validatePassword()) {
      setSuccessMessage('Passwords match and contain special characters!');
      setErrorMessage('');
      navigate('/logout');
    }
  };

  const validatePassword = () => {
    const specialCharRegex = /[@#!_]/;
    const nonSpecialChar = /[$%^&*(),.?":{}|<>]/; // Exclude these special characters
    const digitRegex = /\d/;
    const upperCaseRegex = /[A-Z]/;

    if (!password || !confirmPassword) {
      setErrorMessage('Please enter both passwords');
      return false;
    }

    if (!specialCharRegex.test(password)) {
      setErrorMessage('Password must contain at least one special character (@, #, !, _).');
      return false;
    }

    if (nonSpecialChar.test(password)) {
      setErrorMessage('Password must only contain the special characters (@, #, !, _).');
      return false;
    }

    if (!digitRegex.test(password)) {
      setErrorMessage('Password must contain at least one digit.');
      return false;
    }

    if (!upperCaseRegex.test(password)) {
      setErrorMessage('Password must contain at least one uppercase letter.');
      return false;
    }

    if (password.length < 8) {
      setErrorMessage('Password must be at least 8 characters long.');
      return false;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return false;
    }

    return true;
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleMouseEnter = () => {
    setishover(true);
  };

  const handleMouseLeave = () => {
    setishover(false);
  };

  return (
    <div>
      <div className='background-div1'>
        <div className='reset-main'>
          <div className='flex'>
            {/* <img src={logo} className='logo-bg bg-white ml-2' alt='logo'></img> */}
            <h1 className='font-semibold tracking-wider text-black text-5xl'>Reset Password</h1>
          </div>
          <div className='reset-inner-main flex flex-col'>
            <form onSubmit={handleSubmit}>
              <div className='pwd'>
                <div className='flex gap-x-3'>
                  <label htmlFor='password'> New Password : </label>
                  <div 
                    className='w-1/12 mt-1.5 ml-1'
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    <RiInformation2Line />
                    {/* Pop-up message */}
                    {ishover && (
                      <div className="absolute bg-gray-300 text-black px-4 py-2 font-semibold rounded-md shadow-md">
                        Kindly include at least one uppercase letter, digit, and special characters (@, #, !, _).
                      </div>
                    )}
                  </div>
                </div>
                <input 
                  type="password" 
                  name="password" 
                  value={password} 
                  onChange={handlePasswordChange} 
                  required 
                  placeholder='Password'
                />
              </div>

              <div className='pwd mt-4'>
                <label>Confirm password : </label>
                <input 
                  type="password" 
                  name="re-password" 
                  value={confirmPassword} 
                  onChange={handleConfirmPasswordChange} 
                  required 
                  placeholder='Re-enter password'
                />
              </div>
              
              <div>
                <button className='submit-button font-semibold text-white px-4 py-2 rounded-md w-full'>
                  Submit
                </button>
              </div>
            </form>

            <div className='mt-10'>
              {errorMessage && (
                <div className="popup-message bg-red-100 text-red-700 px-4 py-2 font-mono rounded-md shadow-md mt-4">
                  {errorMessage}
                </div>
              )}
              {successMessage && (
                <div className="popup-message bg-green-100 text-green-700 px-4 py-2 rounded-md shadow-md mt-4">
                  {successMessage}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reset;
