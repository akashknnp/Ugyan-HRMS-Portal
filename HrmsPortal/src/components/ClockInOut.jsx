import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import "../ClockInOut.css";
import { GiHamburgerMenu } from "react-icons/gi";  
import { useEffect } from 'react';
import { CgProfile } from "react-icons/cg";
import logo from "../assets/UGYAN1.png";
import logo1 from "../assets/ugyanlogoo.jpg"
import { Link } from 'react-router-dom';

const ClockInOutData = () => {

 const [userName, setUserName] = useState('');useEffect(() => {
        const storedUserDetails = localStorage.getItem('userDetails');
        if (storedUserDetails) {
          const userDetails = JSON.parse(storedUserDetails); // Parse userDetails from JSON
          if (userDetails && userDetails.first_name) {
            setUserName(userDetails.first_name); // Update the userName with the name from userDetails
          }
        }
      }, []);



    const gotoprofile = (event) => {
        event.preventDefault();  
        navigate('/Dashboard');
    }

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Toggle mobile menu
    const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);


  const [employeeId, setEmployeeId] = useState('');
  const [clockData, setClockData] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  // Function to handle form submission and fetch data
  const fetchClockInOutData = async () => {
    setErrorMessage(''); // Reset error message
    if (!employeeId) {
      setErrorMessage('Employee ID is required.');
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}dashboard/clock-in-out/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ E_id: employeeId }), // Send the employee ID in the request body
      });

      if (!response.ok) {
        const errorData = await response.json();
        setErrorMessage(errorData.error || 'An error occurred');
        return;
      }

      // Get the response data (clock-in/out data)
      const data = await response.json();
      setClockData(data);  // Set the clock data into state
    } catch (error) {
      // Handle any error from the API
      setErrorMessage('Network error, please try again.');
    }
  };
  const navigate =useNavigate();
  const gotohome=()=>{ 
    navigate("/dashboard") 
  }

  return (
    <div className='background-in-out'>
      <div className='header-clockinout'>
            
            <img src={logo}className='logo'></img> 
            <img src={logo1}className='logo1-mobile'></img> 
                
                <div>
                <h1 className='title-bar-clockinout'><Link to="/dashboard">Home</Link></h1>
            </div>
            <div>
                <p className='title-bar-clockinout'><Link to="/about">About</Link></p>
            </div>
            <div>
                <p className='title-bar-clockinout'><Link to="/flowchart">Designation</Link></p>
            </div>
            <div>
            <p className='title-bar-dashboard'><Link to="/clock-in-out">Clock-In/Out</Link></p>
            </div>
            <div>
                <p className='title-bar-dashboard-profile' onClick={gotoprofile}><CgProfile className='profile-icon-dashboard'/></p>
                <p className="login-user-name-profile">Hi {userName}</p>
            </div>
            <div className="mobile-menu-icon-clockinout" onClick={toggleMobileMenu}>
                <GiHamburgerMenu />
            </div>
            </div>
      <h2>Clock In/Out Data</h2>

      {/* Employee ID Input */}
      <div className='in-out-search'>
        <label>Search by Employee ID:</label>
        <input
          type="text"
          value={employeeId}
          onChange={(e) => setEmployeeId(e.target.value)}
          placeholder="Search Clock-in-out by Employee ID"
        />
      </div>

      <button onClick={fetchClockInOutData} className='in-out-check'>Get Clock-In/Out Data</button>

      <button onClick={gotohome} className='back-in-out'>Back</button>

      {/* Display Error Message if any */}
      {errorMessage && <p className='in-out-error-message'>{errorMessage}</p>}

      {/* Display Clock In/Out Data */}
      {clockData.length > 0 && (
        <table className="table-in-out">
        <thead className="thead-in-out">
          <tr className="tr-in-out">
            <th className="th-in-out">Date</th>
            <th className="th-in-out">Login Time</th>
            <th className="th-in-out">Logout Time</th>
            <th className="th-in-out">Shift End Time</th>
            <th className="th-in-out">Login Attempts</th>
            <th className="th-in-out">Reset Attempts</th>
          </tr>
        </thead>
        <tbody className="tbody-in-out">
          {clockData.map((record, index) => (
            <tr className="tr-in-out" key={index}>
              <td className="td-in-out">{record.date}</td>
              <td className="td-in-out">{record.login_time}</td>
              <td className="td-in-out">{record.logout_time || '-'}</td>
              <td className="td-in-out">{record.shift_end_time || '-'}</td>
              <td className="td-in-out">{record.login_attempts}</td>
              <td className="td-in-out">{record.reset_attempts}</td>
            </tr>
          ))}
        </tbody>
      </table>
      
      )}
    </div>
  );
};

export default ClockInOutData;
