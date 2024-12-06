import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { Link, useNavigate } from 'react-router-dom';
import { AiTwotoneCloseSquare } from "react-icons/ai";
import "../AddRequest.css";


const AddRequest = () => {
  const navigate = useNavigate();

  // Form state
  const [leaveType, setLeaveType] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [email, setEmail] = useState('');
  const [reason, setReason] = useState('');

  // Message state
  const [message, setMessage] = useState(null); // To store the message
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'

  // Fetching leave requests
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(false);


  const navigate1 = new useNavigate();
    useEffect(() => {
      // Check the login status from localStorage
      const loginFlag = localStorage.getItem("loginFlag");
  
      // If the loginFlag is not set or false, redirect to the login page
      console.log("login flag in dashboard",loginFlag)
      if (loginFlag=="false") {
        navigate1('/logout1');
      }
    }, [navigate]); 
  // Dropdown options for leave types
  const leaveOptions = [
    { value: 'Casual Leave', label: 'Casual Leave' },
    { value: 'Sick Leave', label: 'Sick Leave' },
    { value: 'Paid Leave', label: 'Paid Leave' },
    { value: 'Paternity Leave', label: 'Paternity Leave' },
    { value: 'Maternity Leave', label: 'Maternity Leave' },
    { value: 'Sabbatical Leave', label: 'Sabbatical Leave' },
  ];

  // Fetch leave requests from the backend
  useEffect(() => {
    const fetchLeaveRequests = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("http://127.0.0.1:8000/leave/get-leaves/");
        if (response.ok) {
          const data = await response.json();
          setLeaveRequests(data);
        } else {
          console.error('Failed to fetch leave requests');
        }
      } catch (error) {
        console.error('Error fetching leave requests:', error);
      }
      setIsLoading(false);
    };

    fetchLeaveRequests();
  }, []);

  // Submit form data
  const handleButtonSubmit = async (event) => {
    event.preventDefault();
    if (!leaveType || !startDate || !endDate || !email || !reason) {
      setMessageType('error');
      setMessage('Please fill in all fields.');
      return;
    }

    const newRequest = {
      leave_type: leaveType,
      start_date: startDate,
      end_date: endDate,
      email: email,
      reason: reason,
    };

    try {
      const response = await fetch("http://127.0.0.1:8000/leave/create-leave/", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newRequest),
      });

      const data = await response.json();
      if (response.ok) {
        setMessageType('success');
        setMessage('Leave request created successfully.');
        setTimeout(() => navigate('/requests', { state: { leaveRequests } }), 1000);
      } else {
        setMessageType('error');
        setMessage(data.error || 'Failed to create leave request.');
      }
    } catch (error) {
      setMessageType('error');
      setMessage('An error occurred while creating the leave request.');
    }
  };

  // Cancel and navigate back
  const handleButtonCancel = (event) => {
    event.preventDefault();
    navigate('/requests', { state: { leaveRequests } });
  };

  return (
    <div className="main-addrequest-form">
      <div className="form-addrequest-leave">
        <div className="simple-nav-leave">
          <h1>Apply Leave</h1>
          <Link to="/requests">
            <div className="simple-nav-icon">
              <i><AiTwotoneCloseSquare /></i>
            </div>
          </Link>
        </div>
        <div className="leave-addrequest-form">
          <h1>Leave</h1>
          <hr />
          <form className='form-for-request'>
            <div className='dropdown-leavetype'>
              <div><label className="form-label-leave" htmlFor="leave-type">Leave Type</label></div>
              <div><Select className='form-input-leave'
                options={leaveOptions}
                onChange={(selectedOption) => setLeaveType(selectedOption.value)}
                placeholder="Leave Type"
                isSearchable
                required
              /></div><br /><br />
            </div>
            <label className="form-label-leave" htmlFor="date">Date</label>
            <input
              className="form-date-1"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
            />
            <input
              className="form-date-2"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              required
            /><br /><br />

            <label className="form-label-leave" htmlFor="email">Email ID</label>
            <input
              className="form-input-email"
              id="form-input-2"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            /><br /><br />

            <div className="form-label-textbox">
              <div className="form-label-reason-leave">
                <label htmlFor="reason" className='form-label-leave'>Reason for Leave</label>
              </div>
              <div>
                <textarea
                  className="form-input-reason"
                  rows="3"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  required
                ></textarea>
              </div>
            </div>
          </form>
        </div>
        {message && (
            <div className={`message ${messageType}`}>
              {message}
            </div>
          )}
        <div className="bottom-nav">
          <button onClick={handleButtonSubmit} className="bottom-nav-submit">Submit</button>
          <button onClick={handleButtonCancel} className="bottom-nav-cancel">Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default AddRequest;