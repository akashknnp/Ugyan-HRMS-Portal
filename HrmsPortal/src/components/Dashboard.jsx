import React, { useState, useEffect,useRef } from 'react'
// import logo from "../assets/ugyanlogoo.jpg"; 
import logo1 from "../assets/ugyanlogoo.jpg"
import logo from "../assets/UGYAN1.png";
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
import { CgProfile } from "react-icons/cg";
import "../Dashboard.css";
import { useNavigate } from 'react-router-dom'



const Dashboard = () => {
  
  const [userRole,setUserRole]=useState("");
  const [statusMessage,setStatusMessage]=useState("");
  const [userName, setUserName] = useState('');
  
    const navigate = useNavigate();

    const gotoprofile = (event) => {
        event.preventDefault();  
        navigate('/profile');
    }

    useEffect(() => {
      // Check the login status from localStorage
      const loginFlag = localStorage.getItem("loginFlag");
  
      // If the loginFlag is not set or false, redirect to the login page
      console.log("login flag in dashboard",loginFlag)
      if (loginFlag=="false") {
        navigate('/logout1');
      }
    }, [navigate]);  // Dependency array ensures this effect runs only once on component mount
  

    //------ total number of emp---------//

  const [totalEmployees, setTotalEmployees] = useState(0);
  const [month, setMonth] = useState("");
  

  const fetchTotalEmployees = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}employees/total_employees/`);
      if (response.ok) {
        const data = await response.json();
        setTotalEmployees(data.total); // Assuming the API returns { total: number, month: "November" }
        setMonth(data.month);
      } else {
        console.error("Failed to fetch total employees");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    // Fetch data immediately when the component loads
    fetchTotalEmployees();

    // Set up interval to refresh every 5 minutes
    const interval = setInterval(() => {
      fetchTotalEmployees();
    }, 5 * 60 * 1000); // 5 minutes in milliseconds

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []); // Empty dependency array ensures this runs only once


//  --------- new joined on the currrent month ----------

const [newJoiners, setNewJoiners] = useState(0);
  const [joinMonth, setJoinMonth] = useState("");  // Renamed from 'month' to 'joinMonth'

  const fetchNewJoiners = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}employees/new-joiners/`);
      if (response.ok) {
        const data = await response.json();
        setNewJoiners(data.new_joiners);
        setJoinMonth(data.month);  // Set the current month for new joiners
      } else {
        console.error("Failed to fetch new joiners");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchNewJoiners();

    const interval = setInterval(() => {
      fetchNewJoiners();
    }, 5 * 60 * 1000); // Refresh every 5 minutes

    return () => clearInterval(interval);
  }, []);


    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    const fetchMessages = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}dashboard/messages/`);
        const data = await response.json();
        setMessages(data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    const handleKeyPress = async (e) => {
      if (e.key === 'Enter' && message.trim()) {
        e.preventDefault();  // Prevent the default action for Enter key (form submission)
      
        // Send message to Django backend
        const response = await fetch(`${import.meta.env.VITE_API_URL}dashboard/save_message/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',  // Send data in JSON format
          },
          body: JSON.stringify({ message: message }),  // Send the message as JSON
        });
    
    const data = await response.json();
    
    if (data.message) {
        // Update state with the new message
      setMessages([{ text: data.message, time: data.timestamp }, ...messages]);
      setMessage('');  // Clear input field after sending
      }
    }
    };
  
    useEffect(() => {
      const fetchMessages = async () => {
        const response = await fetch(`${import.meta.env.VITE_API_URL}dashboard/get_messages/`);
        const data = await response.json();
        if (data.messages) {
          setMessages(data.messages);
        }
      };
  
      fetchMessages();
    }, []);
  
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [islaptopview,setislaptopview]=useState(false);

  // Toggle mobile menu
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  

    const initialHours = 8;
  const initialTimeInSeconds = initialHours * 3600;

 
  const messageEndRef = useRef(null); // Reference to auto-scroll



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
  // const formatTime = () => {
  //   const hours = Math.floor(timeLeft / 3600);
  //   const minutes = Math.floor((timeLeft % 3600) / 60);
  //   const seconds = timeLeft % 60;
  //   return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  // };

  // Handlers for buttons
  const handleStart = () => setIsCounting(true);
  const handleStop = () => setIsCounting(false);
  const handleReset = () => {
  setIsCounting(false);
  setTimeLeft(initialTimeInSeconds);
  };
