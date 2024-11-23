import React from 'react'
// import logo from "../assets/ugyanlogobg.png"
// import logo from "../assets/ugyanlogobg_enhanced-transformed.png";
import logo from "../assets/UGYAN1.png";
import logo1 from "../assets/ugyanlogoo.jpg"
import { Link } from 'react-router-dom';
import { TbLayoutDashboardFilled } from "react-icons/tb";
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
import { useNavigate } from 'react-router-dom'
import { useState,useEffect } from 'react';
import { CgProfile } from "react-icons/cg";


const Employee = () => {

    const navigate = useNavigate();

    const gotoprofile = (event) => {
        event.preventDefault();  
        navigate('/profile');
    }

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Toggle mobile menu
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

    return (
    <div className='outer-employee'>
        <div className='header-employee'>
            
        <img src={logo}className='logo-employee'></img> 
        <img src={logo1}className='logo1-mobile'></img> 
            
            <div>
            <h1 className='title-bar-employee'><Link to="/dashboard">Home</Link></h1>
        </div>
        <div>
            <p className='title-bar-employee'><Link to="/about">About</Link></p>
        </div>
        <div>
            <p className='title-bar-employee'>Designation</p>
        </div>
        <div>
            <p className='title-bar-employee'>Clock In/Out</p>
        </div>
        <div>
            <p className='title-bar-employee-profile' onClick={gotoprofile}><CgProfile className='profile-icon-dashboard'/></p>
        </div>
        <div className="mobile-menu-icon-employee" onClick={toggleMobileMenu}>
            <GiHamburgerMenu />
        </div>
        </div>
        
        <div className='main-employee'>
            <div className='side-bar-employee'>
                {/* <h3 className='text-white text-6xl text-center bg-gradient-to-tl from-black to-slate-400 p-4'><img src={logo}className='bg-white'></img> */}
                {/* <Link to="/dashboard"> <div><h3 className='features-employee'><TbLayoutDashboardFilled className='dash-employee'/>Dashboard</h3></div></Link> */}
                <Link to="/employee"><div><h3 className='features-employee'><MdPerson className='dash-employee'/>Employee </h3></div></Link>
                <Link to="/recruitment"><div><h3 className='features-employee'><IoIosPeople className='dash-employee'/>Recruitment</h3></div></Link>
                <Link to="/calender"><div><h3 className='features-employee'><SlCalender className='dash-employee'/>Calender</h3></div></Link>
                <Link to="/payroll"><div><h3 className='features-employee'><FaMoneyCheckDollar className='dash-employee'/>Payroll</h3></div></Link>
                <Link to="/timeoff"><div><h3 className='features-employee'><BiCalendarExclamation className='dash-employee'/>Time off</h3></div></Link>
                <Link to="/performance"><div><h3 className='features-employee'><GrDocumentPerformance className='dash-employee'/>Performance</h3></div></Link>
                <Link to="/communication"><div><h3 className='features-employee'><FaRegFileAlt className='dash-employee'/>Communication</h3></div></Link>
                <Link to="/settings"><div><h3 className='features-employee'><IoSettingsOutline className='dash-employee'/>Settings</h3></div></Link>
                <Link to="/logout"><div><h3 className='features-employee'><CgLogOut className='dash-employee'/>Logout</h3></div></Link>
            </div>
            {isMobileMenuOpen && (
          <div className="mobile-dropdown-employee">
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
            <div className='menu-employee'>
                <div>
                    <div className='employee-options'>
                        <Link to="/employeelist"><div className='list-items-div-employee'><h1>Employee List</h1></div></Link>
                        <Link to="/leaders"><div className='list-items-div-employee'><h1>Leaders dashboard</h1></div></Link>
                    </div>
                    <div className='employee-options'>
                    <Link to="/empsearch"><div className='list-items-div-employee'><h1>Employee Search</h1></div></Link>
                    <Link to="/addemp"><div className='list-items-div-employee'><h1>Add Employee</h1></div></Link>
                    </div> 
                </div>
            </div>
        </div>
    </div>
    )
}

export default Employee
