import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../Session.css";

const SessionHandler = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalTimeout, setModalTimeout] = useState(null);
  const [showNotification, setShowNotification] = useState(false); // For popup notifications

  const handleExtendSession = () => {
    const newLastActive = new Date().getTime();
    localStorage.setItem('lastActive', newLastActive.toString());
    setMessage('Session extended.');
    setShowNotification(true);
    setShowModal(false);

    clearTimeout(modalTimeout); // Clear the timeout for forced logout

    // Hide notification after 3 seconds
    setTimeout(() => setShowNotification(false), 3000);
  };

  const handleLogout = () => {
    localStorage.clear(); // Clear local storage
    setMessage(''); // Clear message
    setShowNotification(false); // Ensure no lingering notifications
    setShowModal(false); // Hide the modal
    navigate('/logout1'); // Navigate to logout page
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const lastActive = localStorage.getItem('lastActive');
      const now = new Date().getTime();

      if (lastActive) {
        const timeLeft = 30 * 60 * 1000 - (now - parseInt(lastActive)); // 1 minute

        if (timeLeft <= 10 * 1000 && !showModal) { // 10 seconds before expiration
          setShowModal(true);
          const timeout = setTimeout(() => {
            handleLogout(); // Auto-logout after 10 seconds if no response
          }, 10 * 1000); // 10 seconds
          setModalTimeout(timeout);
        } else if (timeLeft <= 0) {
          clearTimeout(modalTimeout); // Ensure no duplicate logout
          handleLogout();
        }
      }
    }, 1000);

    return () => {
      clearInterval(interval);
      clearTimeout(modalTimeout); // Cleanup timeout on unmount
    };
  }, [navigate, showModal, modalTimeout]);

  return (
    <>
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <p>Your session is about to expire. Do you want to stay logged in?</p>
            <button onClick={handleExtendSession}>Yes, Extend</button>
            <button onClick={handleLogout}>No, Logout</button>
          </div>
        </div>
      )}
      {showNotification && ( // Show notification only when active
        <div className="popup-notification">
          <p>{message}</p>
        </div>
      )}
    </>
  );
};

export default SessionHandler;
