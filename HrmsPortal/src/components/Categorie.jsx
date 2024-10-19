import React from 'react'
import { TfiDashboard } from "react-icons/tfi";
import { IoPeopleOutline } from "react-icons/io5";
import { BiCategory } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { IoLogOutOutline } from "react-icons/io5";
import logo from "../assets/ugyanlogobg.png"
import { Link } from 'react-router-dom';

const Categorie = () => {
  return (
    <>
        <div className='header shadow-2xl bg-gradient-to-br from-yellow1 to-blue1 flex justify-evenly'>
            <h1 className='  text-5xl font-bold text-center mt-0 py-2 px-4 pb-5 text-white tracking-wider'>Human Resources Management System </h1>
            <div className='flex'><CgProfile className='nav-profile flex justify-center mt-4 mb-2 text-5xl text-white '/><p className='text-white mt-7 ml-1 text-l font-semibold'>Profile</p></div>
        </div>
        <div className='flex shadow-black'>
            <div className='side-bar w-1/5 bg-gradient-to-br from-yellow1 to-blue1 h-screen'>
                {/* <h3 className='text-white text-6xl text-center bg-gradient-to-tl from-black to-slate-400 p-4'>*/}<img src={logo}className='bg-white'></img>
                <div><h3 className='features'><TfiDashboard className='dash'/><Link to="/dashboard">Dashboard</Link></h3></div>
                <div><h3 className='features'><IoPeopleOutline className='dash' /><Link to="/employee">Employee</Link></h3></div>
                <div><h3 className='features'><BiCategory className='dash' /><Link to="/categorie">Categorie</Link></h3></div>
                {/* <div><h3 className='features'><CgProfile className='dash'/>profile</h3></div> */}
                <div><h3 className='features'><IoLogOutOutline className='dash'/><Link to="/logout">Logout</Link></h3></div>
            </div>
            <h1>category</h1>
        </div>
    
    </>
  )
}

export default Categorie
