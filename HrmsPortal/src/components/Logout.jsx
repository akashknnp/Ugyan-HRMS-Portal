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
import "../logout.css"


const logout = () => {
  const [showPopup, setShowPopup] = useState(false);
    const [userName, setUserName] = useState('');useEffect(() => {
        const storedUserDetails = localStorage.getItem('userDetails');
        if (storedUserDetails) {
          const userDetails = JSON.parse(storedUserDetails); // Parse userDetails from JSON
          if (userDetails && userDetails.first_name) {
            setUserName(userDetails.first_name); // Update the userName with the name from userDetails
          }
        }
      }, []);
      const navigate = useNavigate("/dashboard"); // For navigation to login or home page after logout

      const handleLogoutClick = () => {
        setShowPopup(true); // Show the logout confirmation popup
      };
    
      const confirmLogout = () => {
        // Clear session and redirect
        localStorage.removeItem('userRole');
        localStorage.removeItem('userDetails');
        localStorage.removeItem('lastActive');
        localStorage.removeItem('loginFlag');
        sessionStorage.clear();
    
        console.log("User logged out successfully");
        navigate('/logout1'); // Redirect to login or home page
      };
    
      const cancelLogout = () => {
        setShowPopup(false); // Close popup without logging out
        navigate('/Dashboard');
      };


useEffect(() => {
  
  const storedUserDetails = localStorage.getItem('userDetails');

  if (storedUserDetails) {
    const userDetails = JSON.parse(storedUserDetails); // Parse userDetails from JSON
    if (userDetails && userDetails.first_name) {
      setUserName(userDetails.first_name); // Update the userName with the name from userDetails
    }
  }
  handleLogoutClick();
}, []);

   

    const gotoprofile = (event) => {
        event.preventDefault();  
        navigate('/Dashboard');
    }

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Toggle mobile menu
    const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
    return (
    <div className='outer-logout'>
        <div className='header-logout'>
            
        <img src={logo}className='logo'></img> 
        <img src={logo1}className='logo1-mobile'></img> 
            
            <div>
            <h1 className='title-bar-logout'><Link to="/dashboard">Home</Link></h1>
        </div>
        <div>
            <p className='title-bar-logout'><Link to="/about">About</Link></p>
        </div>
        <div>
            <p className='title-bar-logout'><Link to="/flowchart">Designation</Link></p>
        </div>
        <div>
        <p className='title-bar-dashboard'><Link to="/clock-in-out">Clock-In/Out</Link></p>
        </div>
        <div>
            <p className='title-bar-dashboard-profile' onClick={gotoprofile}><CgProfile className='profile-icon-dashboard'/></p>
            <p className="login-user-name-profile">Hi {userName}</p>
        </div>
        <div className="mobile-menu-icon-logout" onClick={toggleMobileMenu}>
            <GiHamburgerMenu />
        </div>
        </div>
        
        <div className='main-logout'>
            <div className='side-bar-logout'>
                {/* <h3 className='text-white text-6xl text-center bg-gradient-to-tl from-black to-slate-400 p-4'><img src={logo}className='bg-white'></img> */}
                {/* <Link to="/dashboard"> <div><h3 className='features-logout'><TbLayoutDashboardFilled className='dash-logout'/>Dashboard</h3></div></Link> */}
                <Link to="/employee"><div><h3 className='features-logout'><MdPerson className='dash-logout'/>Employee </h3></div></Link>
                <Link to="/recruitment"><div><h3 className='features-logout'><IoIosPeople className='dash-logout'/>Recruitment</h3></div></Link>
                <Link to="/calender"><div><h3 className='features-logout'><SlCalender className='dash-logout'/>Calender</h3></div></Link>
                <Link to="/payroll"><div><h3 className='features-logout'><FaMoneyCheckDollar className='dash-logout'/>Payroll</h3></div></Link>
                <Link to="/timeoff"><div><h3 className='features-logout'><BiCalendarExclamation className='dash-logout'/>Time off</h3></div></Link>
                <Link to="/performance"><div><h3 className='features-logout'><GrDocumentPerformance className='dash-logout'/>Performance</h3></div></Link>
                <Link to="/communication"><div><h3 className='features-logout'><FaRegFileAlt className='dash-logout'/>Communication</h3></div></Link>
                <Link to="/settings"><div><h3 className='features-logout'><IoSettingsOutline className='dash-logout'/>Settings</h3></div></Link>
                <Link to="/logout" ><div><h3  className='features-logout'><CgLogOut className='dash-logout'/>Logout</h3></div></Link>
            </div>
            {isMobileMenuOpen && (
          <div className="mobile-dropdown-logout">
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
            <div className='menu-logout'>
            {showPopup && (
             <div className="popup-logout-div">
              <div className="popup-content">
                <p className='logout-text-appear'>{userName}, do you want to sign out?</p>
                <button onClick={confirmLogout}>Yes, Log out</button>
                <button onClick={cancelLogout}>Cancel</button>
              </div>
            </div>
            )}
            </div>
        </div>
    </div>
    )
}

export default logout

