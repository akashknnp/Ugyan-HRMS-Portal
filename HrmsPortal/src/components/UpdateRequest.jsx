import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom'; // Use useParams to get the id
import Select from "react-select";
import { AiTwotoneCloseSquare } from "react-icons/ai";
import "../UpdateRequest.css";

const UpdateRequest = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const navigate1 = new useNavigate();
    useEffect(() => {
      // Check the login status from localStorage
      const loginFlag = localStorage.getItem("loginFlag");
  
      // If the loginFlag is not set or false, redirect to the login page
      console.log("login flag in dashboard",loginFlag)
      if (loginFlag=="false") {
        navigate1('/logout1');
      }
    }, [navigate1]); 
  // Form state
  const [leaveType, setLeaveType] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [email, setEmail] = useState('');
  const [reason, setReason] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(null); // State for success/error message
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'

  // Dropdown options for leave types
  const leaveOptions = [
    { value: 'Casual Leave', label: 'Casual Leave' },
    { value: 'Sick Leave', label: 'Sick Leave' },
    { value: 'Paid Leave', label: 'Paid Leave' },
    { value: 'Paternity Leave', label: 'Paternity Leave' },
    { value: 'Maternity Leave', label: 'Maternity Leave' },
    { value: 'Sabbatical Leave', label: 'Sabbatical Leave' },
  ];

  // Fetch leave request data when component mounts
  useEffect(() => {
    const fetchLeaveRequest = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}leave/update-leave/${id}/`);
        if (response.ok) {
          const data = await response.json();
          setLeaveType(data.leave_type);
          setStartDate(data.start_date);
          setEndDate(data.end_date);
          setEmail(data.email);
          setReason(data.reason);
        } else {
          setMessageType('error');
          setMessage('Failed to fetch leave request.');
        }
      } catch (error) {
        setMessageType('error');
        setMessage('Error fetching leave request.');
      }
      setIsLoading(false);
    };

    fetchLeaveRequest();
  }, [id]);

  // Handle form submission for updating leave request
  const handleButtonUpdate = async (event) => {
    event.preventDefault();
    if (!leaveType || !startDate || !endDate || !email || !reason) {
      setMessageType('error');
      setMessage('Please fill in all fields.');
      return;
    }

    const updatedRequest = {
      leave_type: leaveType,
      start_date: startDate,
      end_date: endDate,
      email: email,
      reason: reason,
    };

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}leave/update-leave/${id}/`, {
        method: 'POST', // Change to 'PUT' or 'PATCH' if required by the backend
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedRequest),
      });

      const data = await response.json();
      if (response.ok) {
        setMessageType('success');
        setMessage('Leave request updated successfully.');
        setTimeout(() => navigate('/requests'), 2000); // Redirect after 2 seconds
      } else {
        setMessageType('error');
        setMessage(data.error || 'Failed to update leave request.');
      }
    } catch (error) {
      setMessageType('error');
      setMessage('An error occurred while updating the leave request.');
    }
  };

  // Cancel and navigate back
  const handleButtonCancel = (event) => {
    event.preventDefault();
    navigate('/requests'); // Navigate back to requests page
  };

  return (
    <div className="main-updaterequest-form">
      <div className="form-updaterequest">
        <div className="simple-nav-update">
          <h1>Update Leave</h1>
          <Link to="/requests">
            <div className="simple-nav-icon-update">
              <i><AiTwotoneCloseSquare /></i>
            </div>
          </Link>
        </div>
        <div className="leave-addrequest-update">
          <h1>Leave</h1>
          <hr />
          <form>
            <div className='dropdown-leavetype-update'>
              <div><label className="form-label-update" htmlFor="leave-type">Leave Type</label></div>
              <div><Select className='form-input-leave-update'
                options={leaveOptions}
                value={leaveOptions.find(option => option.value === leaveType)} // Set selected value
                onChange={(selectedOption) => setLeaveType(selectedOption.value)}
                placeholder="Leave Type"
                isSearchable
                required
              /></div><br /><br />
            </div>
            <label className="form-label-update" htmlFor="date">Date</label>
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

            <label className="form-label-update" htmlFor="email">Email ID</label>
            <input
              className="form-input-email-update"
              id="form-input-2"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            /><br /><br />

            <div className="form-label-textbox">
              <div className="form-label-reason-update">
                <label htmlFor="reason" className='form-label-update'>Reason for Leave</label>
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
            <div className={`message1 ${messageType}`}>
              {message}
            </div>
          )}
        <div className="bottom-nav">
          <button onClick={handleButtonUpdate} className="bottom-nav-update">Update</button>
          <button onClick={handleButtonCancel} className="bottom-nav-cancel">Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default UpdateRequest;