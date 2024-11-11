import React from 'react'
import { TfiDashboard } from "react-icons/tfi";
import { IoPeopleOutline } from "react-icons/io5";
import { BiCategory } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { IoLogOutOutline } from "react-icons/io5";
// import logo from "../assets/ugyanlogobg.png"
import logo from "../assets/ugyanlogobg_enhanced-transformed.png";
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



const Calender = () => {

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Toggle mobile menu
    const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
    return (
    <div className='outer-calender'>
        <div className='header-calender'>
            
                <img src={logo}className='logo-calender'></img>
            
        <div>
            <h1 className='title-bar-calender'><Link to="/dashboard">Home</Link></h1>
        </div>
        <div>
            <p className='title-bar-calender'><Link to="/about">About</Link></p>
        </div>
        <div>
            <p className='title-bar-calender'>Designation</p>
        </div>
        <div>
            <p className='title-bar-calender'>Clock In/Out</p>
        </div>
        <div className="mobile-menu-icon-calender" onClick={toggleMobileMenu}>
          <GiHamburgerMenu />
        </div>
        </div>
        
        <div className='main-calender'>
            <div className='side-bar-calender'>
                {/* <h3 className='text-white text-6xl text-center bg-gradient-to-tl from-black to-slate-400 p-4'><img src={logo}className='bg-white'></img> */}
                {/* <Link to="/dashboard"> <div><h3 className='features-calender'><TbLayoutDashboardFilled className='dash-calender'/>Dashboard</h3></div></Link> */}
                <Link to="/employee"><div><h3 className='features-calender'><MdPerson className='dash-calender'/>Employee </h3></div></Link>
                <Link to="/recruitment"><div><h3 className='features-calender'><IoIosPeople className='dash-calender'/>Recruitment</h3></div></Link>
                <Link to="/calender"><div><h3 className='features-calender'><SlCalender className='dash-calender'/>Calender</h3></div></Link>
                <Link to="/payroll"><div><h3 className='features-calender'><FaMoneyCheckDollar className='dash-calender'/>Payroll</h3></div></Link>
                <Link to="/timeoff"><div><h3 className='features-calender'><BiCalendarExclamation className='dash-calender'/>Time off</h3></div></Link>
                <Link to="/performance"><div><h3 className='features-calender'><GrDocumentPerformance className='dash-calender'/>Performance</h3></div></Link>
                <Link to="/communication"><div><h3 className='features-calender'><FaRegFileAlt className='dash-calender'/>Communication</h3></div></Link>
                <Link to="/settings"><div><h3 className='features-calender'><IoSettingsOutline className='dash-calender'/>Settings</h3></div></Link>
                <Link to="/logout"><div><h3 className='features-calender'><CgLogOut className='dash-calender'/>Logout</h3></div></Link>
            </div>
            {isMobileMenuOpen && (
          <div className="mobile-dropdown-calender">
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
            <div className='menu-calender'>
            <div>
                    <div className='calender-options'>
                        <Link to="/holidays"><div className='list-items-div-calender'><h1>Holidays</h1></div></Link>
                        <Link to="/events"><div className='list-items-div-calender'><h1>Events</h1></div></Link>
                    </div>
            </div>    
            </div>
        </div>
    </div>
    )
}

export default Calender
