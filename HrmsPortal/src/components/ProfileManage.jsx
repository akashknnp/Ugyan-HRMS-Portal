import React, { useState, useEffect } from 'react';
import "../Profilemanage.css";
import { Navigate, useNavigate } from 'react-router-dom';

const EmployeeDetails = () => {
    const navigate = useNavigate();
    const back_to_profile = () => {
        navigate('/settings');
      };
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        phone_number: '',
        age: '',
        date_of_birth: '',
        profile_picture: null,
        current_profile_picture: '',
    });
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState(null); // State for message content
    const [messageType, setMessageType] = useState(''); // Type: "success" or "error"

    // Redirect if not logged in
    useEffect(() => {
        const loginFlag = localStorage.getItem("loginFlag");
        if (loginFlag === "false") {
            navigate('/logout1');
        }
    }, [navigate]);

    // Fetch user details when the component loads
    useEffect(() => {
        const userDetails = JSON.parse(localStorage.getItem('userDetails'));
        if (userDetails && userDetails.email) {
            setEmail(userDetails.email);
            fetch(`${import.meta.env.VITE_API_URL}employees/update-by-login/?email=${userDetails.email}`)
                .then((response) => response.json())
                .then((data) => {
                    if (data) {
                        const profilePictureUrl = data.profile_picture 
                            ? `${import.meta.env.VITE_API_URL}${data.profile_picture}`
                            : '';
                        
                        setFormData({
                            first_name: data.first_name || '',
                            last_name: data.last_name || '',
                            phone_number: data.phone_number || '',
                            age: data.age || '',
                            date_of_birth: data.date_of_birth || '',
                            profile_picture: null,
                            current_profile_picture: profilePictureUrl,
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

        // Append new profile picture if selected
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
                setMessage('Details updated successfully!');
                setMessageType('success');
            } else {
                setMessage(data.error || 'Failed to update details.');
                setMessageType('error');
            }
        } catch (error) {
            console.error('Error updating details:', error);
            setMessage('An error occurred while updating details.');
            setMessageType('error');
        }

        // Clear the message after 5 seconds
        setTimeout(() => {
            setMessage(null);
        }, 5000);
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
        <div className="background-div-manage">
             {/* Display custom message */}
             {message && (
                    <div
                        className={`message-container-profilemanage ${
                            messageType === 'success' ? 'message-success' : 'message-error'
                        }`}
                    >
                        {message}
                    </div>
                )}
            <div className="manage-profile-container">
                <h2>Edit Your Personal Details</h2>
                <form onSubmit={handleSubmit} className="form-for-update-profile">
                    {/* Display the current profile picture */}
                    {formData.current_profile_picture && (
                        <div className="profile-label">
                            <img
                                className="current-p-picture"
                                src={formData.current_profile_picture}
                                alt="Current Profile"
                                style={{ width: '100px', height: '100px' }}
                            />
                            <p>Current Profile Picture</p>
                        </div>
                    )}

                    {/* File input to change profile picture */}
                    <input
                        className="change-profile"
                        type="file"
                        name="profile_picture"
                        onChange={handleFileChange}
                    />

                    <div className="manage-list-detail">
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

                <button className='back-in-profile' onClick={back_to_profile}>Back</button>
            </div>
        </div>
    );
};

export default EmployeeDetails;
