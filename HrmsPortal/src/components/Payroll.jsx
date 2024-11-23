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


const Payroll = () => {

    const navigate = useNavigate();

    const gotoprofile = (event) => {
        event.preventDefault();  
        navigate('/Dashboard');
    }

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Toggle mobile menu
    const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
    return (
    <div className='outer-payroll'>
        <div className='header-payroll'>
            
        <img src={logo}className='logo'></img> 
        <img src={logo1}className='logo1-mobile'></img> 
            
            <div>
            <h1 className='title-bar-payroll'><Link to="/dashboard">Home</Link></h1>
        </div>
        <div>
            <p className='title-bar-payroll'><Link to="/about">About</Link></p>
        </div>
        <div>
            <p className='title-bar-payroll'>Designation</p>
        </div>
        <div>
            <p className='title-bar-payroll'>Clock In/Out</p>
        </div>
        <div>
            <p className='title-bar-dashboard-profile' onClick={gotoprofile}><CgProfile className='profile-icon-dashboard'/></p>
        </div>
        <div className="mobile-menu-icon-payroll" onClick={toggleMobileMenu}>
            <GiHamburgerMenu />
        </div>
        </div>
        
        <div className='main-payroll'>
            <div className='side-bar-payroll'>
                {/* <h3 className='text-white text-6xl text-center bg-gradient-to-tl from-black to-slate-400 p-4'><img src={logo}className='bg-white'></img> */}
                {/* <Link to="/dashboard"> <div><h3 className='features-payroll'><TbLayoutDashboardFilled className='dash-payroll'/>Dashboard</h3></div></Link> */}
                <Link to="/employee"><div><h3 className='features-payroll'><MdPerson className='dash-payroll'/>Employee </h3></div></Link>
                <Link to="/recruitment"><div><h3 className='features-payroll'><IoIosPeople className='dash-payroll'/>Recruitment</h3></div></Link>
                <Link to="/calender"><div><h3 className='features-payroll'><SlCalender className='dash-payroll'/>Calender</h3></div></Link>
                <Link to="/payroll"><div><h3 className='features-payroll'><FaMoneyCheckDollar className='dash-payroll'/>Payroll</h3></div></Link>
                <Link to="/timeoff"><div><h3 className='features-payroll'><BiCalendarExclamation className='dash-payroll'/>Time off</h3></div></Link>
                <Link to="/performance"><div><h3 className='features-payroll'><GrDocumentPerformance className='dash-payroll'/>Performance</h3></div></Link>
                <Link to="/communication"><div><h3 className='features-payroll'><FaRegFileAlt className='dash-payroll'/>Communication</h3></div></Link>
                <Link to="/settings"><div><h3 className='features-payroll'><IoSettingsOutline className='dash-payroll'/>Settings</h3></div></Link>
                <Link to="/logout"><div><h3 className='features-payroll'><CgLogOut className='dash-payroll'/>Logout</h3></div></Link>
            </div>
            {isMobileMenuOpen && (
          <div className="mobile-dropdown-payroll">
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
            <div className='menu-payroll'>
                Pay roll
            </div>
        </div>
    </div>
    )
}

export default Payroll
