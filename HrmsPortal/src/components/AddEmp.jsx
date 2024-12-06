import React, { useState,useEffect } from 'react';
import "../AddEmp.css";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const EmployeeForm = () => {
  const [formData, setFormData] = useState({
    E_id: '',
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    age: '',
    gender: '',
    Designation: '',
    department: '',
    date_of_birth: '',
    is_emp: false,
    is_HR: false,
    is_admin: false,
    role: '', // Role selection field
  });

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Submit form data to backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Map the role to boolean values
    let updatedData = { ...formData };
    if (formData.role === 'Employee') {
      updatedData.is_emp = true;
      updatedData.is_HR = false;
      updatedData.is_admin = false;
    } else if (formData.role === 'HR') {
      updatedData.is_emp = false;
      updatedData.is_HR = true;
      updatedData.is_admin = false;
    } else if (formData.role === 'Admin') {
      updatedData.is_emp = false;
      updatedData.is_HR = false;
      updatedData.is_admin = true;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}employees/add_employee/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        throw new Error('Failed to add employee');
      }

      const result = await response.json();
      console.log('Employee added successfully:', result);
      // Optionally clear form after submission
      setFormData({
        E_id: '',
        first_name: '',
        last_name: '',
        email: '',
        phone_number: '',
        age: '',
        gender: '',
        Designation: '',
        department: '',
        date_of_birth: '',
        is_emp: false,
        is_HR: false,
        is_admin: false,
        role: '', // Reset role
      });
    } catch (error) {
      console.error('Error:', error);
    }
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

  return (
    <div className='background_add'>
        <div>
           <Link to="/employee"><div className='Back_Add'> Back</div> </Link>
      <div className='form'>
        
        <p className='heading'>Create New Employee Profile</p>
  
      <form onSubmit={handleSubmit}>
        <div className='Employee_id'>
          <label>Employee ID</label>
          <input
            type="text"
            name="E_id"
            value={formData.E_id}
            onChange={handleChange}
            required
          />
        </div>
        <div className='First_name'>
          <label>First Name</label>
          <input
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            required
          />
        </div>
        <div className='Last_name'>
          <label>Last Name</label>
          <input
            type="text"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            required
          />
        </div>
        <div className='Email'>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className='Phone_number'>
          <label>Phone Number</label>
          <input
            type="text"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleChange}
            required
            maxLength={12}
          />
        </div>
        <div className='Age'>
          <label>Age</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
          />
        </div>
        <div className='Gender'>
          <label>Gender</label>
          <select name="gender" value={formData.gender} onChange={handleChange} required>
            <option value="">Select</option>
            <option value="M">Male</option>
            <option value="F">Female</option>
            <option value="O">Other</option>
          </select>
        </div>
        <div className='Designation'>
          <label>Designation</label>
          <input
            type="text"
            name="Designation"
            value={formData.Designation}
            onChange={handleChange}
            required
          />
        </div>
        <div className='Department'>
          <label>Department</label>
          <input
            type="text"
            name="department"
            value={formData.department}
            onChange={handleChange}
            required
          />
        </div>
        <div className='D_O_B'>
          <label>Date of Birth</label>
          <input
            type="date"
            name="date_of_birth"
            value={formData.date_of_birth}
            onChange={handleChange}
            required
          />
        </div>

        {/* Role Selection Dropdown */}
        <div className='Role'>
          <label>Role</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
          >
            <option value="">Select Role</option>
            <option value="Employee">Employee</option>
            <option value="HR">HR</option>
            <option value="Admin">Admin</option>
          </select>
        </div>

        <button className='save_button' type="submit">save</button>
      </form>
    </div>
    </div>
    </div>
  );
};

export default EmployeeForm;
