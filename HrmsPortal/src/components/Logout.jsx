import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react'; // For navigation after logout
import "../Logout.css";

const Logout = () => {
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate("/dashboard"); // For navigation to login or home page after logout

  const handleLogout = () => {
    // Show confirmation popup
    setShowPopup(true);
  };

  const confirmLogout = () => {
    // Clear session storage and localStorage
    localStorage.removeItem('userRole');        // Remove user role
    localStorage.removeItem('userDetails');     // Remove user details
    localStorage.removeItem('lastActive');  
    localStorage.removeItem('loginFlag')    // Remove last active time
    sessionStorage.clear();                     // Clear sessionStorage if you're using it
    console.log("User logged out successfully");

    // Redirect user to login page (or home page)
    navigate('/logout1');  // Assuming you want to redirect to a login page
  };

  const cancelLogout = () => {
    // Close the popup without logging out
    setShowPopup(false);
  };

  const [userName, setUserName] = useState('');

useEffect(() => {
  
  const storedUserDetails = localStorage.getItem('userDetails');

  if (storedUserDetails) {
    const userDetails = JSON.parse(storedUserDetails); // Parse userDetails from JSON
    if (userDetails && userDetails.first_name) {
      setUserName(userDetails.first_name); // Update the userName with the name from userDetails
    }
  }
}, []);
  return (
    <div className='background-div'>
      <button className="logout-btn" onClick={handleLogout}>Log Out</button>

      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <p>{userName}, do you want to sign out?</p>
            <button onClick={confirmLogout}>Yes, Log out</button>
            <button onClick={cancelLogout}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Logout;
