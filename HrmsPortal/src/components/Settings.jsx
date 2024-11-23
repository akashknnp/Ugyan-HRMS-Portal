import React from 'react'
import { TfiDashboard } from "react-icons/tfi";
import { IoPeopleOutline } from "react-icons/io5";
import { BiCategory } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { IoLogOutOutline } from "react-icons/io5";
// import logo from "../assets/ugyanlogobg.png"
import logo from "../assets/UGYAN1.png";
import logo1 from "../assets/ugyanlogoo.jpg"
import { Link } from 'react-router-dom';
import { BsFillPinAngleFill } from "react-icons/bs";
import { CiMenuKebab } from "react-icons/ci";
import { useNavigate } from 'react-router-dom'
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



const Settings = () => {


    const navigate = useNavigate();

    const gotoprofile = (event) => {
        event.preventDefault();  
        navigate('/profile');
    }
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Toggle mobile menu
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
    return (
    <div className='outer-settings'>
        <div className='header-settings'>
            
        <img src={logo}className='logo'></img> 
        <img src={logo1}className='logo1-mobile'></img> 
            
            <div>
            <h1 className='title-bar-settings'><Link to="/dashboard">Home</Link></h1>
        </div>
        <div>
            <p className='title-bar-settings'><Link to="/about">About</Link></p>
        </div>
        <div>
            <p className='title-bar-settings'>Designation</p>
        </div>
        <div>
            <p className='title-bar-settings'>Clock In/Out</p>
        </div>
        <div>
            <p className='title-bar-dashboard-profile' onClick={gotoprofile}><CgProfile className='profile-icon-dashboard'/></p>
        </div>
        <div className="mobile-menu-icon-settings" onClick={toggleMobileMenu}>
            <GiHamburgerMenu />
        </div>
        </div>
        
        <div className='main-settings'>
            <div className='side-bar-settings'>
                {/* <h3 className='text-white text-6xl text-center bg-gradient-to-tl from-black to-slate-400 p-4'><img src={logo}className='bg-white'></img> */}
                {/* <Link to="/dashboard"> <div><h3 className='features-settings'><TbLayoutDashboardFilled className='dash-settings'/>Dashboard</h3></div></Link> */}
                <Link to="/employee"><div><h3 className='features-settings'><MdPerson className='dash-settings'/>Employee </h3></div></Link>
                <Link to="/recruitment"><div><h3 className='features-settings'><IoIosPeople className='dash-settings'/>Recruitment</h3></div></Link>
                <Link to="/calender"><div><h3 className='features-settings'><SlCalender className='dash-settings'/>Calender</h3></div></Link>
                <Link to="/payroll"><div><h3 className='features-settings'><FaMoneyCheckDollar className='dash-settings'/>Payroll</h3></div></Link>
                <Link to="/timeoff"><div><h3 className='features-settings'><BiCalendarExclamation className='dash-settings'/>Time off</h3></div></Link>
                <Link to="/performance"><div><h3 className='features-settings'><GrDocumentPerformance className='dash-settings'/>Performance</h3></div></Link>
                <Link to="/communication"><div><h3 className='features-settings'><FaRegFileAlt className='dash-settings'/>Communication</h3></div></Link>
                <Link to="/settings"><div><h3 className='features-settings'><IoSettingsOutline className='dash-settings'/>Settings</h3></div></Link>
                <Link to="/logout"><div><h3 className='features-settings'><CgLogOut className='dash-settings'/>Logout</h3></div></Link>
            </div>
            {isMobileMenuOpen && (
          <div className="mobile-dropdown-settings">
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
            <div className='menu-settings'>
            <div>
                    <div className='settings-options'>
                        <Link to="/profilemanage"><div className='list-items-div-settings'><h1>Profile Management Settings</h1></div></Link>
                        <Link to="/integsetting"><div className='list-items-div-settings'><h1>Integration Settings</h1></div></Link>
                        <Link to="/notifirefer"><div className='list-items-div-settings'><h1>Notification Reference</h1></div></Link>
                    </div>
                    
            </div>
                    
            </div>
        </div>
    </div>
    )
}

export default Settings
