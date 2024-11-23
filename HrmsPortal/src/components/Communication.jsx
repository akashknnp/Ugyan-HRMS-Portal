import React from 'react'
import { TfiDashboard } from "react-icons/tfi";
import { IoPeopleOutline } from "react-icons/io5";
import { BiCategory } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { IoLogOutOutline } from "react-icons/io5";
// import logo from "../assets/ugyanlogobg.png"
// import logo from "../assets/ugyanlogobg_enhanced-transformed.png";
import logo from "../assets/UGYAN1.png";
import logo1 from "../assets/ugyanlogoo.jpg"
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'
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


const Dashboard = () => {

    const navigate = useNavigate();

    const gotoprofile = (event) => {
        event.preventDefault();  
        navigate('/profile');
    }

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Toggle mobile menu
    const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
    return (
    <div className='outer-communicate'>
        <div className='header-communicate'>
            
        <img src={logo}className='logo'></img> 
        <img src={logo1}className='logo1-mobile'></img> 
            
            <div>
            <h1 className='title-bar-communicate'><Link to="/dashboard">Home</Link></h1>
        </div>
        <div>
            <p className='title-bar-communicate'><Link to="/about">About</Link></p>
        </div>
        <div>
            <p className='title-bar-communicate'>Designation</p>
        </div>
        <div>
            <p className='title-bar-communicate'>Clock In/Out</p>
        </div>
        <div>
            <p className='title-bar-dashboard-profile' onClick={gotoprofile}><CgProfile className='profile-icon-dashboard'/></p>
        </div>
        <div className="mobile-menu-icon-communicate" onClick={toggleMobileMenu}>
          <GiHamburgerMenu />
        </div>
        </div>
        
        <div className='main-communicate'>
            <div className='side-bar-communicate'>
                {/* <h3 className='text-white text-6xl text-center bg-gradient-to-tl from-black to-slate-400 p-4'><img src={logo}className='bg-white'></img> */}
                {/* <Link to="/dashboard"> <div><h3 className='features-communicate'><TbLayoutDashboardFilled className='dash-communicate'/>Dashboard</h3></div></Link> */}
                <Link to="/employee"><div><h3 className='features-communicate'><MdPerson className='dash-communicate'/>Employee </h3></div></Link>
                <Link to="/recruitment"><div><h3 className='features-communicate'><IoIosPeople className='dash-communicate'/>Recruitment</h3></div></Link>
                <Link to="/calender"><div><h3 className='features-communicate'><SlCalender className='dash-communicate'/>Calender</h3></div></Link>
                <Link to="/payroll"><div><h3 className='features-communicate'><FaMoneyCheckDollar className='dash-communicate'/>Payroll</h3></div></Link>
                <Link to="/timeoff"><div><h3 className='features-communicate'><BiCalendarExclamation className='dash-communicate'/>Time off</h3></div></Link>
                <Link to="/performance"><div><h3 className='features-communicate'><GrDocumentPerformance className='dash-communicate'/>Performance</h3></div></Link>
                <Link to="/communication"><div><h3 className='features-communicate'><FaRegFileAlt className='dash-communicate'/>Communication</h3></div></Link>
                <Link to="/settings"><div><h3 className='features-communicate'><IoSettingsOutline className='dash-communicate'/>Settings</h3></div></Link>
                <Link to="/logout"><div><h3 className='features-communicate'><CgLogOut className='dash-communicate'/>Logout</h3></div></Link>
            </div>
            {isMobileMenuOpen && (
          <div className="mobile-dropdown-communicate">
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
            <div className='menu-communicate'>
            <div>
                    <div className='communicate-options'>
                        <Link to="/schedulemeeting"><div className='list-items-div-communicate'><h1>Schedule Meetings</h1></div></Link>
                        <Link to="/scheduleevent"><div className='list-items-div-communicate'><h1>Schedule Events</h1></div></Link>
                    </div>
            </div> 
            </div>
        </div>
    </div>
    )
}

export default Dashboard
