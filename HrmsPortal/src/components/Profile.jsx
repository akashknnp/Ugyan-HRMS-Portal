import React from 'react'
import { IoMdCloseCircle } from "react-icons/io";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'
import "../Profile.css";

const Profile = () => {

  const userDetails = {
    employeeId: '1001',
    name: 'John Doe',
    position: 'Manager',
    department: 'Software Development',
    location: 'Kochi',
    nationality: 'Norwegian',
    dob: '01-12-1980',
    gender: 'Male',
    maritalStatus: 'UnMarried',
    dateOfJoining: '01-06-2017',
    dateOfConfirmation: '01-08-2018',
    employeeType: 'Permanent',
  };
    const navigate = useNavigate();

    const gotodash = (event) => {
        event.preventDefault();  
        navigate('/Dashboard');
    }
  return (
    <div>
      <div className="profile-container">
      <h1 className="profile-header">My Profile</h1>
      <div className="profile-overview">
        <img
          src=""
          alt="Profile"
          className="profile-picture"
        />
        <div className="profile-info">
          <h2>{userDetails.employeeId} - {userDetails.name}</h2>
          <p>{userDetails.position}</p>
          <p>{userDetails.department}</p>
          <p>{userDetails.location}</p>
        </div>
      </div>
      <div className="profile-details">
        <p><strong>Nationality:</strong> {userDetails.nationality}</p>
        <p><strong>Date of Birth:</strong> {userDetails.dob}</p>
        <p><strong>Gender:</strong> {userDetails.gender}</p>
        <p><strong>Marital Status:</strong> {userDetails.maritalStatus}</p>
        <p><strong>Date of Joining:</strong> {userDetails.dateOfJoining}</p>
        <p><strong>Date of Confirmation:</strong> {userDetails.dateOfConfirmation}</p>
        <p><strong>Employee Type:</strong> {userDetails.employeeType}</p>
      </div>
    </div>

    </div>
  )
}

export default Profile
