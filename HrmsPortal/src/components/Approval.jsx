import React, { useState, useEffect } from 'react';
import logo from "../assets/ugyanlogobg_enhanced-transformed.png";
import { Link } from 'react-router-dom';
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
import axios from 'axios';

const Approval = () => {
  
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [requests, setRequests] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
      const fetchRequests = async () => {
        try {
          const response = await fetch("http://127.0.0.1:8000/leave/get-leaves/");
          if (response.ok) {
            const data = await response.json();
    
            // Check the fetched data
            console.log("Fetched Data: ", data);
    
            // Sort requests by start_date in descending order (latest first)
            const sortedRequests = data.sort((a, b) => {
              const dateA = new Date(a.start_date);
              const dateB = new Date(b.start_date);
    
              // Log dates to verify they are being parsed correctly
              console.log(`Comparing: ${dateA} vs ${dateB}`);
    
              return dateB - dateA;  // Sorting in descending order
            });
    
            // Check the sorted data
            console.log("Sorted Requests: ", sortedRequests);
    
            setRequests(sortedRequests);
          } else {
            console.error('Failed to fetch leave requests');
          }
        } catch (error) {
          console.error('Error fetching leave requests:', error);
        }
      };
    
      fetchRequests();
    }, []);

      const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

      const handleApprove = async (id) => {
        try {
          const response = await axios.post(
            'http://127.0.0.1:8000/leave/approval/', // Django endpoint for approval
            { id }, // Sending the request ID
            {
              headers: {
                'Content-Type': 'application/json',
              },
              withCredentials: true, // Required if using cookies for authentication
            }
          );
          setMessage(`Leave request ${id} has been approved successfully.`);
          // Optionally, refresh requests after approval
        } catch (error) {
          console.error('Error approving leave:', error);
          setMessage('Failed to approve leave request. Please try again.');
        }
      };
      
      const handleDeny = async (id) => {
        try {
          const response = await axios.post(
            'http://127.0.0.1:8000/leave/deny/', // Django endpoint for denial
            { id }, // Sending the request ID
            {
              headers: {
                'Content-Type': 'application/json',
              },
              withCredentials: true, // Required if using cookies for authentication
            }
          );
          setMessage(`Leave request ${id} has been denied successfully.`);
          // Optionally, refresh requests after denial
        } catch (error) {
          console.error('Error denying leave:', error);
          setMessage('Failed to deny leave request. Please try again.');
        }
      };

      useEffect(() => {
        if (message) {
          const timer = setTimeout(() => {
            setMessage('');
          }, 2000); 
          return () => clearTimeout(timer);
        }
      }, [message]);

    return (
    <div className='outer-approval'>
        <div className='header-approval'>
            
                <img src={logo}className='logo-approval'></img>
            
            <div>
            <h1 className='title-bar-approval'><Link to="/dashboard">Home</Link></h1>
        </div>
        <div>
            <p className='title-bar-approval'><Link to="/about">About</Link></p>
        </div>
        <div>
            <p className='title-bar-approval'>Designation</p>
        </div>
        <div>
            <p className='title-bar-approval'>Clock In/Out</p>
        </div>
        <div className="mobile-menu-icon-approval" onClick={toggleMobileMenu}>
            <GiHamburgerMenu />
        </div>
        </div>
        
        <div className='main-approval'>
            <div className='side-bar-approval'>
                {/* <h3 className='text-white text-6xl text-center bg-gradient-to-tl from-black to-slate-400 p-4'><img src={logo}className='bg-white'></img> */}
                {/* <Link to="/dashboard"> <div><h3 className='features-payroll'><TbLayoutDashboardFilled className='dash-payroll'/>Dashboard</h3></div></Link> */}
                <Link to="/employee"><div><h3 className='features-approval'><MdPerson className='dash-approval'/>Employee </h3></div></Link>
                <Link to="/recruitment"><div><h3 className='features-approval'><IoIosPeople className='dash-approval'/>Recruitment</h3></div></Link>
                <Link to="/calender"><div><h3 className='features-approval'><SlCalender className='dash-approval'/>Calender</h3></div></Link>
                <Link to="/payroll"><div><h3 className='features-approval'><FaMoneyCheckDollar className='dash-approval'/>Payroll</h3></div></Link>
                <Link to="/timeoff"><div><h3 className='features-approval'><BiCalendarExclamation className='dash-approval'/>Time off</h3></div></Link>
                <Link to="/performance"><div><h3 className='features-approval'><GrDocumentPerformance className='dash-approval'/>Performance</h3></div></Link>
                <Link to="/communication"><div><h3 className='features-approval'><FaRegFileAlt className='dash-approval'/>Communication</h3></div></Link>
                <Link to="/settings"><div><h3 className='features-approval'><IoSettingsOutline className='dash-approval'/>Settings</h3></div></Link>
                <Link to="/logout"><div><h3 className='features-approval'><CgLogOut className='dash-approval'/>Logout</h3></div></Link>
            </div>
            {isMobileMenuOpen && (
          <div className="mobile-dropdown-approval">
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
            <div className='menu-payroll'>
            <div className='leave-approval'>
            {/* Table to display leave requests */}
            {requests.length > 0 ? (
            <div className="table-container">
              <table className="leave-table-approval">
                <thead>
                  <tr>
                    <th>Type</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Email</th>
                    <th>Reason</th>
                    <th>Status</th> 
                    <th>Approval</th>
                  </tr>
                </thead>
                <tbody>
                  {requests.map((request) => (
                    <tr key={request.id}>
                      <td>{request.leave_type}</td>
                      <td>{request.start_date}</td>
                      <td>{request.end_date}</td>
                      <td>{request.email}</td>
                      <td>{request.reason}</td>
                      <td>{request.status}</td>
                      <td>
                      <button onClick={() => handleApprove(request.id)} className="approved-btn">Approve</button>
                      <button onClick={() => handleDeny(request.id)} className="denied-btn">Deny</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className='no-requests-approval'>No leave requests available.</p>
          )}
          </div>
          <div className="message-container">
          {message && <p className="message">{message}</p>}
        </div>
        </div>
    </div>
</div>
    )
}
export default Approval