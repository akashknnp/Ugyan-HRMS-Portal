import React, { useState,useEffect } from 'react';
import axios from 'axios';
import "../AddBalance.css";
import { useNavigate } from 'react-router-dom';

const AddBalance = () => {

  
  const [formData, setFormData] = useState({
    E_id: '',
    total_sick_leave: '',
    total_casual_leave: '',
    taken_sick_leave: '',
    taken_casual_leave: '',
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const navigate = new useNavigate();
    useEffect(() => {
      // Check the login status from localStorage
      const loginFlag = localStorage.getItem("loginFlag");
  
      // If the loginFlag is not set or false, redirect to the login page
      console.log("login flag in dashboard",loginFlag)
      if (loginFlag=="false") {
        navigate('/logout1');
      }
    }, [navigate]); 

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}leave/add-balance/`,
        {
          ...formData,
          total_sick_leave: parseFloat(formData.total_sick_leave),
          total_casual_leave: parseFloat(formData.total_casual_leave),
          taken_sick_leave: parseFloat(formData.taken_sick_leave),
          taken_casual_leave: parseFloat(formData.taken_casual_leave),
        },
        { headers: { 'Content-Type': 'application/json' } }
      );

      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response?.data?.message || 'An error occurred.');
    }
  };

  return (
    <div className='basic-main-screen'>
    <div className="form-container">
    <h2 className="form-title">Add Leave Balance</h2>
    <div className="form-group">
      <label className="form-label">Employee ID:</label>
      <input
        type="text"
        name="E_id"
        value={formData.E_id}
        onChange={handleChange}
        placeholder="Enter Employee ID"
        className="form-input"
      />
    </div>
    <div className="form-group">
      <label className="form-label">Total Sick Leave:</label>
      <input
        type="number"
        name="total_sick_leave"
        value={formData.total_sick_leave}
        onChange={handleChange}
        placeholder="Enter Total Sick Leave"
        className="form-input"
      />
    </div>
    <div className="form-group">
      <label className="form-label">Total Casual Leave:</label>
      <input
        type="number"
        name="total_casual_leave"
        value={formData.total_casual_leave}
        onChange={handleChange}
        placeholder="Enter Total Casual Leave"
        className="form-input"
      />
    </div>
    <div className="form-group">
      <label className="form-label">Taken Sick Leave:</label>
      <input
        type="number"
        name="taken_sick_leave"
        value={formData.taken_sick_leave}
        onChange={handleChange}
        placeholder="Enter Taken Sick Leave"
        className="form-input"
      />
    </div>
    <div className="form-group">
      <label className="form-label">Taken Casual Leave:</label>
      <input
        type="number"
        name="taken_casual_leave"
        value={formData.taken_casual_leave}
        onChange={handleChange}
        placeholder="Enter Taken Casual Leave"
        className="form-input"
      />
    </div>
    <button onClick={handleSubmit} className="form-button">Submit</button>
    {message && <p className="form-message">{message}</p>}
  </div>
  </div>
  );
};

export default AddBalance;
