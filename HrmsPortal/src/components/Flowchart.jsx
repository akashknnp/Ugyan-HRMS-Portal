import React from 'react'
import { useRef} from 'react';
import { TfiDashboard } from "react-icons/tfi";
import { IoPeopleOutline } from "react-icons/io5";
import { BiCategory } from "react-icons/bi";
import { IoLogOutOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom'
import logo from "../assets/UGYAN1.png";
import logo1 from "../assets/ugyanlogoo.jpg"
// import logo from "../assets/ugyanlogobg.png"
// import logo from "../assets/ugyanlogobg_enhanced-transformed.png";
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
import { GiHamburgerMenu } from "react-icons/gi";  
import { useState,useEffect } from 'react';
import { CgProfile } from "react-icons/cg";
import "../Flowchart.css"
import image from "../assets/ugyanlogoocrop.jpg";

const flowchart = () => {
  const [responseMessage, setResponseMessage] = useState("");
  const [showPopupDelete, setShowPopupDelete] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [eId, setEId] = useState("");
  const [userRole, setUserRole] = useState('');  // Logged-in user's role
  
    // Simulate fetching user role from authentication/session
    useEffect(() => {
      const roleFromSession = localStorage.getItem('userRole');// Simulate getting from session
      if (roleFromSession) {
        setUserRole(roleFromSession);  // Set role from session/local storage
      } else {
        // If no role found, set default or handle authentication redirection
        setUserRole(''); 
      }
    }, []);

  const handleDelete = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}designation/delete_designation/`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ E_id: eId }),
      });

      const data = await response.json();

      if (response.ok) {
        setResponseMessage(data.message);
      } else {
        setResponseMessage(data.error || "An error occurred.");
      }
    } catch (error) {
      setResponseMessage("Error: Unable to delete designation.");
    }

    // Close the popup after submission
    setShowPopupDelete(false);
    setEId(""); // Clear the input field
  };


  const [formData, setFormData] = useState({
    E_id: "",
    name: "",
    designation: "",
    department: "",
    reports_to: "",
});

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
        ...prevData,
        [name]: value,
    }));
};

// Handle form submission
const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}designation/add/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );

    const data = await response.json();

    if (response.ok) {
      setResponseMessage(data.message);
      setFormData({
        E_id: "",
        name: "",
        designation: "",
        department: "",
        reports_to: "",
      });
      setShowForm(false); // Close the popup
    } else {
      setResponseMessage(data.message || "An error occurred.");
    }
  } catch (error) {
    setResponseMessage("Error: Unable to submit the form.");
  }
};
    const [userName, setUserName] = useState('');useEffect(() => {
        const storedUserDetails = localStorage.getItem('userDetails');
        if (storedUserDetails) {
          const userDetails = JSON.parse(storedUserDetails); // Parse userDetails from JSON
          if (userDetails && userDetails.first_name) {
            setUserName(userDetails.first_name); // Update the userName with the name from userDetails
          }
        }
      }, []);

    const navigate = useNavigate();

    const gotoprofile = (event) => {
        event.preventDefault();  
        navigate('/profile');
    }

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Toggle mobile menu
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const [floorManagers, setFloorManagers] = useState([]);
  const [verticalManagers, setVerticalManagers] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedManager, setSelectedManager] = useState(null);
  
  const founders = [
    {
      name: "Leela Krishna Vaka",
      details: "Founder Of UGyan Edutech",
    },
    {
      name: "Aswini Thakkellapati",
      details: "Founder Of UGyan Edutech",
    },
  ];

  // State to hold the selected founder's details and modal visibility
  const [selectedFounder, setSelectedFounder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleFounderClick = (index) => {
    setSelectedFounder(founders[index]);
    setIsModalOpen(true); // Open modal when a founder is clicked
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close modal
  };
  // Fetch floor managers data
  const fetchFloorManagers = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}designation/floormanager/`);
      if (response.ok) {
        const data = await response.json();
        setFloorManagers(data);
        setShowPopup(true);
      } else {
        console.error("Failed to fetch floormanager data");
      }
    } catch (error) {
      console.error("Error fetching floormanager data:", error);
    }
  };

  // Fetch vertical managers data for a selected floor manager
  const fetchVerticalManagers = async (e_id, name) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}designation/verticalmanagers-by-id/?e_id=${e_id}`
      );
      if (response.ok) {
        const data = await response.json();
        setVerticalManagers(data);
        setSelectedManager({ e_id, name }); // Set the selected floor manager with name and ID
      } else {
        console.error("Failed to fetch vertical manager data");
      }
    } catch (error) {
      console.error("Error fetching vertical manager data:", error);
    }
  };

  const [verticalManagers1, setVerticalManagers1] = useState([]);
  const [teamLeaders1, setTeamLeaders1] = useState([]);
  const [selectedManager1, setSelectedManager1] = useState(null);
  const [showPopup1, setShowPopup1] = useState(false);

  // Function to fetch Vertical Managers
  const fetchVerticalManagers1 = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}designation/verticalmanager/`);
      if (response.ok) {
        const data = await response.json();
        setVerticalManagers1(data);
        setShowPopup1(true); // Show popup after fetching the vertical managers
      } else {
        console.error("Failed to fetch vertical managers:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching vertical managers:", error);
    }
  };

  // Function to fetch Team Leaders for a selected Vertical Manager
  const fetchTeamLeaders1 = async (e_id, name) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}designation/teamleaders-by-id/?e_id=${e_id}`);
      if (response.ok) {
        const data = await response.json();
        setTeamLeaders1(data);
        setSelectedManager1({ E_id: e_id, name: name }); // Use consistent keys
      } else {
        console.error("Failed to fetch team leaders:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching team leaders:", error);
    }
  };

  // Handle Vertical Manager click to fetch vertical managers
  const handleVerticalManagerClick1 = () => {
    fetchVerticalManagers1();
  };

  // Handle Team Leader click (selected vertical manager's team)
  const handleTeamLeaderClick1 = (e_id, name) => {
    fetchTeamLeaders1(e_id, name);
  };


// teamleader and atl-----------------------------------
// State variables for Team Leaders and ATLs
const [teamLeaders2, setTeamLeaders2] = useState([]);
const [atl2, setAtl2] = useState([]);
const [selectedManager2, setSelectedManager2] = useState(null);
const [showPopup2, setShowPopup2] = useState(false);



  // Function to fetch Team Leaders
const fetchTeamLeaders2 = async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}designation/teamleaders/`);
    if (response.ok) {
      const data = await response.json();
      setTeamLeaders2(data);
      setShowPopup2(true); // Show popup after fetching the team leaders
    } else {
      console.error('Failed to fetch team leaders:', response.statusText);
    }
  } catch (error) {
    console.error('Error fetching team leaders:', error);
  }
};

