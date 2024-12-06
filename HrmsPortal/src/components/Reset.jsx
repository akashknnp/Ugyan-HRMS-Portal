import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RiInformation2Line, RiEyeLine, RiEyeOffLine } from "react-icons/ri";
import logo from "../assets/ugyan.png";
import { useLocation } from 'react-router-dom';

const Test = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [ishover, setishover] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const email = location.state?.email;
  const otp = location.state?.otp;

  const handlePasswordReset = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/employees/change-password/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp, new_password: password }),
      });

      const result = await response.json();
      if (result.status === 'success') {
        setSuccessMessage(result.message);
        setErrorMessage('');
        setTimeout(() => navigate('/'), 2000);
      } else {
        setErrorMessage(result.message);
        setSuccessMessage('');
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('Failed to reset password. Please try again.');
      setSuccessMessage('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validatePassword()) {
      handlePasswordReset();
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
              <div className="password-field-wrapper">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="toggle-password-button"
                >
                  {showPassword ? <RiEyeOffLine /> : <RiEyeLine />}
                </button>
              </div>
            </div>

            <div className="pwd-reset">
              <label>Confirm Password:</label>
              <div className="password-field-wrapper">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="re-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  placeholder="Re-enter password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="toggle-password-button"
                >
                  {showConfirmPassword ? <RiEyeOffLine /> : <RiEyeLine />}
                </button>
              </div>
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
