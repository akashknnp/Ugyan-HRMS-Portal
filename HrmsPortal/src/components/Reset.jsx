import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RiInformation2Line } from "react-icons/ri";
import logo from "../assets/ugyan.png";
 // Import the new CSS file

const Test = () => {
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
    const nonSpecialChar = /[$%^&*(),.?":{}|<>]/;
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
    <div className="background-div1-reset">
      <div className="reset-main-reset">
        <div className="header-reset">
          <h1>Reset Password</h1>
        </div>
        <div className="reset-inner-main-reset">
          <form onSubmit={handleSubmit}>
            <div className="pwd-reset">
              <label htmlFor="password">New Password:</label>
              <div
                className="info-icon-reset"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <RiInformation2Line />
                {ishover && (
                  <div className="info-popup-reset">
                    Kindly include at least one uppercase letter, digit, and special characters (@, #, !, _).
                  </div>
                )}
              </div>
              <input
                type="password"
                name="password"
                value={password}
                onChange={handlePasswordChange}
                required
                placeholder="Password"
              />
            </div>

            <div className="pwd-reset">
              <label>Confirm Password:</label>
              <input
                type="password"
                name="re-password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                required
                placeholder="Re-enter password"
              />
            </div>

            <button className="submit-button-reset" type="submit">Submit</button>
          </form>

          <div className="messages-reset">
            {errorMessage && (
              <div className="popup-message-reset error-reset">
                {errorMessage}
              </div>
            )}
            {successMessage && (
              <div className="popup-message-reset success-reset">
                {successMessage}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Test;