// Function to fetch ATLs for a selected Team Leader
const fetchAtl2 = async (e_id, name) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}designation/atl-by-id/?e_id=${e_id}`);
    if (response.ok) {
      const data = await response.json();
      setAtl2(data);
      setSelectedManager2({ E_id: e_id, name: name }); // Set the selected manager for the popup
    } else {
      console.error('Failed to fetch ATLs:', response.statusText);
    }
  } catch (error) {
    console.error('Error fetching ATLs:', error);
  }
};


  // Handle Team Lead node click to fetch team leaders
const handleTeamLeaderClick2 = () => {
  fetchTeamLeaders2();
};

// Handle ATL click to fetch ATLs for the selected team leader
const handleAtlClick2 = (e_id, name) => {
  fetchAtl2(e_id, name);
};
// -------------------------------------------------------------------
const [showPopup3, setShowPopup3] = useState(false); // For ATL popup visibility
const [selectedManager3, setSelectedManager3] = useState(null); // For selected ATL
const [atl3, setAtl3] = useState([]); // List of ATLs
const [bda3, setBda3] = useState([]); // List of BDAs under ATL




const handleAtlClick3 = async () => {
  try {
    // Fetch the list of ATLs from the server
    const response = await fetch(`${import.meta.env.VITE_API_URL}designation/atls/`); // Replace with your API endpoint
    const data = await response.json();

    if (response.ok) {
      setAtl3(data); // Update state with the fetched ATL list
      setShowPopup3(true); // Show the popup
    } else {
      console.error('Failed to fetch ATLs:', data.message);
    }
  } catch (error) {
    console.error('Error fetching ATLs:', error);
  }
};

const handleBdaClick3 = async (e_id, name) => {
  try {
    // Fetch the BDAs under a specific ATL
    const response = await fetch(`${import.meta.env.VITE_API_URL}designation/bda-by-id/?e_id=${e_id}`); // Replace with your API endpoint
    const data = await response.json();

    if (response.ok) {
      setBda3(data); // Update state with the fetched BDA list
      setSelectedManager3({ E_id: e_id, name }); // Set the selected ATL
    } else {
      console.error('Failed to fetch BDAs:', data.message);
    }
  } catch (error) {
    console.error('Error fetching BDAs:', error);
  }
};

const [ceoDetails, setCeoDetails] = useState([]);
  const [showDetails, setShowDetails] = useState(false);

  // Function to fetch CEO data
  const fetchCeoDetails = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}designation/ceo/`); // Assuming your endpoint is /get-ceo
      const data = await response.json();
      
      if (response.ok) {
        setCeoDetails(data); // Update state with the CEO data
        setShowDetails(true); // Show the CEO details
      } else {
        console.error('Failed to fetch CEO details');
      }
    } catch (error) {
      console.error('Error fetching CEO details:', error);
    }
  };

  const [ctoDetails, setCtoDetails] = useState([]);
  const [showCtoDetails, setShowCtoDetails] = useState(false);

  // Function to fetch CTO data
  const fetchCtoDetails = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}designation/cto/`); // Assuming your endpoint is /get-cto
      const data = await response.json();
      
      if (response.ok) {
        setCtoDetails(data); // Update state with the CTO data
        setShowCtoDetails(true); // Show the CTO details
      } else {
        console.error('Failed to fetch CTO details');
      }
    } catch (error) {
      console.error('Error fetching CTO details:', error);
    }
  };


  const [cooDetails, setCooDetails] = useState([]);
  const [showCooDetails, setShowCooDetails] = useState(false);
  const popupRef = useRef(null);// Reference to the popup div
  const scrollContainerRef = useRef(null);

  // Function to fetch COO data
  const fetchCooDetails = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}designation/coo/`);
      const data = await response.json();
      
      if (response.ok) {
        setCooDetails(data);
        setShowCooDetails(true); // Show the COO details
      } else {
        console.error('Failed to fetch COO details');
      }
    } catch (error) {
      console.error('Error fetching COO details:', error);
    }
  };

  // Use effect to handle clicking outside the popup
  const closeAllPopups = () => {
    setShowCooDetails(false);
    setCeoDetails(false);
    setCfoDetails(false);
    setCtoDetails(false);
    setShowPopup(false);
    setSelectedManager(false);
    setSelectedManager1(false);
    setSelectedManager2(false);
    setSelectedManager3(false);
    setIsModalOpen(false);
    setShowPopupBDA(false);
    setShowPopup1(false);
    setShowPopup2(false);
    setShowPopup3(false);
    
  };
  
  // Function to handle click outside the popup
  const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      closeAllPopups();
    }
  };
  
  // Function to handle scroll event
  const handleScroll = () => {
    console.log("scrolling");
    closeAllPopups(); // Close all popups when user scrolls
  };
  
  // useEffect to add event listeners
  useEffect(() => {
    // Add event listener for clicks outside the popup
    document.addEventListener('mousedown', handleClickOutside);
  
    // Add event listener for scroll event on the specific scrollable container
    if (scrollContainerRef.current) {
      scrollContainerRef.current.addEventListener('scroll', handleScroll);
    }
  
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      if (scrollContainerRef.current) {
        scrollContainerRef.current.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);// Empty dependency array ensures the effect is only applied once

  const [cfoDetails, setCfoDetails] = useState([]);
  const [showCfoDetails, setShowCfoDetails] = useState(false);

  // Function to fetch CFO data
  const fetchCfoDetails = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}designation/cfo/`); // Endpoint for fetching CFO data
      const data = await response.json();

      if (response.ok) {
        setCfoDetails(data); // Update state with CFO data
        setShowCfoDetails(true); // Show the details popup
      } else {
        console.error('Failed to fetch CFO details');
      }
    } catch (error) {
      console.error('Error fetching CFO details:', error);
    }
  };

  const [showPopupBDA, setShowPopupBDA] = useState(false);
  const [bdaList, setBdaList] = useState([]); // Stores fetched BDA data
  

  // Fetch BDA data from the backend
  const fetchBdaData = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}designation/bda/`); // Replace with your API endpoint
      if (!response.ok) {
        throw new Error('Failed to fetch BDA data');
      }
      const data = await response.json();
      setBdaList(data); // Assume the response is an array of BDAs
      setShowPopupBDA(true);
    } catch (error) {
      console.error('Error fetching BDA data:', error);
    }
  };

    return (
    <div className='outer-flowchart'>
        <div className='header-flowchart'>
            
        <img src={logo}className='logo'></img> 
        <img src={logo1}className='logo1-mobile'></img> 
            
        <div>
            <h1 className='title-bar-flowchart'><Link to="/dashboard">Home</Link></h1>
        </div>
        <div>
            <p className='title-bar-flowchart'><Link to="/about">About</Link></p>
        </div>
        <div>
            <p className='title-bar-flowchart'><Link to="/flowchart">Designation</Link></p>
        </div>
        <div>
        <p className='title-bar-dashboard'><Link to="/clock-in-out">Clock-In/Out</Link></p>
        </div>
        <div>
            <p className='title-bar-dashboard-profile' onClick={gotoprofile}><CgProfile className='profile-icon-dashboard'/></p>
            <p className="login-user-name-profile">Hi {userName}</p>
        </div>
        <div className="mobile-menu-icon-flowchart" onClick={toggleMobileMenu}>
            <GiHamburgerMenu />
        </div>
        </div>
        
        <div className='main-flowchart'>
            <div className='side-bar-flowchart'>
                {/* <h3 className='text-white text-6xl text-center bg-gradient-to-tl from-black to-slate-400 p-4'><img src={logo}className='bg-white'></img> */}
                {/* <Link to="/dashboard"> <div><h3 className='features-flowchart'><TbLayoutDashboardFilled className='dash-flowchart'/>Dashboard</h3></div></Link> */}
                <Link to="/employee"><div><h3 className='features-flowchart'><MdPerson className='dash-flowchart'/>Employee </h3></div></Link>
                <Link to="/recruitment"><div><h3 className='features-flowchart'><IoIosPeople className='dash-flowchart'/>Recruitment</h3></div></Link>
                <Link to="/calender"><div><h3 className='features-flowchart'><SlCalender className='dash-flowchart'/>Calender</h3></div></Link>
                <Link to="/payroll"><div><h3 className='features-flowchart'><FaMoneyCheckDollar className='dash-flowchart'/>Payroll</h3></div></Link>
                <Link to="/timeoff"><div><h3 className='features-flowchart'><BiCalendarExclamation className='dash-flowchart'/>Time off</h3></div></Link>
                <Link to="/performance"><div><h3 className='features-flowchart'><GrDocumentPerformance className='dash-flowchart'/>Performance</h3></div></Link>
                <Link to="/communication"><div><h3 className='features-flowchart'><FaRegFileAlt className='dash-flowchart'/>Communication</h3></div></Link>
                <Link to="/settings"><div><h3 className='features-flowchart'><IoSettingsOutline className='dash-flowchart'/>Settings</h3></div></Link>
                <Link to="/logout"><div><h3 className='features-flowchart'><CgLogOut className='dash-flowchart'/>Logout</h3></div></Link>
            </div>
            
            {isMobileMenuOpen && (
          <div className="mobile-dropdown-flowchart">
            <Link to="/employee" onClick={() => setIsMobileMenuOpen(false)}>Employee</Link>
            <Link to="/recruitment" onClick={() => setIsMobileMenuOpen(false)}>Recruitment</Link>
            <Link to="/calender" onClick={() => setIsMobileMenuOpen(false)}>Calendar</Link>
            <Link to="/payroll" onClick={() => setIsMobileMenuOpen(false)}>Payroll</Link>
            <Link to="/timeoff" onClick={() => setIsMobileMenuOpen(false)}>Time off</Link>
            <Link to="/performance" onClick={() => setIsMobileMenuOpen(false)}>Performance</Link>
            <Link to="/communication" onClick={() => setIsMobileMenuOpen(false)}>Communication</Link>
            <Link to="/settings" onClick={() => setIsMobileMenuOpen(false)}>Settings</Link>
            <Link to="/profile" onClick={() => setIsMobileMenuOpen(false)}>Profile</Link>
            <Link to="/logout" onClick={() => setIsMobileMenuOpen(false)}>Logout</Link>
          </div>
        )}
        
        
        <div className="flowchart-container" ref={scrollContainerRef}>

          <div className='image-flow-designation'>
            <img src={image} className='appear'/>
          </div>

       
          {(userRole === 'HR' || userRole === 'Admin')&&(
            <div className="add-designation-container">
              <div className="button_add_designation">
               {/* Button to toggle popup */}
                <button
                    className="add-designation-toggle-btn"
                    onClick={() => {
                    setShowForm(!showForm);
                     if (!showForm) setResponseMessage(""); 
                    }}
                >
                 {showForm ? "Close Form" : "Add Designation"}
                 </button>
              </div>

              {/* Popup Form */}
              {showForm && (
              <div className="popup-overlay" onClick={() => setShowForm(false)}>
                <div
                  className="popup-form"
                  onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the form
                >
                  <button
              className="close-popup-btn"
              onClick={() => setShowForm(false)}
            >
              &times;
            </button>
            <form
              className="add-designation-form"
              onSubmit={(e) => {
                handleSubmit(e); // Call the form submission logic
              }}
            >
              <div>
                <label>E_id:</label>
                <input
                  type="text"
                  name="E_id"
                  value={formData.E_id}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label>Name:</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label>Designation:</label>
                <select
                  name="designation"
                  value={formData.designation}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>
                    Select Designation
                  </option>
                  <option value="CEO">CEO</option>
                  <option value="CTO">CTO</option>
                  <option value="COO">COO</option>
                  <option value="CFO">CFO</option>
                  <option value="Floor-manager">Floor-manager</option>
                  <option value="Vertical-manager">Vertical-manager</option>
                  <option value="Team-leader">Team-leader</option>
                  <option value="Assistant-team-leader">Assistant-team-leader</option>
                  <option value="Business-development-associate">
                    Business-development-associate
                  </option>
                  
                </select>
              </div>
              <div>
                <label>Department:</label>
                <input
                  type="text"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label>Reports To:</label>
                <input
                  type="text"
                  name="reports_to"
                  value={formData.reports_to}
                  onChange={handleChange}
                />
              </div>
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
       )}
    </div>
        )}

{(userRole === 'HR' || userRole === 'Admin')&&(
    <div>
      <div className="button_delete_designation">
      {/* Button to open popup */}
      <button onClick={() => setShowPopupDelete(true)} className="delete-designation-btn">
        Delete Designation
      </button>
      </div>

      {/* Popup Form */}
      {showPopupDelete && (
        <div className="popup-overlay" onClick={() => setShowPopupDelete(false)}>
          <div
            className="popup-form"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the form
          >
            <button className="close-popup-btn" onClick={() => setShowPopupDelete(false)}>
              &times;
            </button>
            <form onSubmit={handleDelete}>
              <div>
                <label htmlFor="eId">E_id:</label>
                <input 
                  type="text"
                  id="eId"
                  value={eId}
                  onChange={(e) => setEId(e.target.value)}
                  required
                />
              </div>
              <button  type="submit">Delete</button>
            </form>
          </div>
        </div>
      )}     
    </div>)}
    
    <div className='flowchart-here'>
   
      {/* Nodes */}
      
      <div className="node cofounder1" onClick={() => handleFounderClick(0)} style={{ cursor: "pointer" }}>Co-Founder 1</div>
      <div className="node cofounder2" onClick={() => handleFounderClick(1)} style={{ cursor: "pointer" }}>Co-Founder 2</div>

      {isModalOpen && (
  <div
    ref={popupRef} 
    className={selectedFounder?.name === 'Leela Krishna Vaka' ? 'krishna' : selectedFounder?.name === 'Aswini Thakkellapati' ? 'aswini' : ''}
  >
    <b><h3>{selectedFounder?.name}</h3></b>
    <p>{selectedFounder?.details}</p>
  </div>
)}

      <div className="node ceo" onClick={fetchCeoDetails} style={{ cursor: 'pointer' }}>
        CEO
      </div>

      {/* Display CEO details */}
      {showDetails && ceoDetails.length > 0 && (
        <div className="popup-ceo-flowchart" ref={popupRef}>
          <h3>CEO Details</h3>
          <ul>
            {ceoDetails.map((ceo) => (
              <li key={ceo.E_id}>
                <strong>{ceo.name}</strong> ({ceo.E_id}) <br />
                <small>Designation: {ceo.designation}</small>
              </li>
            ))}
          </ul>
          <button onClick={() => setShowDetails(false)}>Close</button>
        </div>
      )}
      <div className="node cto" onClick={fetchCtoDetails} style={{ cursor: 'pointer' }}>
        CTO
      </div>

      {/* Display CTO details */}
      {showCtoDetails && ctoDetails.length > 0 && (
        <div className="cto-details-popup" ref={popupRef}>
          <h3>CTO Details</h3>
          <ul>
            {ctoDetails.map((cto) => (
              <li key={cto.E_id}>
                <strong>{cto.name}</strong> ({cto.E_id}) <br />
                <small>Designation: {cto.designation}</small>
              </li>
            ))}
          </ul>
          <button onClick={() => setShowCtoDetails(false)}>Close</button>
        </div>
      )}
      <div className="node coo" onClick={fetchCooDetails} style={{ cursor: 'pointer' }}>
        COO
      </div>

      {/* Display COO details */}
      {showCooDetails && cooDetails.length > 0 && (
        <div className="cto-details-popup" ref={popupRef}>
          <h3>COO Details</h3>
          <ul>
            {cooDetails.map((coo) => (
              <li key={coo.E_id}>
                <strong>{coo.name}</strong> ({coo.E_id}) <br />
                <small>Designation: {coo.designation}</small>
              </li>
            ))}
          </ul>
          <button onClick={() => setShowCooDetails(false)}>Close</button>
        </div>
      )}
      <div className="node cfo" onClick={fetchCfoDetails} style={{ cursor: 'pointer' }}>
        CFO
      </div>

      {/* Display CFO details in a popup */}
      {showCfoDetails && cfoDetails.length > 0 && (
        <div className="cfo-details-popup" ref={popupRef}>
          <h3>CFO Details</h3>
          <ul>
            {cfoDetails.map((cfo) => (
              <li key={cfo.E_id}>
                <strong>{cfo.name}</strong> ({cfo.E_id}) <br />
                <small>Designation: {cfo.designation}</small>
              </li>
            ))}
          </ul>
          <button onClick={() => setShowCfoDetails(false)}>Close</button>
        </div>
      )}
      <div className="node floor-manager" onClick={fetchFloorManagers} style={{ cursor: 'pointer' }}>
        Floor Manager
      </div>

      {/* Floor Managers Popup */}
      {showPopup && !selectedManager && (
        <div className="popup-flowchart" ref={popupRef}>
          <div className="popup-content-flowchart" ref={popupRef}>
            <h3>Floor Managers</h3>
            <ul>
              {floorManagers.map((manager) => (
                <li
                  key={manager.E_id}
                  style={{ cursor: "pointer", marginBottom: "10px" }}
                  onClick={() => fetchVerticalManagers(manager.E_id, manager.name)}
                >
                  <strong>{manager.name}</strong> ({manager.E_id})
                </li>
              ))}
            </ul>
            <button onClick={() => setShowPopup(false)}>Close</button>
          </div>
        </div>
      )}

      {/* Vertical Managers Popup */}
      {selectedManager && (
        <div className="popup-flowchart" ref={popupRef}>
          <div className="popup-content-flowchart" ref={popupRef}>
            <h3>
              Vertical Managers for {selectedManager.name} ({selectedManager.e_id})
            </h3>
            <ul>
              {verticalManagers.map((manager) => (
                <li key={manager.E_id}>
                  <strong>{manager.name}</strong> ({manager.E_id})
                  <br />
                  <small>
                    Designation: {manager.designation} <br />
                    Department: {manager.department} <br />
                    Reports To: {selectedManager.name} ({manager.reports_to || "N/A"})
                  </small>
                </li>
              ))}
            </ul>
            <button onClick={() => setSelectedManager(null)}>Back</button>
          </div>
        </div>
      )}

      <div className="node vertical-manager" onClick={handleVerticalManagerClick1} style={{ cursor: 'pointer' }}>
        Vertical Manager
      </div>

      {/* Vertical Managers Popup */}
      {showPopup1 && !selectedManager1 && (
        <div className="popup-flowchart" ref={popupRef}>
          <div className="popup-content-flowchart" ref={popupRef}>
            <h3>Vertical Managers</h3>
            <ul>
              {verticalManagers1.map((manager) => (
                <li
                  key={manager.E_id}
                  style={{ cursor: "pointer", marginBottom: "10px" }}
                  onClick={() => handleTeamLeaderClick1(manager.E_id, manager.name)}
                >
                  <strong>{manager.name}</strong> ({manager.E_id})
                </li>
              ))}
            </ul>
            <button onClick={() => setShowPopup1(false)}>Close</button>
          </div>
        </div>
      )}

      {/* Team Leaders Popup */}
      {selectedManager1 && (
        <div className="popup-flowchart" ref={popupRef}>
          <div className="popup-content-flowchart" ref={popupRef}>
            <h3>
              Team Leaders for {selectedManager1.name} ({selectedManager1.E_id})
            </h3>
            <ul>
              {teamLeaders1.map((leader) => (
                <li key={leader.E_id}>
                  <strong>{leader.name}</strong> ({leader.E_id})
                  <br />
                  <small>
                    Designation: {leader.designation} <br />
                    Department: {leader.department} <br />
                    Reports To: {selectedManager1.name} ({leader.reports_to || "N/A"})
                  </small>
                </li>
              ))}
            </ul>
            <button onClick={() => setSelectedManager1(null)}>Back</button>
          </div>
        </div>
      )}

<div className="node team-lead" onClick={handleTeamLeaderClick2} style={{ cursor: 'pointer' }}>
  Team Lead
</div>

{/* Team Leaders Popup */}
{showPopup2 && !selectedManager2 && (
  <div className="popup-flowchart" ref={popupRef}>
    <div className="popup-content-flowchart" ref={popupRef}>
      <h3>Team Leaders</h3>
      <ul>
        {teamLeaders2.map((manager) => (
          <li
            key={manager.E_id}
            style={{ cursor: 'pointer', marginBottom: '10px' }}
            onClick={() => handleAtlClick2(manager.E_id, manager.name)}
          >
            <strong>{manager.name}</strong> ({manager.E_id})
          </li>
        ))}
      </ul>
      <button onClick={() => setShowPopup2(false)}>Close</button>
    </div>
  </div>
)}

{/* ATLs Popup */}
{selectedManager2 && (
  <div className="popup-flowchart" ref={popupRef}>
    <div className="popup-content-flowchart" ref={popupRef}>
      <h3>
        ATLs for {selectedManager2.name} ({selectedManager2.E_id})
      </h3>
      <ul>
        {atl2.map((atl) => (
          <li key={atl.E_id}>
            <strong>{atl.name}</strong> ({atl.E_id})
            <br />
            <small>
              Designation: {atl.designation} <br />
              Department: {atl.department} <br />
              Reports To: {selectedManager2.name} ({atl.reports_to || 'N/A'})
            </small>
          </li>
        ))}
      </ul>
      <button onClick={() => setSelectedManager2(null)}>Back</button>
    </div>
  </div>
)}
<div className="node ATL" onClick={handleAtlClick3} style={{ cursor: 'pointer' }}>
  Assistant Team Lead
</div>

{/* Assistant Team Leads Popup */}
{showPopup3 && !selectedManager3 && (
  <div className="popup-flowchart" ref={popupRef}>
    <div className="popup-content-flowchart" ref={popupRef}>
      <h3>Assistant Team Leads</h3>
      <ul>
        {atl3.map((manager) => (
          <li
            key={manager.E_id}
            style={{ cursor: 'pointer', marginBottom: '10px' }}
            onClick={() => handleBdaClick3(manager.E_id, manager.name)}
          >
            <strong>{manager.name}</strong> ({manager.E_id})
          </li>
        ))}
      </ul>
      <button onClick={() => setShowPopup3(false)}>Close</button>
    </div>
  </div>
)}

{/* Business Development Associates Popup */}
{selectedManager3 && (
  <div className="popup-flowchart" ref={popupRef}>
    <div className="popup-content-flowchart" ref={popupRef}>
      <h3>
        BDAs for {selectedManager3.name} ({selectedManager3.E_id})
      </h3>
      <ul>
        {bda3.map((bda) => (
          <li key={bda.E_id}>
            <strong>{bda.name}</strong> ({bda.E_id})
            <br />
            <small>
              Designation: {bda.designation} <br />
              Department: {bda.department} <br />
              Reports To: {selectedManager3.name} ({bda.reports_to || 'N/A'})
            </small>
          </li>
        ))}
      </ul>
      <button onClick={() => setSelectedManager3(null)}>Back</button>
    </div>
  </div>
)}
<div className="BDA no-gap" onClick={fetchBdaData} style={{ cursor: 'pointer' }}>
  Bussiness Development Associate
</div>
{showPopupBDA && (
        <div className="popup-flowchart" ref={popupRef}>
          <div className="popup-content-flowchart" ref={popupRef}>
            <h3>Business Development Associates</h3>
            <ul>
              {bdaList.map((bda) => (
                <li
                  key={bda.E_id}
                  style={{ cursor: 'pointer', marginBottom: '10px' }}
                >
                  <strong>{bda.name}</strong> ({bda.E_id})
                </li>
              ))}
            </ul>
            <button onClick={() => setShowPopupBDA(false)}>Close</button>
          </div>
        </div>
      )}
</div>

      {/* Arrows */}
      <div className="arrow vertical arrow-cofounder1"></div>
      <div className="arrow vertical arrow-cofounder2"></div>
      <div className="arrow vertical arrow-ceo"></div>
      <div className="arrow vertical arrow-cto"></div>
      <div className="arrow vertical arrow-coo"></div>
      <div className="arrow vertical arrow-cfo"></div>
      <div className="arrow vertical arrow-floor-manager"></div>
      <div className="arrow vertical arrow-team-lead"></div>
      <div className="arrow vertical arrow-ATL"></div>
      <div className="arrow vertical arrow-BDL"></div>
</div>


      </div>
    </div>
    )
}

export default flowchart
