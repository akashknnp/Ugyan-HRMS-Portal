import React from 'react'
import logo from "../assets/ugyanlogobg.png"
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



const Dashboard = () => {
    return (
    <div className='outer '>
        <div className='header shadow-2xl bg-gradient-to-br from-blue-900 to-blue1 flex justify-between'>
            
                <img src={logo}className='logo'></img>
            
            <div>
            <h1 className='title-bar-dashboard'><Link to="/dashboard">Home</Link></h1>
        </div>
        <div>
            <p className='title-bar-dashboard'><Link to="/about">About</Link></p>
        </div>
        <div>
            <p className='title-bar-dashboard'>Designation</p>
        </div>
        <div>
            <p className='title-bar-dashboard'>Clock In/Out</p>
        </div>
        
        </div>
        
        <div className='flex shadow-black'>
            <div className='side-bar w-1/5 bg-gradient-to-br from-blue1 to-blue-800 h-screen'>
                {/* <h3 className='text-white text-6xl text-center bg-gradient-to-tl from-black to-slate-400 p-4'><img src={logo}className='bg-white'></img> */}
                <div><h3 className='features'><TbLayoutDashboardFilled className='dash'/><Link to="/dashboard">Dashboard</Link></h3></div>
                <div><h3 className='features'><MdPerson className='dash'/><Link to="/employee">Employee </Link></h3></div>
                <div><h3 className='features'><IoIosPeople className='dash'/><Link to="/recruitment">Recruitment</Link></h3></div>
                <div><h3 className='features'><SlCalender className='dash'/><Link to="/calender">Calender</Link></h3></div>
                <div><h3 className='features'><FaMoneyCheckDollar className='dash'/><Link to="/payroll">Payroll</Link></h3></div>
                <div><h3 className='features'><BiCalendarExclamation className='dash'/><Link to="/timeoff">Time off</Link></h3></div>
                <div><h3 className='features'><GrDocumentPerformance className='dash'/><Link to="/performance">Performance</Link></h3></div>
                <div><h3 className='features'><FaRegFileAlt className='dash'/><Link to="/communication">Communication</Link></h3></div>
                <div><h3 className='features'><IoSettingsOutline className='dash'/><Link to="/settings">Settings</Link></h3></div>



                {/* <div><h3 className='features'><CgProfile className='dash'/>profile</h3></div> */}
                <div><h3 className='features'><CgLogOut className='dash'/><Link to="/logout">Logout</Link></h3></div>
            </div>
            <div className='menu'>
                  <div className='list'>
                    <h4><Link to="/employeelist">Employee List</Link></h4>
                    <h4><Link to="/leaders">Leaders Dashboard</Link></h4>
                    <h4><Link to="/empsearch">Employee Search</Link></h4>
                    <h4><Link to="/addemp">Add Employee</Link></h4>
                  </div>
            </div>
        </div>
    </div>
    )
}

export default Dashboard
