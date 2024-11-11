import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from "../assets/ugyanlogoo.jpg";
import { MdPerson } from 'react-icons/md';
import { IoIosPeople } from 'react-icons/io';
import { SlCalender } from 'react-icons/sl';
import { FaMoneyCheck } from 'react-icons/fa';  // Corrected icon import
import { BiCalendarExclamation } from 'react-icons/bi';
import { GrDocumentPerformance } from 'react-icons/gr';
import { FaRegFileAlt } from 'react-icons/fa';
import { IoSettingsOutline } from 'react-icons/io5';
import { CgLogOut } from 'react-icons/cg';
import { GiHamburgerMenu } from 'react-icons/gi';

const Test = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Toggle mobile menu
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <div className="outer">
      <div className="header">
        <img src={logo} className="logo" alt="Logo" />
        <h1 className="title-bar-dashboard"><Link to="/dashboard">Home</Link></h1>
        <p className="title-bar-dashboard"><Link to="/about">About</Link></p>
        <p className="title-bar-dashboard">Designation</p>
        <p className="title-bar-dashboard">Clock In/Out</p>

        {/* Menu icon for mobile screens */}
        <div className="mobile-menu-icon" onClick={toggleMobileMenu}>
          <GiHamburgerMenu />
        </div>
      </div>

      <div className="main-dashboard">
        {/* Sidebar for larger screens */}
        <div className="side-bar">
          <Link to="/employee"><h3 className="features"><MdPerson /> Employee</h3></Link>
          <Link to="/recruitment"><h3 className="features"><IoIosPeople /> Recruitment</h3></Link>
          <Link to="/calender"><h3 className="features"><SlCalender /> Calendar</h3></Link>
          <Link to="/payroll"><h3 className="features"><FaMoneyCheck /> Payroll</h3></Link>
          <Link to="/timeoff"><h3 className="features"><BiCalendarExclamation /> Time off</h3></Link>
          <Link to="/performance"><h3 className="features"><GrDocumentPerformance /> Performance</h3></Link>
          <Link to="/communication"><h3 className="features"><FaRegFileAlt /> Communication</h3></Link>
          <Link to="/settings"><h3 className="features"><IoSettingsOutline /> Settings</h3></Link>
          <Link to="/logout"><h3 className="features"><CgLogOut /> Logout</h3></Link>
        </div>

        {/* Dropdown menu for mobile screens */}
        {isMobileMenuOpen && (
          <div className="mobile-dropdown">
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

        <div className="menu-dashboard">
          {/* Main dashboard content */}
        </div>
      </div>
    </div>
  );
};

export default Test;
