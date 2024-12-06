import React, { useState, useEffect } from 'react';
import "../Profilemanage.css";
import { useNavigate } from 'react-router-dom';

const EmployeeDetails = () => {

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
    
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        phone_number: '',
        age: '',
        date_of_birth: '',
        profile_picture: null, // For new image if changed
        current_profile_picture: '', // For current image URL
    });
    const [email, setEmail] = useState('');

    // Fetch user details when the component loads
    useEffect(() => {
        const userDetails = JSON.parse(localStorage.getItem('userDetails'));
        if (userDetails && userDetails.email) {
            setEmail(userDetails.email);
            fetch(`${import.meta.env.VITE_API_URL}employees/update-by-login/?email=${userDetails.email}`)
                .then((response) => response.json())
                .then((data) => {
                    if (data) {
                        console.log('Fetched data:', data); // Debug log
                        const profilePictureUrl = data.profile_picture 
                            ? `${import.meta.env.VITE_API_URL}${data.profile_picture}`  // Using full API URL for relative path
                            : ''; // Empty if no profile picture
                        
                        setFormData({
                            first_name: data.first_name || '',
                            last_name: data.last_name || '',
                            phone_number: data.phone_number || '',
                            age: data.age || '',
                            date_of_birth: data.date_of_birth || '',
                            profile_picture: null, // Reset for new picture
                            current_profile_picture: profilePictureUrl, // Set the current profile picture URL
                        });
                    }
                })
                .catch((error) => console.error('Error fetching details:', error));
        }
    }, []);

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formPayload = new FormData();
        formPayload.append('email', email);
        Object.keys(formData).forEach((key) => {
            if (key !== 'current_profile_picture') {
                formPayload.append(key, formData[key]);
            }
        });

        // Ensure we only append a new profile picture if it's selected
        if (formData.profile_picture) {
            formPayload.append('profile_picture', formData.profile_picture);
        }

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}employees/update-by-login/`, {
                method: 'POST',
                body: formPayload,
            });

            const data = await response.json();
            if (response.ok) {
                alert('Details updated successfully!');
            } else {
                alert(data.error || 'Failed to update details.');
            }
        } catch (error) {
            console.error('Error updating details:', error);
        }
    };

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            profile_picture: e.target.files[0],
        }));
    };

    return (
        <div className ="background-div-manage">
          <div className='manage-profile-container'>
            <h2>Edit Your personal details</h2>
            <form onSubmit={handleSubmit} className='form-for-update-profile'>

              {/* Display the current profile picture if it exists */}
              {formData.current_profile_picture && (
                    <div className='profile-label'>
                        <img
                        className='current-p-picture'
                            src={formData.current_profile_picture}
                            alt="Current Profile"
                            style={{ width: '100px', height: '100px' }}
                        />
                        <p>Current Profile Picture</p>
                    </div>
                )}

                {/* File input to change the profile picture */}
                <input className='change-profile'
                    type="file"
                    name="profile_picture"
                    onChange={handleFileChange}
                />
                <div className='manage-list-detail'>
                <div>
                    <label htmlFor="first_name">First Name</label>
                    <input
                        type="text"
                        name="first_name"
                        value={formData.first_name}
                        onChange={handleChange}
                        placeholder="First Name"
                        id="first_name"
                    />
                </div>
                
                <div>
                    <label htmlFor="last_name">Last Name</label>
                    <input
                        type="text"
                        name="last_name"
                        value={formData.last_name}
                        onChange={handleChange}
                        placeholder="Last Name"
                        id="last_name"
                    />
                </div>
                
                <div>
                    <label htmlFor="phone_number">Phone Number</label>
                    <input
                        type="number"
                        name="phone_number"
                        value={formData.phone_number}
                        onChange={handleChange}
                        placeholder="Phone Number"
                        id="phone_number"
                    />
                </div>
                
                <div>
                    <label htmlFor="age">Age</label>
                    <input
                        type="number"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        placeholder="Age"
                        id="age"
                    />
                </div>
            
                <div>
                    <label htmlFor="date_of_birth">Date of Birth</label>
                    <input
                        type="date"
                        name="date_of_birth"
                        value={formData.date_of_birth}
                        onChange={handleChange}
                        placeholder="Date of Birth"
                        id="date_of_birth"
                    />
                </div>
                </div>


                
                <button className="update-profile-manage" type="submit">Update</button>
            </form>
        </div>
       </div>
    );
};

export default EmployeeDetails;
