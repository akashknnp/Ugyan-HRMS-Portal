import React from 'react'
import { TfiDashboard } from "react-icons/tfi";
import { IoPeopleOutline } from "react-icons/io5";
import { BiCategory } from "react-icons/bi";
import { IoLogOutOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom'
import logo from "../assets/UGYAN1.png";
import logo1 from "../assets/ugyanlogoo.jpg"
// import logo from "../assets/ugyanlogobg.png"
// import logo from "../assets/ugyanlogobg_enhanced-transformed.png";
import { Link } from 'react-router-dom';
import { BsFillPinAngleFill } from "react-icons/bs";
import { CiMenuKebab } from "react-icons/ci";
import { TbLayoutDashboardFilled } from "react-icons/tb";
import { MdPerson } from "react-icons/md";
import { IoIosPeople } from "react-icons/io";
import { SlCalender } from "react-icons/sl";
import { FaMoneyCheckDollar } from "react-icons/fa6";
import { MdContacts } from "react-icons/md";
import { GrDocumentPerformance } from "react-icons/gr";
import { FaRegFileAlt } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { CgLogOut } from "react-icons/cg";
import { BiCalendarExclamation } from "react-icons/bi";
import { GiHamburgerMenu } from "react-icons/gi";  
import { useState,useEffect } from 'react';
import { CgProfile } from "react-icons/cg";
import axios from 'axios';
import "../Balance.css";


const Balance = () => {

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


    const navigate = useNavigate();

    const gotoprofile = (event) => {
        event.preventDefault();  
        navigate('/profile');
    }

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Toggle mobile menu
    const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

    const [leaveBalances, setLeaveBalances] = useState([]);
    const [message, setMessage] = useState('');
  
    const fetchLeaveBalances = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}leave/get-balance/`, // API endpoint for fetching leave balances
          { headers: { 'Content-Type': 'application/json' } }
        );
        setLeaveBalances(response.data);
      } catch (error) {
        setMessage(error.response?.data?.message || 'An error occurred while fetching leave balances.');
      }
    };
  
    useEffect(() => {
      fetchLeaveBalances();
    }, []);

    return (
    <div className='outer-balance'>
        <div className='header-balance'>
            
        <img src={logo}className='logo'></img> 
        <img src={logo1}className='logo1-mobile'></img> 
            
            <div>
            <h1 className='title-bar-balance'><Link to="/dashboard">Home</Link></h1>
        </div>
        <div>
            <p className='title-bar-balance'><Link to="/about">About</Link></p>
        </div>
        <div>
            <p className='title-bar-balance'><Link to="/flowchart">Designation</Link></p>
        </div>
        <div>
            <p className='title-bar-balance'><Link to="/clock-in-out">Clock-In/Out</Link></p>
        </div>
        <div>
            <p className='title-bar-dashboard-profile' onClick={gotoprofile}><CgProfile className='profile-icon-dashboard'/></p>
            <p className="login-user-name-profile">Hi {userName}</p>
        </div>
        <div className="mobile-menu-icon-balance" onClick={toggleMobileMenu}>
            <GiHamburgerMenu />
        </div>
        </div>
        
        <div className='main-balance'>
            <div className='side-bar-balance'>
                {/* <h3 className='text-white text-6xl text-center bg-gradient-to-tl from-black to-slate-400 p-4'><img src={logo}className='bg-white'></img> */}
                {/* <Link to="/dashboard"> <div><h3 className='features-payroll'><TbLayoutDashboardFilled className='dash-payroll'/>Dashboard</h3></div></Link> */}
                <Link to="/employee"><div><h3 className='features-balance'><MdPerson className='dash-balance'/>Employee </h3></div></Link>
                <Link to="/recruitment"><div><h3 className='features-balance'><IoIosPeople className='dash-balance'/>Recruitment</h3></div></Link>
                <Link to="/calender"><div><h3 className='features-balance'><SlCalender className='dash-balance'/>Calender</h3></div></Link>
                <Link to="/payroll"><div><h3 className='features-balance'><FaMoneyCheckDollar className='dash-balance'/>Payroll</h3></div></Link>
                <Link to="/timeoff"><div><h3 className='features-balance'><BiCalendarExclamation className='dash-balance'/>Time off</h3></div></Link>
                <Link to="/performance"><div><h3 className='features-balance'><GrDocumentPerformance className='dash-balance'/>Performance</h3></div></Link>
                <Link to="/communication"><div><h3 className='features-balance'><FaRegFileAlt className='dash-balance'/>Communication</h3></div></Link>
                <Link to="/settings"><div><h3 className='features-balance'><IoSettingsOutline className='dash-balance'/>Settings</h3></div></Link>
                <Link to="/logout"><div><h3 className='features-balance'><CgLogOut className='dash-balance'/>Logout</h3></div></Link>
            </div>
            {isMobileMenuOpen && (
          <div className="mobile-dropdown-balance">
            <Link to="/employee" onClick={() => setIsMobileMenuOpen(false)}>Employee</Link>
            <Link to="/recruitment" onClick={() => setIsMobileMenuOpen(false)}>Recruitment</Link>
            <Link to="/calender" onClick={() => setIsMobileMenuOpen(false)}>Calendar</Link>
            <Link to="/payroll" onClick={() => setIsMobileMenuOpen(false)}>Payroll</Link>
            <Link to="/timeoff" onClick={() => setIsMobileMenuOpen(false)}>Time off</Link>
            <Link to="/performance" onClick={() => setIsMobileMenuOpen(false)}>Performance</Link>
            <Link to="/communication" onClick={() => setIsMobileMenuOpen(false)}>Communication</Link>
            <Link to="/settings" onClick={() => setIsMobileMenuOpen(false)}>Settings</Link>
            <Link to="/profile" onClick={() => setIsMobileMenuOpen(false)}>Profile</Link>
            <Link to="/logout" onClick={() => setIsMobileMenuOpen(false)}>Logout</Link>
          </div>
        )}
            <div className='menu-balance'> 
      {message && <p>{message}</p>}
      {leaveBalances.length > 0 ? (
        <table className='leave-balance-table'>
          <thead>
            <tr>
              <th>Employee ID</th>
              <th>Total Sick Leave</th>
              <th>Total Casual Leave</th>
              <th>Taken Sick Leave</th>
              <th>Taken Casual Leave</th>
              <th>Difference Sick Leave</th>
              <th>Difference Casual Leave</th>
              <th>Others</th>
            </tr>
          </thead>
          <tbody>
            {leaveBalances.map((balance) => (
              <tr key={balance.E_id}>
                <td>{balance.E_id}</td>
                <td>{balance.total_sick_leave}</td>
                <td>{balance.total_casual_leave}</td>
                <td>{balance.taken_sick_leave}</td>
                <td>{balance.taken_casual_leave}</td>
                <td>{balance.difference_sick}</td>
                <td>{balance.difference_casual}</td>
                <td>{balance.others}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No leave balances available.</p>
      )}
            </div>
        </div>
    </div>
    )
}

export default Balance

