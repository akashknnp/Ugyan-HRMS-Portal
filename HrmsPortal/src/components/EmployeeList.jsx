import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';
import "../EmployeeList.css";
import { useNavigate } from 'react-router-dom';

const EmployeeList = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [employeeToUpdate, setEmployeeToUpdate] = useState(null);
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

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}employees/`);
        if (!response.ok) throw new Error('Network response was not ok');
        const result = await response.json();
        setData(result);
        setFilteredData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, []);

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);
    const filtered = data.filter(employee =>
      employee.E_id.toLowerCase().includes(value) ||
      employee.email.toLowerCase().includes(value)
    );
    setFilteredData(filtered);
  };

  const handleDelete = (employeeId) => {
    setEmployeeToDelete(employeeId);
    setShowPopup(true);
  };

  const confirmDelete = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}employees/delete/?id=${employeeToDelete}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setData(data.filter(employee => employee.E_id !== employeeToDelete));
        setFilteredData(filteredData.filter(employee => employee.E_id !== employeeToDelete));
      } else {
        alert("Failed to delete employee.");
      }
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
    setShowPopup(false);
  };

  const openUpdateModal = (employee) => {
    setEmployeeToUpdate(employee);
    setIsModalOpen(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const updatedEmployee = {
      E_id: employeeToUpdate.E_id,
      first_name: employeeToUpdate.first_name,
      last_name: employeeToUpdate.last_name,
      email: employeeToUpdate.email,
      phone_number: employeeToUpdate.phone_number,
      age: employeeToUpdate.age,
      gender: employeeToUpdate.gender,
      Designation: employeeToUpdate.Designation,
      department: employeeToUpdate.department,
      date_of_birth: employeeToUpdate.date_of_birth,
      role: employeeToUpdate.role,
    };

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}employees/update/?id=${employeeToUpdate.E_id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedEmployee),
      });

      if (response.ok) {
        const updatedData = data.map(employee =>
          employee.E_id === employeeToUpdate.E_id ? { ...employee, ...updatedEmployee } : employee
        );
        setData(updatedData);
        setFilteredData(updatedData);
        setIsModalOpen(false);
      } else {
        alert("Failed to update employee.");
      }
    } catch (error) {
      console.error('Error updating employee:', error);
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmployeeToUpdate(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className='background-list'>
      <h1>Our Team: View and Edit Employee Details</h1>
      <div className='filter_employeelist'>
        <input
          type="text"
          placeholder="Filter by E-ID, name or email"
          value={searchTerm}
          onChange={handleSearch}
        />
        <Link to="/employee"><div className='back'>Back</div></Link>
      </div>

      <table className='emplist-table'>
            <thead>
              <tr className='emplist-row'>
                <th>Employee ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Phone Number</th>
                { (userRole === 'HR' || userRole === 'Admin') && <th>Action</th> }
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((employee) => (
                  <tr key={employee.E_id}>
                    <td>{employee.E_id}</td>
                    <td>{employee.first_name}</td>
                    <td>{employee.last_name}</td>
                    <td>{employee.email}</td>
                    <td>{employee.phone_number}</td>
                    { (userRole === 'HR' || userRole === 'Admin') && (
                      <td>
                        <div className='edit-delete-button-list'>
                          <FaEdit className="update-icon button-emp-list" onClick={() => openUpdateModal(employee)} />
                          <FaTrash className="delete-icon button-emp-list" onClick={() => handleDelete(employee.E_id)} />
                        </div>
                      </td>
                    )}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={ (userRole === 'HR' || userRole === 'Admin') ? 6 : 5 }>
                    No matching employees found
                  </td>
                </tr>
              )}
            </tbody>
      </table>


      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <p>Are you sure you want to delete this employee?</p>
            <button className="confirm-delete-list" onClick={confirmDelete}>Delete</button>
            <button className="cancel-delete-list" onClick={() => setShowPopup(false)}>Cancel</button>
          </div>
        </div>
      )}

      {isModalOpen && employeeToUpdate && (
        <div className="modal">
          <div className="modal-content">
            <h2>Update Employee</h2>
            <form className="form-data-list" onSubmit={handleUpdate}>
              <label>First Name:</label>
              <input type="text" name="first_name" value={employeeToUpdate.first_name} onChange={handleInputChange} />
              <label>Last Name:</label>
              <input type="text" name="last_name" value={employeeToUpdate.last_name} onChange={handleInputChange} />
              <label>Email:</label>
              <input type="email" name="email" value={employeeToUpdate.email} onChange={handleInputChange} />
              <label>Phone Number:</label>
              <input type="text" name="phone_number" value={employeeToUpdate.phone_number} onChange={handleInputChange} maxLength={12} />
              <label>Age:</label>
              <input type="number" name="age" value={employeeToUpdate.age} onChange={handleInputChange} />
              <label>Gender:</label>
              <select name="gender" value={employeeToUpdate.gender} onChange={handleInputChange}>
                <option value="M">Male</option>
                <option value="F">Female</option>
                <option value="N">Other</option>
              </select>
              <label>Designation:</label>
              <input type="text" name="Designation" value={employeeToUpdate.Designation} onChange={handleInputChange} />
              <label>Department:</label>
              <input type="text" name="department" value={employeeToUpdate.department} onChange={handleInputChange} />
              <label>Date of Birth:</label>
              <input type="date" name="date_of_birth" value={employeeToUpdate.date_of_birth} onChange={handleInputChange} />
              <label>Role:</label>
              <select name="role" value={employeeToUpdate.role} onChange={handleInputChange}>
                <option value="HR">HR</option>
                <option value="Admin">Admin</option>
                <option value="Employee">Employee</option>
              </select>
              <button type="submit" className="update-button-list">Update</button>
            </form>
            <button className="close-modal" onClick={() => setIsModalOpen(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeList;
