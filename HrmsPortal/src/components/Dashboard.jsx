import React, { useState, useEffect,useRef } from 'react'
import { TfiDashboard } from "react-icons/tfi";
import { IoPeopleOutline } from "react-icons/io5";
import { BiCategory } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { IoLogOutOutline } from "react-icons/io5";
import logo from "../assets/ugyanlogobg.png"
import { Link } from 'react-router-dom';
import { BsFillPinAngleFill } from "react-icons/bs";
import { CiMenuKebab } from "react-icons/ci";



const Dashboard = () => {

    const initialHours = 8;
  const initialTimeInSeconds = initialHours * 3600;

  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const messageEndRef = useRef(null); // Reference to auto-scroll

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && message.trim()) {
      const timestamp = new Date().toLocaleString();
      setMessages([{ text: message, time: timestamp }, ...messages]);
      setMessage('');
    }
  };

  useEffect(() => {
    // Scroll to the top when a new message is added
    if (messageEndRef.current) {
      messageEndRef.current.scrollTop = 0;
    }
  }, [messages]);
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
                    
                    <div className='flex mt-1'>
                        <div className='third-box1 bg-white rounded px-2 py-2'>
                            <div className='flex  justify-between'>
                                <p className='text-xl font-semibold'>Announcement</p>
                                <p>Today,13 Sep 2021</p>
                            </div>
                            <div className='annonce-boxes flex justify-between'>
                                <div>
                                    <h6>Outing schedule for every department</h6>
                                    <p>5 minutes ago</p>
                                </div>
                                <div className='flex justify-evenly'>
                                    <div className='pin-menu'><BsFillPinAngleFill /></div>
                                    <div className='pin-menu'><CiMenuKebab /></div>
                                </div>
                            </div>
                            <div className='annonce-boxes flex justify-between'>
                                <div>
                                    <h6>IT Department need two more talents for UX/UI</h6>
                                    <p>5 minutes ago</p>
                                </div>
                                <div className='flex justify-evenly'>
                                    <div className='pin-menu'><BsFillPinAngleFill /></div>
                                    <div className='pin-menu'><CiMenuKebab /></div>
                                </div>
                            </div>
                            <div className='annonce-boxes flex justify-between'>
                                <div>
                                    <h6>Meeting HR Department</h6>
                                    <p>Yesterday,12:30 PM</p>
                                </div>
                                <div className='flex justify-evenly align-middle'>
                                    <div className='pin-menu'><BsFillPinAngleFill /></div>
                                    <div className='pin-menu'><CiMenuKebab /></div>
                                </div>
                            </div>
                            
                        </div>

                        <div className='third-box2 bg-zinc-200 rounded-lg mt-2'>
                             <div className='flex justify-between bg-white px-2 rounded'>
                                <div><h6 className='text-xl font-semibold'>Upcoming Schedule</h6></div>
                                <div><p>Today,13 Sep 2021</p></div>
                            </div>
                            {/*<div className='bg-zinc-200 px-2 py-2 rounded'>
                                <div><p className='text-base'>Priority</p></div>
                                <div className='prior-other-div flex justify-between'>
                                    <div>
                                        <h5>Team meeting regarding metrics</h5>
                                        <p>Today - 11:30AM</p>
                                    </div>
                                    <div className='pin-menu'>
                                    <CiMenuKebab />
                                    </div>
                                </div>
                            </div>
                            <div className='bg-zinc-200 px-2 py-2 rounded mt-1'>
                                <div><p>Other</p></div>
                                <div className='prior-other-div flex justify-between'>
                                    <div>
                                        <h5>Training SAMRAT-FM batch</h5>
                                        <p>Today - 10:30AM</p>
                                    </div>
                                    <div className='pin-menu'>
                                    <CiMenuKebab />
                                    </div>
                                </div>
                                <div className='prior-other-div flex justify-between'>
                                    <div>
                                        <h5>Short meeting with product designer from IT Department</h5>
                                        <p>Today - 11:30AM</p>
                                    </div>
                                    <div className='pin-menu'>
                                    <CiMenuKebab />
                                    </div>
                                </div>
                            </div> */}

                            <div style={{ padding: '20px', maxWidth: '100%', margin: '0 auto' }}>
                                <input
                                    type="text"
                                    placeholder="Type a message and press Enter"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    style={{ width: '100%', padding: '10px', marginBottom: '20px' }}
                                />
                                <div
                                    ref={messageEndRef}
                                    style={{
                                    border: '1px solid #ddd',
                                    padding: '10px',
                                    maxHeight: '25vh',
                                    overflowY: 'scroll',
                                    display: 'flex',
                                    flexDirection: 'column' // Keep order as column
                                    }}
                                >
                                    <h3>Messages</h3>
                                    {messages.map((msg, index) => (
                                    <p key={index} style={{ margin: '5px 0' }}>
                                        <strong>{msg.text}</strong>
                                        <br />
                                        <small style={{ color: 'gray' }}>{msg.time}</small>
                                    </p>
                                    ))}
                                </div>
                                </div>

                        </div>

                    </div>
                    
            </div>
        </div>
    </div>
    )
}

export default Dashboard
