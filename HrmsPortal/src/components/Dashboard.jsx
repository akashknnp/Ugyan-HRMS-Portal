import React, { useState, useEffect,useRef } from 'react'
import logo from "../assets/ugyanlogoo.jpg"; 
// import logo1 from "../assets/ugyanlogobg.png"
import logo1 from "../assets/ugyanlogobg_enhanced-transformed.png";
import { Link } from 'react-router-dom';
import { BsFillPinAngleFill } from "react-icons/bs";
import { CiMenuKebab } from "react-icons/ci";
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
import { GiHamburgerMenu } from "react-icons/gi";  



const Dashboard = () => {

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Toggle mobile menu
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

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
        <div className='header'>
            
                <img src={logo1}className='logo'></img>
            
        <div>
            <h1 className='title-bar-dashboard '><Link to="/dashboard">Home</Link></h1>
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
        <div className="mobile-menu-icon" onClick={toggleMobileMenu}>
          <GiHamburgerMenu />
        </div>
        </div>
        
        <div className='main-dashboard'>
            <div className='side-bar'>
                {/* <h3 className='text-white text-6xl text-center bg-gradient-to-tl from-black to-slate-400 p-4'><img src={logo}className='bg-white'></img> */}
                {/* <Link to="/dashboard"> <div><h3 className='features'><TbLayoutDashboardFilled className='dash'/>Dashboard</h3></div></Link> */}
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
            {isMobileMenuOpen && (
          <div className="mobile-dropdown">
            <Link to="/employee" onClick={() => setIsMobileMenuOpen(false)}>Employee</Link>
            <Link to="/recruitment" onClick={() => setIsMobileMenuOpen(false)}>Recruitment</Link>
            <Link to="/calender" onClick={() => setIsMobileMenuOpen(false)}>Calendar</Link>
            <Link to="/payroll" onClick={() => setIsMobileMenuOpen(false)}>Payroll</Link>
            <Link to="/timeoff" onClick={() => setIsMobileMenuOpen(false)}>Time off</Link>
            <Link to="/performance" onClick={() => setIsMobileMenuOpen(false)}>Performance</Link>
            <Link to="/communication" onClick={() => setIsMobileMenuOpen(false)}>Communication</Link>
            <Link to="/settings" onClick={() => setIsMobileMenuOpen(false)}>Settings</Link>
            <Link to="/logout" onClick={() => setIsMobileMenuOpen(false)}>Logout</Link>
          </div>
        )}
            <div className='menu-dashboard'>
                    <div className='menu-step1-dashboard'>
                        <div className='first-box1'>
                            <div className='total-employee-dashboard '>Total employees</div>
                            <div className='t-number'>
                                <p>2500</p>
                            </div>
                            <div className='t-text'>
                                <p>compared to journey</p>
                            </div>
                        </div>
                        <div className='first-box1'>
                            <div className='total-employee-dashboard'>On leaves</div>
                            <div><p className='t-number'>25</p></div>
                            <div><p className='t-text'>Compated on jan</p></div>
                        </div>
                        <div className='first-box1'><div className='total-employee-dashboard'>New joiners</div>
                            <div className='t-number'>
                                <p>48</p>
                            </div>
                            <div className='t-text'>
                                <p>compared to jan</p>
                            </div></div>
                        <div className='first-box1'><div className='total-employee-dashboard'>Resigned Employee</div>
                            <div className='t-number'>
                                <p>56</p>
                            </div>
                            <div className='t-text'>
                                <p>compared to jan</p>
                            </div></div>
                    </div>


                    <div>
                        <div><p className='row2-text'>Statistics (Project Metrics)</p></div>
                        <div className='row2'>
                            <div className='second-box1 '>
                                <div><p>Clock-In-Out</p></div>
                                <div>
                                <div className='timer'>{formatTime()}</div>
                                <div className='timer-btn'>
                                    <button className='btn' onClick={handleStart}>Login</button>
                                    <button className='btn' onClick={handleStop}>Stop</button>
                                    <button className='btn' onClick={handleReset}>Reset</button>
                                </div>
                                </div>
                            </div>

                            <div className='second-box2'>
                                <div><p className='m-target'>Monthly Target</p></div>
                                <div>
                                    <p className='m-number'>0/1,25,000</p>
                                </div>
                                <div>
                                    <p className='add-target'>Add Target</p> 
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className='third-row'>
                        <div className='third-box1'>
                            <div className='box1-heading'>
                                <p>Announcement</p>
                                <p>Today,13 Sep 2021</p>
                            </div>
                            <div className='annonce-boxes'>
                                <div>
                                    <h6>Outing schedule for every department</h6>
                                    <p>5 minutes ago</p>
                                </div>
                                <div className='box1-divs'>
                                    <div className='pin-menu'><BsFillPinAngleFill /></div>
                                    <div className='pin-menu'><CiMenuKebab /></div>
                                </div>
                            </div>
                            <div className='annonce-boxes'>
                                <div>
                                    <h6>IT Department need two more talents for UX/UI</h6>
                                    <p>5 minutes ago</p>
                                </div>
                                <div className='box1-divs'>
                                    <div className='pin-menu'><BsFillPinAngleFill /></div>
                                    <div className='pin-menu'><CiMenuKebab /></div>
                                </div>
                            </div>
                            <div className='annonce-boxes'>
                                <div>
                                    <h6>Meeting HR Department</h6>
                                    <p>Yesterday,12:30 PM</p>
                                </div>
                                <div className='box1-divs'>
                                    <div className='pin-menu'><BsFillPinAngleFill /></div>
                                    <div className='pin-menu'><CiMenuKebab /></div>
                                </div>
                            </div>
                            
                        </div>

                        <div className='third-box2'>
                            <div className='box2-heading'>
                                <div><h6>Upcoming Schedule</h6></div>
                                <div><p>Today,13 Sep 2021</p></div>
                            </div>

                            <div className='wrapper'>
                                <input
                                    type="text"
                                    placeholder="Type a message and press Enter"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    
                                />
                                <div
                                    ref={messageEndRef}
                                    className='chat-container'
                                >
                                    <h3>Messages</h3>
                                    {messages.map((msg, index) => (
                                    <p key={index} className='message-box'>
                                        <strong>{msg.text}</strong>
                                        <br />
                                        <small>{msg.time}</small>
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
