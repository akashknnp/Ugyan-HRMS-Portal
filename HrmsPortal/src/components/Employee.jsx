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
                <Link to="/dashboard"> <div><h3 className='features'><TbLayoutDashboardFilled className='dash'/>Dashboard</h3></div></Link>
                <Link to="/employee"><div><h3 className='features'><MdPerson className='dash'/>Employee </h3></div></Link>
                <Link to="/recruitment"><div><h3 className='features'><IoIosPeople className='dash'/>Recruitment</h3></div></Link>
                <Link to="/calender"><div><h3 className='features'><SlCalender className='dash'/>Calender</h3></div></Link>
                <Link to="/payroll"><div><h3 className='features'><FaMoneyCheckDollar className='dash'/>Payroll</h3></div></Link>
                <Link to="/timeoff"><div><h3 className='features'><BiCalendarExclamation className='dash'/>Time off</h3></div></Link>
                <Link to="/performance"><div><h3 className='features'><GrDocumentPerformance className='dash'/>Performance</h3></div></Link>
                <Link to="/communication"><div><h3 className='features'><FaRegFileAlt className='dash'/>Communication</h3></div></Link>
                <Link to="/settings"><div><h3 className='features'><IoSettingsOutline className='dash'/>Settings</h3></div></Link>
                <Link to="/logout"><div><h3 className='features'><CgLogOut className='dash'/>Logout</h3></div></Link>
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
