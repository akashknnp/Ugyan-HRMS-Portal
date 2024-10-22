import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Reset = () => {
  const navigate = useNavigate();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validatePassword()) {
      setSuccessMessage('Passwords match and contain special characters!');
      setErrorMessage('');
      alert('Passwords match and contain special characters!');
      navigate('/logout');  // Only navigate when validation is successful
    }
  };

  const validatePassword = () => {
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;

    if (!password || !confirmPassword) {
      setErrorMessage('Please enter both passwords');
      return false;
    }

    if (!specialCharRegex.test(password)) {
      setErrorMessage('Password must contain at least one special character.');
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
    const newPwd = e.target.value;
    setPassword(newPwd);
  };

  const handleConfirmPasswordChange = (e) => {
    const newCpwd = e.target.value;
    setConfirmPassword(newCpwd);
  };

  return (
    <div>
      <div className='reset-main shadow-xl'>
        <h1 className='font-semibold tracking-wider '>Reset Password</h1>
        <div className='reset-inner-main flex flex-col'>
          <form onSubmit={handleSubmit}>
            <div className='pwd'>
              <label htmlFor='password'> New Password :</label>
              <input type="password" name="password" value={password} onChange={handlePasswordChange} required/>
            </div>
            <div className='pwd mt-4'>
              <label>Re-enter password : </label>
              <input type="password" name="re-password" value={confirmPassword} onChange={handleConfirmPasswordChange} required />
            </div>
            <div>
              <button className=' submit-button font-semibold  text-white px-4 py-2 rounded-md w-full '>Submit</button>
            </div>
          </form>
          <div className='mt-5'>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reset;