//  ----------------------role based----------------

useEffect(() => {
  const roleFromSession = localStorage.getItem('userRole');// Simulate getting from session
  if (roleFromSession) {
    setUserRole(roleFromSession);  // Set role from session/local storage
  } else {
    // If no role found, set default or handle authentication redirection
    setUserRole(''); 
  }
}, []);

useEffect(() => {
  const storedUserDetails = localStorage.getItem('userDetails');
  if (storedUserDetails) {
    const userDetails = JSON.parse(storedUserDetails); // Parse userDetails from JSON
    if (userDetails && userDetails.first_name) {
      setUserName(userDetails.first_name); // Update the userName with the name from userDetails
    }
  }
}, []);


const [leaveCount, setLeaveCount] = useState(0);
    const [lastRefreshTime, setLastRefreshTime] = useState(null); // State for last refresh time

    const fetchLeaveCount = () => {
        fetch(`${import.meta.env.VITE_API_URL}leave/get-leave-count/`)
            .then((response) => response.json())
            .then((data) => {
                setLeaveCount(data.leave_count);
                setLastRefreshTime(new Date()); // Update the last refresh time
            })
            .catch((error) => console.error('Error fetching leave count:', error));
    };

    useEffect(() => {
        // Fetch leave count initially when the component mounts
        fetchLeaveCount();

        // Set an interval to fetch data every 1 hour (3600000ms)
        const intervalId = setInterval(() => {
            fetchLeaveCount();
        }, 3600000);

        // Cleanup interval on component unmount
        return () => clearInterval(intervalId);
    }, []);
    const clearMessage = () => {
      setTimeout(() => setStatusMessage(""),50000);
    };

    const handleClockOut = async () => {
      try {
        // Retrieve the user details from localStorage
        const userDetails = JSON.parse(localStorage.getItem('userDetails'));
    
        // Check if userDetails and userDetails.id are available
        if (!userDetails || !userDetails.id) {
          setStatusMessage('User details are missing. Please log in first.');
          clearMessage();
          return;
        }
    
        // Extract the ID from userDetails
        const { id } = userDetails;
    
        // Make the API request to clock out with the user ID
        const response = await fetch(`${import.meta.env.VITE_API_URL}dashboard/clock-out/`, {
          method: 'POST', // Using POST to match the backend request method
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ E_id: id }), // Sending E_id in the request body
        });
    
        // Parse the response data
        const data = await response.json();
    
        // Handle the response based on whether the request was successful or not
        if (response.ok) {
          setStatusMessage(`Success: ${data.message}\nLogout Time: ${data.logout_time}`);
        } else {
          setStatusMessage(`Error: ${data.message}`);
        }
        clearMessage();
      } catch (error) {
        console.error('Error during clock-out:', error);
        setStatusMessage('An error occurred. Please try again later.');
        clearMessage();
      }
    };


  // Fetch the user role from localStorage on component mount
  useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem('userDetails'));
    if (userDetails && userDetails.role) {
          setUserRole(userDetails.role);
        }
    }, []);


    

    const handleClockIn = async () => {
      try {
        console.log("inside try")
        // Retrieve the user details from localStorage
        const userDetails = JSON.parse(localStorage.getItem('userDetails'));
        console.log("user-details",userDetails)
        // Check if userDetails and userDetails.id are available
        if (!userDetails || !userDetails.id) {
          setStatusMessage('User details are missing. Please log in first.');
          clearMessage();
          return;
        }
    
        // Extract the ID from userDetails
        const { id } = userDetails;
        console.log("id",id)
    
        // Make the API request to clock in with the user ID
        const response = await fetch(`${import.meta.env.VITE_API_URL}dashboard/clock-in/`, {
          method: 'POST', // Changed to POST to match the backend
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ E_id: id }), // Sending E_id in the request body
        });
        console.log("response ",response)
    
        // Parse the response data
        const data = await response.json();
        console.log("data",data)
    
        // Handle the response based on whether the request was successful or not
        if (response.ok) {
          setStatusMessage(`Success:${data.message}\nLogin Time: ${data.login_time}\nShift End Time: ${data.shift_end_time}`);
          console.log("error message",{statusMessage})
        } else {
          setStatusMessage(`Error: ${data.message}`);
        }
        clearMessage();
      } catch (error) {
        console.error('Error during clock-in:', error);
        setStatusMessage('An error occurred. Please try again later.');
        clearMessage();
      }
    };
    
    const handleResetLoginAttempts = async () => {
      try {
        const userDetails = JSON.parse(localStorage.getItem('userDetails'));
  
        if (!userDetails || !userDetails.id) {
          setStatusMessage('User details are missing. Please log in first.');
          clearMessage();
          return;
        }
  
        const { id } = userDetails;
  
        const response = await fetch(`${import.meta.env.VITE_API_URL}dashboard/reset-attempts/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ E_id: id }),
        });
  
        const data = await response.json();
  
        console.log('Response:', data);
  
        if (response.ok) {
          setStatusMessage(`Success: ${data.message}\nRemaining Resets: ${data.remaining_resets}\nResets Used: ${data.reset_attempts_used}`);
        } else {
          setStatusMessage(`Error: ${data.message}`);
        }
        clearMessage();
      } catch (error) {
        console.error('Error during reset login attempts:', error);
        setStatusMessage('An error occurred. Please try again later.');
        clearMessage();
      }
    };
    

    const [formMessage, setFormMessage] = useState(null); 
  const [monthlyTarget, setMonthlyTarget] = useState(null);
  const [formData, setFormData] = useState({
    emp_id: "",
    month: "",
    year: "",
    target_value: "",
    actual_value: "",
    status: "Pending",
  });
  const [isEditMode, setIsEditMode] = useState(false);
  const [showForm, setShowForm] = useState(false); // To toggle form visibility

  // Fetch the current monthly target from the backend
  useEffect(() => {
    const fetchMonthlyTarget = async () => {
      try {
        // Retrieve userDetails from localStorage
        const userDetails = JSON.parse(localStorage.getItem("userDetails"));
        
        if (!userDetails || !userDetails.id) {
          console.error("Employee ID not found in localStorage");
          return;
        }

        const empId = userDetails.id; // Fetch emp_id from userDetails

        // Construct the URL with the emp_id query parameter
        const response = await fetch(`${import.meta.env.VITE_API_URL}dashboard/get-monthly-target/?empId=${empId}`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setMonthlyTarget(data);
      } catch (error) {
        console.error("Error fetching target:", error);
      }
    };

    fetchMonthlyTarget();
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const addMonthlyTarget = async () => {
    try {
      const userDetails = JSON.parse(localStorage.getItem("userDetails"));
      if (!userDetails || !userDetails.id) {
        setFormMessage({
          type: "error",
          text: "Employee ID not found. Please log in again.",
        });
        return;
      }
  
      const empId = userDetails.id;
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}dashboard/add-monthly-target/?emp_ID=${empId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
  
      if (!response.ok) {
        throw new Error("Failed to add monthly target");
      }
  
      const data = await response.json();
      setFormMessage({ type: "success", text: data.message });
      setTimeout(() => {
        setShowForm(false);
        window.location.reload();
      }, 2000); // Close after 2 seconds
    } catch (error) {
      console.error("Error adding target:", error);
      setFormMessage({
        type: "error",
        text: "An error occurred while adding the monthly target.",
      });
    }
  };

  const updateMonthlyTarget = async () => {
    try {
      const userDetails = JSON.parse(localStorage.getItem("userDetails"));
      if (!userDetails || !userDetails.id) {
        setFormMessage({
          type: "error",
          text: "Employee ID not found. Please log in again.",
        });
        return;
      }
  
      const empId = userDetails.id;
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}dashboard/update-monthly-target/?emp_ID=${empId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
  
      if (!response.ok) {
        throw new Error("Failed to update monthly target");
      }
  
      const data = await response.json();
      setFormMessage({ type: "success", text: data.message });
      setTimeout(() => {
        setShowForm(false);
        window.location.reload();
      }, 2000); // Close after 2 seconds
    } catch (error) {
      console.error("Error updating target:", error);
      setFormMessage({
        type: "error",
        text: "An error occurred while updating the monthly target.",
      });
    }
  };

    return (
    <div className='outer '>
        <div className='header'>
            
            <img src={logo}className='logo'></img> 
            <img src={logo1}className='logo1-mobile'></img> 

            
        <div>
            <h1 className='title-bar-dashboard '><Link to="/dashboard">Home</Link></h1>
        </div>
        <div>
            <p className='title-bar-dashboard'><Link to="/about">About</Link></p>
        </div>
        <div>
            <p className='title-bar-dashboard'><Link to="/flowchart">Designation</Link></p>
        </div>
        <div>
            <p className='title-bar-dashboard'><Link to="/clock-in-out">Clock-In/Out</Link></p>
        </div>
        <div>
            <p className='title-bar-dashboard-profile' onClick={gotoprofile}><CgProfile className='profile-icon-dashboard'/></p>
            <p className="login-user-name-profile">Hi {userName}</p>
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
            <Link to="/profile" onClick={() => setIsMobileMenuOpen(false)}><p>Profile</p></Link>
            <Link to="/logout" onClick={() => setIsMobileMenuOpen(false)}>Logout</Link>
          </div>
        )}
            <div className='menu-dashboard'>
                    <div className='menu-step1-dashboard'>
                        {/* <div className='first-box1'>
                            <div className='total-employee-dashboard '>Resigned Employee</div>
                            <div className='t-number'>
                                <p>2500</p>
                            </div>
                            <div className='t-text'>
                                <p>compared to journey</p>
                            </div>
                        </div> */}
                        <div className='first-box11'>
                            <div className='total-employee-dashboard'>New joiners</div>
                            <div><p className='t-number'>{newJoiners}</p></div>
                            <div><p className='t-text'>Joined in {joinMonth}</p></div>
                        </div>
                        <div className='first-box11'><div className='total-employee-dashboard'>On leaves</div>
                            <div className='t-number'>
                                <p>{leaveCount}</p>
                            </div>
                            <div className='t-text'>
                            {lastRefreshTime && (
                              <p>On: {lastRefreshTime.toLocaleString()}</p>
                              )}
                            </div></div>
                        <div className='first-box11'><div className='total-employee-dashboard'>Total employees</div>
                            <div className='t-number'>
                                <p>{totalEmployees} </p>
                            </div>
                            <div className='t-text'>
                                <p>compared to {month}</p>
                            </div></div>
                    </div>


                    <div>
                        <div><p className='row2-text'>Statistics (Project Metrics)</p></div>
                        <div className='row2'>
                            <div className='second-box1 '>
                                <div><p>Clock-In-Out</p></div>
                                <div>
                                  <div className='timer'>
                                    {statusMessage && (
                                      <p style={{ color: "green", marginTop: "1px", fontSize: "14px" }}>
                                        {statusMessage}
                                      </p>
                                  )}
                                </div>
                                <div className='timer-btn'>
                                    <button className="btn" onClick={handleClockIn}>Login</button>
                                    <button className='btn' onClick={handleClockOut}>Logout</button>
                                    { (userRole === 'HR' || userRole === 'Admin') && <button className='btn' onClick={handleResetLoginAttempts}>Reset</button>}
                                    
                                      
                                    
                                </div>
                                </div>
                            </div>

                            <div className="dashboard-container">
                              {/* Display Summary */}
                              <div className="dashboard-summary">
                                <h2>Monthly Target</h2>
                                <p>
                                  {monthlyTarget
                                    ? `${monthlyTarget.actual_value}/${monthlyTarget.target_value}`
                                    : "No target set"}
                                </p>
                              </div>
                              {/* Buttons */}
                              <div className="dashboard-buttons">
                              {(userRole === 'HR' || userRole === 'Admin')&&(
                                <button
                                  onClick={() => {
                                    setIsEditMode(false);
                                    setShowForm(true);
                                  }}
                                >
                                  Add
                                </button>)}
                                {(userRole === 'HR' || userRole === 'Admin')&&(
                                <button
                                  onClick={() => {
                                    setIsEditMode(true);
                                    setShowForm(true);
                                  }}
                                >
                                  Update
                                </button>
                                )}
                              </div>
                              {/* Modal/Popup Form */}
                              {showForm && (
                                <div className="form-modal">
                                  <h3>{isEditMode ? "Update Monthly Target" : "Add Monthly Target"}</h3>
                                  <form
                                    onSubmit={(e) => {
                                      e.preventDefault();
                                      isEditMode ? updateMonthlyTarget() : addMonthlyTarget();
                                    }}
                                  >

                                    {/* Only show the 'month' and 'year' fields if it's the "Add" form */}
                                    {!isEditMode && (
                                      <>
                                        <input
                                          type="text"
                                          name="month"
                                          placeholder="Month"
                                          value={formData.month}
                                          onChange={handleChange}
                                          required
                                        />
                                        <input
                                          type="text"
                                          name="year"
                                          placeholder="Year"
                                          value={formData.year}
                                          onChange={handleChange}
                                          required
                                        />
                                      </>
                                    )}
                                    <input
                                      type="number"
                                      name="target_value"
                                      placeholder="Target Value"
                                      value={formData.target_value}
                                      onChange={handleChange}
                                    />
                                    <input
                                      type="number"
                                      name="actual_value"
                                      placeholder="Actual Value"
                                      value={formData.actual_value}
                                      onChange={handleChange}
                                    />
                                    <div className="modal-buttons">
                                      <button
                                        type="button"
                                        onClick={() => setShowForm(false)}
                                        className="cancel-button"
                                      >
                                        Cancel
                                      </button>
                                      <button type="submit">
                                        {isEditMode ? "Update" : "Add"}
                                      </button>
                                    </div>
                                    {/* Message Display */}
                                    {formMessage && (
                                      <div className={`form-message ${formMessage.type}`}>
                                        {formMessage.text}
                                      </div>
                                    )}
                                  </form>
                                </div>
                              )}
                            </div>
                        </div>
                    </div>
                    
                    <div className='third-row'>
                        <div className='third-box1'>
                            <div className='box1-heading'>
                                <p>Announcement</p>
                                {lastRefreshTime && (
                              <p>{lastRefreshTime.toLocaleString()}</p>
                              )}
                            </div>
                            <div className='annonce-boxes'>
                                <div>
                                    <h5>Outing schedule for every department</h5>
                                    <p>5 minutes ago</p>
                                </div>
                                <div className='box1-divs'>
                                    <div className='pin-menu'><BsFillPinAngleFill /></div>
                                    <div className='pin-menu'><CiMenuKebab /></div>
                                </div>
                            </div>
                            <div className='annonce-boxes'>
                                <div>
                                    <h5>IT Department need two more talents for UX/UI</h5>
                                    <p>5 minutes ago</p>
                                </div>
                                <div className='box1-divs'>
                                    <div className='pin-menu'><BsFillPinAngleFill /></div>
                                    <div className='pin-menu'><CiMenuKebab /></div>
                                </div>
                            </div>
                            <div className='annonce-boxes'>
                                <div>
                                    <h5>Meeting HR Department</h5>
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
                                <div><h2>Upcoming Schedule</h2></div>
                                <div>{lastRefreshTime && (
                              <p>{lastRefreshTime.toLocaleString()}</p>
                              )}</div>
                            </div>

                            <div className="wrapper">
                                <input
                                    type="text"
                                    placeholder="Type a message and press Enter"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    onKeyDown={handleKeyPress}
                                />
                                <div className="chat-container">
                                    <h3>Messages</h3>
                                    {messages.map((msg, index) => (
                                    <p key={index} className="message-box">
                                        <strong>{msg.text}</strong>
                                        <br />
                                        <small>{msg.timestamp}</small>
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
