import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "../EmpSearch.css";

const EmpSearch = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState(null); // Selected employee to show details
  const [error, setError] = useState(''); // Error message if no employee is found

  useEffect(() => {
    async function fetchData() {
      console.log(import.meta.env.VITE_API_URL);
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}employees/get_employee/`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        console.log(result);
        setData(result); // Store all employees' data
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData(); // Fetch the data when the component mounts
  }, []);

  // Handle the search functionality
  const handleSearch = async () => {
    let url = `${import.meta.env.VITE_API_URL}employees/get_employee/`;

    // Check if searchTerm is likely an email (contains '@'), otherwise use it as an employee ID
    if (searchTerm.includes('@')) {
      url += `?emailid=${encodeURIComponent(searchTerm)}`;
    } else {
      url += `?id=${encodeURIComponent(searchTerm)}`;
    }

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Employee not found');
      }
      const result = await response.json();
      setSelectedEmployee(result); // Show selected employee's data
      setError(''); // Reset error if employee is found
    } catch (error) {
      console.error('Error fetching data:', error);
      setSelectedEmployee(null); // Clear selected employee if no match
      setError('Employee not found');
    }
  };

  return (
    <div className='background-emp-search'>
      <h1 className='heading-search'>Employee Search</h1>

      {/* Search bar and Submit button */}
      <div className='filter_empsearch'>
        <input
          type="text"
          placeholder="Search by E-ID or email"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      {/* Back Button */}
      <Link to="/employee"><div className='back-link-search'>Back</div></Link>
      <hr/>

      {/* Display employee profile or error message */}
      {selectedEmployee ? (
        <div className='emp-detail-search'>
          <h2>Employee Profile</h2>
          <p><strong>Employee ID:</strong> {selectedEmployee.E_id}</p>
          <p><strong>First Name:</strong> {selectedEmployee.first_name}</p>
          <p><strong>Last Name:</strong> {selectedEmployee.last_name}</p>
          <p><strong>Email:</strong> {selectedEmployee.email}</p>
          <p><strong>Phone Number:</strong> {selectedEmployee.phone_number}</p>
        </div>
      ) : (
        error && <p className='error-list'>{error}</p>
      )}
    </div>
  );
};

export default EmpSearch;
