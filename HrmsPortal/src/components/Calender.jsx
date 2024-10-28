import React from 'react'
import { TfiDashboard } from "react-icons/tfi";
import { IoPeopleOutline } from "react-icons/io5";
import { BiCategory } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { IoLogOutOutline } from "react-icons/io5";
import logo from "../assets/ugyanlogobg.png"
import { Link } from 'react-router-dom';



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
                <div><h3 className='features'><TfiDashboard className='dash'/><Link to="/dashboard">Dashboard</Link></h3></div>
                <div><h3 className='features'><IoPeopleOutline className='dash' /><Link to="/employee">Employee </Link></h3></div>
                <div><h3 className='features'><BiCategory className='dash' /><Link to="/recruitment">Recruitment</Link></h3></div>
                <div><h3 className='features'><BiCategory className='dash' /><Link to="/calender">Calender</Link></h3></div>
                <div><h3 className='features'><BiCategory className='dash' /><Link to="/payroll">Payroll</Link></h3></div>
                <div><h3 className='features'><BiCategory className='dash' /><Link to="/timeoff">Time off</Link></h3></div>
                <div><h3 className='features'><BiCategory className='dash' /><Link to="/performance">Performance</Link></h3></div>
                <div><h3 className='features'><BiCategory className='dash' /><Link to="/communication">Communication</Link></h3></div>
                <div><h3 className='features'><BiCategory className='dash' /><Link to="/settings">Settings</Link></h3></div>



                {/* <div><h3 className='features'><CgProfile className='dash'/>profile</h3></div> */}
                <div><h3 className='features'><IoLogOutOutline className='dash'/><Link to="/logout">Logout</Link></h3></div>
            </div>
            <div className='menu'>
            <div className='list'>
                    <h4><Link to="/holidays">Holidays</Link></h4>
                    <h4><Link to="/events">Events</Link></h4>
                  </div>
                    
            </div>
        </div>
    </div>
    )
}

export default Dashboard
