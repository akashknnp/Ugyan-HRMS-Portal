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
                <div><h3 className='features'><BiCategory className='dash' /><Link to="/categorie">Recruitment</Link></h3></div>
                <div><h3 className='features'><BiCategory className='dash' /><Link to="/categorie">Calender</Link></h3></div>
                <div><h3 className='features'><BiCategory className='dash' /><Link to="/categorie">Payroll</Link></h3></div>
                <div><h3 className='features'><BiCategory className='dash' /><Link to="/categorie">Time off</Link></h3></div>
                <div><h3 className='features'><BiCategory className='dash' /><Link to="/categorie">Performance</Link></h3></div>
                <div><h3 className='features'><BiCategory className='dash' /><Link to="/categorie">Communication</Link></h3></div>
                <div><h3 className='features'><BiCategory className='dash' /><Link to="/categorie">Settings</Link></h3></div>



                {/* <div><h3 className='features'><CgProfile className='dash'/>profile</h3></div> */}
                <div><h3 className='features'><IoLogOutOutline className='dash'/><Link to="/logout">Logout</Link></h3></div>
            </div>
            <div className='menu'>
                    {/* <div className='menu-box'><h3 >Admin</h3><hr/><div><h4>Total:</h4></div></div>
                    <div className='menu-box'><h3>Employee</h3><hr/><div><h4>Total:</h4></div></div>
                    <div className='menu-box'><h3>Salary</h3><hr/><div><h4>Total:</h4></div></div> */}
                    
            </div>
        </div>
    </div>
    )
}

export default Dashboard
