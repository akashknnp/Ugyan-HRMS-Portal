import React, { useState, useEffect } from 'react'
import { TfiDashboard } from "react-icons/tfi";
import { IoPeopleOutline } from "react-icons/io5";
import { BiCategory } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { IoLogOutOutline } from "react-icons/io5";
import logo from "../assets/ugyanlogobg.png"
import { Link } from 'react-router-dom';



const Dashboard = () => {

    const initialHours = 8;
  const initialTimeInSeconds = initialHours * 3600;
  
  const [timeLeft, setTimeLeft] = useState(initialTimeInSeconds); // countdown time in seconds
  const [isCounting, setIsCounting] = useState(false);

  // Countdown effect
  useEffect(() => {
    let timer;
    if (isCounting && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } 
    return () => clearInterval(timer);
  }, [isCounting, timeLeft]);

  // Format time in hh:mm:ss
  const formatTime = () => {
    const hours = Math.floor(timeLeft / 3600);
    const minutes = Math.floor((timeLeft % 3600) / 60);
    const seconds = timeLeft % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  // Handlers for buttons
  const handleStart = () => setIsCounting(true);
  const handleStop = () => setIsCounting(false);
  const handleReset = () => {
    setIsCounting(false);
    setTimeLeft(initialTimeInSeconds);
  };

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
                    <div className='flex justify-evenly'>
                        <div className='first-box1'>
                            <div className='text-sm px-1'>Total employees</div>
                            <div className='text-2xl text-center mt-2'>
                                <p>2500</p>
                            </div>
                            <div className='text-sm px-1 mt-3'>
                                <p>compared to journey</p>
                            </div>
                        </div>
                        <div className='first-box1'>
                            <div className='text-sm px-1'>On leaves</div>
                            <div><p className='text-2xl text-center mt-2'>25</p></div>
                            <div><p className='text-sm px-1 mt-3'>Compated on jan</p></div>
                        </div>
                        <div className='first-box1'><div className='text-sm px-1'>New joiners</div>
                            <div className='text-2xl text-center mt-2'>
                                <p>48</p>
                            </div>
                            <div className='text-sm px-1 mt-3'>
                                <p>compared to jan</p>
                            </div></div>
                        <div className='first-box1'><div className='text-sm px-1'>Resigned Employee</div>
                            <div className='text-2xl text-center mt-2'>
                                <p>56</p>
                            </div>
                            <div className='text-sm px-1 mt-3'>
                                <p>compared to jan</p>
                            </div></div>
                    </div>


                    <div className=' mt-1'>
                        <div><p className='text-3xl text-white'>Statistics (Project Metrics)</p></div>
                        <div className='flex justify-between mt-1'>
                        
                            <div className='second-box1 bg-white shadow-black'>
                                <div><p className='text-center'>Clock-In-Out</p></div>
                                <div>
                                <div className='text-center'style={{ fontSize: '2em', margin: '20px 0' }}>{formatTime()}</div>
                                <div className='flex justify-evenly'>
                                    <button className='btn' onClick={handleStart}>Login</button>
                                    <button className='btn' onClick={handleStop}>Stop</button>
                                    <button className='btn' onClick={handleReset}>Reset</button>
                                </div>
                                </div>
                            </div>

                            <div className='second-box2 bg-white shadow-blue-500'>
                                <div><p className='text-xl text-center'>Monthly Target</p></div>
                                <div>
                                    <p className='text-3xl text-center mt-1'>0/1,25,000</p>
                                </div>
                                <div>
                                    <p className='text-sm text-center mt-2'>Add Target</p> 
                                </div>
                            </div>
                        </div>



                    </div>
                    {/* <div className='bg-orange-300'>3</div> */}
                    
            </div>
        </div>
    </div>
    )
}

export default Dashboard
