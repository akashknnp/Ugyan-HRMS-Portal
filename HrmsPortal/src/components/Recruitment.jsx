import React from 'react'
import { useNavigate } from 'react-router-dom'
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


const Recruitment = () => {

    const navigate = useNavigate();

    const gotoprofile = (event) => {
        event.preventDefault();  
        navigate('/profile');
    }

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Toggle mobile menu
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
    return (
    <div className='outer-recruitment'>
        <div className='header-recruitment'>
            
        <img src={logo}className='logo'></img> 
        <img src={logo1}className='logo1-mobile'></img> 
            
        <div>
            <h1 className='title-bar-recruitment'><Link to="/dashboard">Home</Link></h1>
        </div>
        <div>
            <p className='title-bar-recruitment'><Link to="/about">About</Link></p>
        </div>
        <div>
            <p className='title-bar-recruitment'>Designation</p>
        </div>
        <div>
            <p className='title-bar-recruitment'>Clock In/Out</p>
        </div>
        <div>
            <p className='title-bar-dashboard-profile' onClick={gotoprofile}><CgProfile className='profile-icon-dashboard'/></p>
        </div>
        <div className="mobile-menu-icon-recruitment" onClick={toggleMobileMenu}>
          <GiHamburgerMenu />
        </div>
        </div>
        
        <div className='main-recruitment'>
            <div className='side-bar-recruitment'>
                {/* <h3 className='text-white text-6xl text-center bg-gradient-to-tl from-black to-slate-400 p-4'><img src={logo}className='bg-white'></img> */}
                {/* <Link to="/dashboard"> <div><h3 className='features-recruitment'><TbLayoutDashboardFilled className='dash-recruitment'/>Dashboard</h3></div></Link> */}
                <Link to="/employee"><div><h3 className='features-recruitment'><MdPerson className='dash-recruitment'/>Employee </h3></div></Link>
                <Link to="/recruitment"><div><h3 className='features-recruitment'><IoIosPeople className='dash-recruitment'/>Recruitment</h3></div></Link>
                <Link to="/calender"><div><h3 className='features-recruitment'><SlCalender className='dash-recruitment'/>Calender</h3></div></Link>
                <Link to="/payroll"><div><h3 className='features-recruitment'><FaMoneyCheckDollar className='dash-recruitment'/>Payroll</h3></div></Link>
                <Link to="/timeoff"><div><h3 className='features-recruitment'><BiCalendarExclamation className='dash-recruitment'/>Time off</h3></div></Link>
                <Link to="/performance"><div><h3 className='features-recruitment'><GrDocumentPerformance className='dash-recruitment'/>Performance</h3></div></Link>
                <Link to="/communication"><div><h3 className='features-recruitment'><FaRegFileAlt className='dash-recruitment'/>Communication</h3></div></Link>
                <Link to="/settings"><div><h3 className='features-recruitment'><IoSettingsOutline className='dash-recruitment'/>Settings</h3></div></Link>
                <Link to="/logout"><div><h3 className='features-recruitment'><CgLogOut className='dash-recruitment'/>Logout</h3></div></Link>
            </div>
            {isMobileMenuOpen && (
          <div className="mobile-dropdown-recruitment">
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
            <div className='menu-recruitment'>
            <div>
                    <div className='recruitment-options'>
                        <Link to="/jobpost"><div className='list-items-div-recruitment'><h1>Job postings</h1></div></Link>
                        <Link to="/applitrack"><div className='list-items-div-recruitment'><h1>Applicant Tracking</h1></div></Link>
                    </div>
                    <div className='recruitment-options'>
                    <Link to="/interview"><div className='list-items-div-recruitment'><h1>Interview scheduling</h1></div></Link>
                    <Link to="/offermanage"><div className='list-items-div-recruitment'><h1>Offer Management</h1></div></Link>
                    </div> 
                </div>
            </div>
        </div>
    </div>
    )
}

export default Recruitment
