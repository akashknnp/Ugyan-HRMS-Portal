import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
// import logo from "../assets/ugyanlogobg_enhanced-transformed.png";
import logo from "../assets/UGYAN1.png";
import logo1 from "../assets/ugyanlogoo.jpg"
import { MdPerson } from "react-icons/md";
import { IoIosPeople } from "react-icons/io";
import { SlCalender } from "react-icons/sl";
import { FaMoneyCheckDollar } from "react-icons/fa6";
import { GrDocumentPerformance } from "react-icons/gr";
import { FaRegFileAlt } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { CgLogOut } from "react-icons/cg";
import { BiCalendarExclamation } from "react-icons/bi";
import { GiHamburgerMenu } from "react-icons/gi";  
import "../Requests.css";
import { CgProfile } from "react-icons/cg";

const Requests = () => {
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

  const navigate1 = new useNavigate();
    useEffect(() => {
      // Check the login status from localStorage
      const loginFlag = localStorage.getItem("loginFlag");
  
      // If the loginFlag is not set or false, redirect to the login page
      console.log("login flag in dashboard",loginFlag)
      if (loginFlag=="false") {
        navigate1('/logout1');
      }
    }, [navigate1]); 
  const location = useLocation();
  const navigate = useNavigate();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [requests, setRequests] = useState([]);

  // Fetch leave requests from backend
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}leave/get-leaves/`);
        if (response.ok) {
          const data = await response.json();
  
          // Check the fetched data
          console.log("Fetched Data: ", data);
  
          // Sort requests by start_date in descending order (latest first)
          const sortedRequests = data.sort((a, b) => {
            const dateA = new Date(a.start_date);
            const dateB = new Date(b.start_date);
  
            // Log dates to verify they are being parsed correctly
            console.log(`Comparing: ${dateA} vs ${dateB}`);
  
            return dateB - dateA;  // Sorting in descending order
          });
  
          // Check the sorted data
          console.log("Sorted Requests: ", sortedRequests);
  
          setRequests(sortedRequests);
        } else {
          console.error('Failed to fetch leave requests');
        }
      } catch (error) {
        console.error('Error fetching leave requests:', error);
      }
    };
  
    fetchRequests();
  }, []);

  const handleUpdate = (requestId) => {
    // Navigate to the Update page with the requestId
    navigate(`/UpdateRequest/${requestId}`);
  };

  // Handle delete button click
  const handleDelete = (requestId) => {
    // Make a DELETE request to the backend to remove the leave request
    fetch(`${import.meta.env.VITE_API_URL}leave/delete-leave/${requestId}/`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          // Update the state to remove the deleted request from the list
          setRequests(requests.filter((request) => request.id !== requestId));
        } else {
          console.error('Failed to delete leave request');
        }
      })
      .catch((error) => {
        console.error('Error deleting leave request:', error);
      });
  };

  // Add request button handler
  const handleButtonClick = (event) => {
    event.preventDefault();
    navigate('/AddRequest');
  };
  const gotoprofile = (event) => {
    event.preventDefault();  
    navigate('/profile');
}

  // Toggle mobile menu
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <div className='outer-request'>
      <div className='header-request'>
      <img src={logo}className='logo'></img> 
      <img src={logo1}className='logo1-mobile'></img>
        <div><h1 className='title-bar-request'><Link to="/dashboard">Home</Link></h1></div>
        <div><p className='title-bar-request'><Link to="/about">About</Link></p></div>
        <div><p className='title-bar-request'><Link to="/flowchart">Designation</Link></p></div>
        <div><p className='title-bar-request'><Link to="/clock-in-out">Clock-In/Out</Link></p></div>
        <div>
            <p className='title-bar-dashboard-profile' onClick={gotoprofile}><CgProfile className='profile-icon-dashboard'/></p>
            <p className="login-user-name-profile">Hi {userName}</p>
        </div>
        <div className="mobile-menu-icon-request" onClick={toggleMobileMenu}>
          <GiHamburgerMenu />
        </div>
      </div>
      <div className='main-request'>
        <div className='side-bar-request'>
          <Link to="/employee"><div><h3 className='features-request'><MdPerson className='dash-request' />Employee</h3></div></Link>
          <Link to="/recruitment"><div><h3 className='features-request'><IoIosPeople className='dash-request' />Recruitment</h3></div></Link>
          <Link to="/calender"><div><h3 className='features-request'><SlCalender className='dash-request' />Calendar</h3></div></Link>
          <Link to="/payroll"><div><h3 className='features-request'><FaMoneyCheckDollar className='dash-request' />Payroll</h3></div></Link>
          <Link to="/timeoff"><div><h3 className='features-request'><BiCalendarExclamation className='dash-request' />Time off</h3></div></Link>
          <Link to="/performance"><div><h3 className='features-request'><GrDocumentPerformance className='dash-request' />Performance</h3></div></Link>
          <Link to="/communication"><div><h3 className='features-request'><FaRegFileAlt className='dash-request' />Communication</h3></div></Link>
          <Link to="/settings"><div><h3 className='features-request'><IoSettingsOutline className='dash-request' />Settings</h3></div></Link>
          <Link to="/logout"><div><h3 className='features-request'><CgLogOut className='dash-request' />Logout</h3></div></Link>
        </div>
        {isMobileMenuOpen && (
          <div className="mobile-dropdown-request">
            <Link to="/employee" onClick={() => setIsMobileMenuOpen(false)}>Employee</Link>
            <Link to="/recruitment" onClick={() => setIsMobileMenuOpen(false)}>Recruitment</Link>
            <Link to="/calender" onClick={() => setIsMobileMenuOpen(false)}>Calendar</Link>
            <Link to="/payroll" onClick={() => setIsMobileMenuOpen(false)}>Payroll</Link>
            <Link to="/timeoff" onClick={() => setIsMobileMenuOpen(false)}>Time off</Link>
            <Link to="/performance" onClick={() => setIsMobileMenuOpen(false)}>Performance</Link>
            <Link to="/communication" onClick={() => setIsMobileMenuOpen(false)}>Communication</Link>
            <Link to="/settings" onClick={() => setIsMobileMenuOpen(false)}>Settings</Link>
            <Link to="/logout" onClick={() => setIsMobileMenuOpen(false)}>Logout</Link>
          </div>
        )}
        <div className='menu-request'>
          <div className='leave-request'>
            {/* Table to display leave requests */}
            {requests.length > 0 ? (
            <div className="table-container">
              <table className="leave-table">
                <thead>
                  <tr>
                    <th>Type</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Email</th>
                    <th>Reason</th>
                    <th>Actions</th> {/* New column for actions */}
                  </tr>
                </thead>
                <tbody>
                  {requests.map((request) => (
                    <tr key={request.id}>
                      <td>{request.leave_type}</td>
                      <td>{request.start_date}</td>
                      <td>{request.end_date}</td>
                      <td>{request.email}</td>
                      <td>{request.reason}</td>
                      <td>
                        {/* Update and Delete buttons */}
                        <button onClick={() => handleUpdate(request.id)} className="update-btn">Update</button>
                        <button onClick={() => handleDelete(request.id)} className="delete-btn">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className='no-requests'>No leave requests available.</p>
          )}
          </div>
          <button onClick={handleButtonClick} className='add-request'>Add Request</button>
        </div>
      </div>
    </div>
  );
};

export default Requests;
