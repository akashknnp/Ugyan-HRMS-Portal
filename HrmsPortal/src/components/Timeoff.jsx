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
    <div className='outer-timeoff'>
        <div className='header shadow-2xl bg-gradient-to-br from-blue-900 to-blue1 flex justify-between'>
            
                <img src={logo}className='logo-timeoff'></img>
            
            <div>
            <h1 className='title-bar-timeoff'><Link to="/dashboard">Home</Link></h1>
        </div>
        <div>
            <p className='title-bar-timeoff'><Link to="/about">About</Link></p>
        </div>
        <div>
            <p className='title-bar-timeoff'>Designation</p>
        </div>
        <div>
            <p className='title-bar-timeoff'>Clock In/Out</p>
        </div>
        
        </div>
        
        <div className='flex shadow-black'>
            <div className='side-bar-timeoff w-1/5 bg-gradient-to-br from-blue1 to-blue-800 h-screen'>
                {/* <h3 className='text-white text-6xl text-center bg-gradient-to-tl from-black to-slate-400 p-4'><img src={logo}className='bg-white'></img> */}
                <Link to="/dashboard"> <div><h3 className='features-timeoff'><TbLayoutDashboardFilled className='dash-timeoff'/>Dashboard</h3></div></Link>
                <Link to="/employee"><div><h3 className='features-timeoff'><MdPerson className='dash-timeoff'/>Employee </h3></div></Link>
                <Link to="/recruitment"><div><h3 className='features-timeoff'><IoIosPeople className='dash-timeoff'/>Recruitment</h3></div></Link>
                <Link to="/calender"><div><h3 className='features-timeoff'><SlCalender className='dash-timeoff'/>Calender</h3></div></Link>
                <Link to="/payroll"><div><h3 className='features-timeoff'><FaMoneyCheckDollar className='dash-timeoff'/>Payroll</h3></div></Link>
                <Link to="/timeoff"><div><h3 className='features-timeoff'><BiCalendarExclamation className='dash-timeoff'/>Time off</h3></div></Link>
                <Link to="/performance"><div><h3 className='features-timeoff'><GrDocumentPerformance className='dash-timeoff'/>Performance</h3></div></Link>
                <Link to="/communication"><div><h3 className='features-timeoff'><FaRegFileAlt className='dash-timeoff'/>Communication</h3></div></Link>
                <Link to="/settings"><div><h3 className='features-timeoff'><IoSettingsOutline className='dash-timeoff'/>Settings</h3></div></Link>
                <Link to="/logout"><div><h3 className='features-timeoff'><CgLogOut className='dash-timeoff'/>Logout</h3></div></Link>
            </div>
            <div className='menu-timeoff'>
            <div className=' h-full'>
                    <div className='flex mt-2 gap-3 ml-2 '>
                        <Link to="/requests"><div className='list-items-div-timeoff'><h1>Time off requests</h1></div></Link>
                        <Link to="/approval"><div className='list-items-div-timeoff'><h1>Approvals</h1></div></Link>
                    </div>
                    <div>
                    <Link to="/balance"><div className='list-items-div-set-b  mt-2 ml-2 mr-2'><h1>Balance tracking</h1></div></Link>
                    </div>
            </div>     
            </div>
        </div>  
    </div>
    )
}

export default Dashboard
