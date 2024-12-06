import React, { useEffect, useState } from 'react';
import { IoMdCloseCircle } from "react-icons/io";
import { Link, useNavigate } from 'react-router-dom';
import "../Profile.css";


const Profile = () => {

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

  const [userDetails, setUserDetails] = useState(null); // State to store user details
  const [loading, setLoading] = useState(true); // State to manage loading state
  const [error, setError] = useState(''); // State to manage error messages

  const navigate = useNavigate();

  // Fetch user details based on email
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        // Get email from localStorage
        const storedDetails = localStorage.getItem('userDetails');
        if (!storedDetails) {
          throw new Error('No user details found in localStorage.');
        }

        const { email } = JSON.parse(storedDetails); // Parse userDetails and extract email
        if (!email) {
          throw new Error('Email not found in user details.');
        }

        // Fetch user details from the backend using email
        const response = await fetch(`${import.meta.env.VITE_API_URL}employees/getprofile/?emailid=${email}`);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        if (result.error) {
          throw new Error(result.error);
        }

        setUserDetails(result); // Set the retrieved user details
      } catch (err) {
        console.error('Error fetching user details:', err);
        setError(err.message || 'An unknown error occurred.');
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchUserDetails();
  }, []);


  const gotoprofile = () => {
    // event.preventDefault();
    navigate('/profilemanage');
  };
  // Navigate back to dashboard
  const goToDashboard = (event) => {
    event.preventDefault();
    navigate('/settings');
  };

  if (loading) {
    return <div>Loading...</div>; // Show a loading state while fetching data
  }

  if (error) {
    return <div>Error: {error}</div>; // Show error message if any
  }

  if (!userDetails) {
    return <div>No user details available.</div>; // Fallback if no data
  }

  // Check if profile_picture is a full URL or relative URL
  const profilePicUrl = userDetails.profile_picture
    ? userDetails.profile_picture.startsWith('http') // Absolute URL
      ? userDetails.profile_picture
      : `${import.meta.env.VITE_API_URL}${userDetails.profile_picture}` // Relative URL
    : "/media/employee_pics/default.png"; // Fallback image

  console.log('Profile Image URL:', profilePicUrl); // Log the URL for debugging

  return (
    <div className='background-div-profile'>
      <div className="profile-container">
        <h1 className="profile-header">My Profile</h1>
        <div className="profile-overview">
          <img
            src={profilePicUrl} // Dynamically set the profile picture URL
            alt="Profile"
            className="profile-picture"
          />
          <div className="profile-info">
            <h2>{userDetails.E_id} - {userDetails.first_name} {userDetails.last_name}</h2>
            <p>{userDetails.Designation}</p>
            <p>{userDetails.department}</p>
          </div>
        </div>
        <div className="profile-details">
          <table className="profile-table">
            <tbody>
              <tr>
                <td><strong>First Name:</strong></td>
                <td>{userDetails.first_name || 'Not provided'}</td>
              </tr>
              <tr>
                <td><strong>Last Name:</strong></td>
                <td>{userDetails.last_name || 'Not provided'}</td>
              </tr>
              <tr>
                <td><strong>E-mail-ID:</strong></td>
                <td>{userDetails.email || 'Not provided'}</td>
              </tr>
              <tr>
                <td><strong>Mobile Number:</strong></td>
                <td>{userDetails.phone_number || 'Not provided'}</td>
              </tr>
              <tr>
                <td><strong>Date of Birth:</strong></td>
                <td>{new Date(userDetails.date_of_birth).toLocaleDateString()}</td>
              </tr>
              <tr>
                <td><strong>Age:</strong></td>
                <td>{userDetails.age || 'Not provided'}</td>
              </tr>
              <tr>
                <td><strong>Gender:</strong></td>
                <td>{userDetails.gender}</td>
              </tr>
              <tr>
                <td><strong>Date of Joining:</strong></td>
                <td>{new Date(userDetails.date_joined).toLocaleDateString()}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <button onClick={goToDashboard}>Back</button>
        <button onClick={gotoprofile}>*click here to modify your profile</button>
        
      </div>
    </div>
  );
};

export default Profile;
