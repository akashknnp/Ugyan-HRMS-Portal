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
    <div className='outer-settings'>
        <div className='header shadow-2xl bg-gradient-to-br from-blue-900 to-blue1 flex justify-between'>
            
                <img src={logo}className='logo-settings'></img>
            
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
        
        </div>
        
        <div className='flex shadow-black'>
            <div className='side-bar-settings w-1/5 bg-gradient-to-br from-blue1 to-blue-800 h-screen'>
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
            <div className='menu-settings'>
            <div className=' h-full'>
                    <div className='flex mt-2 gap-3 ml-2 '>
                        <Link to="/profilemanage"><div className='list-items-div-settings'><h1>Profile Management Settings</h1></div></Link>
                        <Link to="/integsetting"><div className='list-items-div-settings'><h1>Integration Settings</h1></div></Link>
                    </div>
                    <div>
                    <Link to="/notifirefer"><div className='list-items-div-set-b  mt-2 ml-2 mr-2'><h1>Notification Reference</h1></div></Link>
                    </div>
            </div>
                    
            </div>
        </div>
    </div>
    )
}

export default Dashboard
