import React from 'react'
import { TfiDashboard } from "react-icons/tfi";
import { IoPeopleOutline } from "react-icons/io5";
import { BiCategory } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { IoLogOutOutline } from "react-icons/io5";
import logo from "../assets/ugyanlogobg.png"
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



const Dashboard = () => {
    return (
    <div className='outer-performance'>
        <div className='header shadow-2xl bg-gradient-to-br from-blue-900 to-blue1 flex justify-between'>
            
                <img src={logo}className='logo-performance'></img>
            
            <div>
            <h1 className='title-bar-performance'><Link to="/dashboard">Home</Link></h1>
        </div>
        <div>
            <p className='title-bar-performance'><Link to="/about">About</Link></p>
        </div>
        <div>
            <p className='title-bar-performance'>Designation</p>
        </div>
        <div>
            <p className='title-bar-performance'>Clock In/Out</p>
        </div>
        
        </div>
        
        <div className='flex shadow-black'>
            <div className='side-bar-performance w-1/5 bg-gradient-to-br from-blue1 to-blue-800 h-screen'>
                {/* <h3 className='text-white text-6xl text-center bg-gradient-to-tl from-black to-slate-400 p-4'><img src={logo}className='bg-white'></img> */}
                <Link to="/dashboard"> <div><h3 className='features-performance'><TbLayoutDashboardFilled className='dash-performance'/>Dashboard</h3></div></Link>
                <Link to="/employee"><div><h3 className='features-performance'><MdPerson className='dash-performance'/>Employee </h3></div></Link>
                <Link to="/recruitment"><div><h3 className='features-performance'><IoIosPeople className='dash-performance'/>Recruitment</h3></div></Link>
                <Link to="/calender"><div><h3 className='features-performance'><SlCalender className='dash-performance'/>Calender</h3></div></Link>
                <Link to="/payroll"><div><h3 className='features-performance'><FaMoneyCheckDollar className='dash-performance'/>Payroll</h3></div></Link>
                <Link to="/timeoff"><div><h3 className='features-performance'><BiCalendarExclamation className='dash-performance'/>Time off</h3></div></Link>
                <Link to="/performance"><div><h3 className='features-performance'><GrDocumentPerformance className='dash-performance'/>Performance</h3></div></Link>
                <Link to="/communication"><div><h3 className='features-performance'><FaRegFileAlt className='dash-performance'/>Communication</h3></div></Link>
                <Link to="/settings"><div><h3 className='features-performance'><IoSettingsOutline className='dash-performance'/>Settings</h3></div></Link>
                <Link to="/logout"><div><h3 className='features-performance'><CgLogOut className='dash-performance'/>Logout</h3></div></Link>
            </div>
            <div className='menu-performance'>
            <div className=' h-full'>
                    <div className='flex mt-2 gap-3 ml-2 '>
                        <Link to="/performeval"><div className='list-items-div-performance'><h1>Performance Evaluation Matrix</h1></div></Link>
                        <Link to="/goalsetting"><div className='list-items-div-performance'><h1>Goal Settings</h1></div></Link>
                    </div>
                    <div className='flex mt-2 gap-3 ml-2'>
                    <Link to="/feedback"><div className='list-items-div-performance'><h1>Feedback and coaching tools</h1></div></Link>
                    <Link to="/performreview"><div className='list-items-div-performance'><h1>Performance review</h1></div></Link>
                    </div> 
                </div>
                    
            </div>
        </div>
    </div>
    )
}

export default Dashboard
