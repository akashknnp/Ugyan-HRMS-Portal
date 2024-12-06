import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import brand from "../assets/Brading.png";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");

  // Check for existing session on page load
 

  // Handle session timeout
  useEffect(() => {
    const interval = setInterval(() => {
      const lastActive = localStorage.getItem("lastActive");
      const now = new Date().getTime();

      if (lastActive && now - parseInt(lastActive) > 30 * 60 * 1000) {
        localStorage.clear();
        setMessage("Session expired. Redirecting to login...");
        navigate("/logout1");
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [navigate]);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}employees/login/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Backend Response:", result);

      if (result.status === "success") {
        if (!result.data) {
          throw new Error('The "data" field is missing in the backend response.');
        }

        const { role, ...userDetails } = result.data;

        // Store user session details in localStorage
        localStorage.setItem("userRole", role);
        localStorage.setItem("loginFlag",true);
        localStorage.setItem("userDetails", JSON.stringify(userDetails));
        localStorage.setItem("lastActive", new Date().getTime().toString());

        setMessage(result.message);

        // Redirect to role-based dashboard
        setTimeout(() => {
          if (role === "admin") {
            navigate("/dashboard");
          } else if (role === "HR") {
            navigate("/dashboard");
          } else {
            navigate("/dashboard");
          }
        }, 1000);
      } else {
        setMessage(result.message || "Login failed.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setMessage(`An error occurred: ${error.message || "Unknown error"}`);
    }
  };
  useEffect(() => {
    const loginflag = localStorage.getItem("loginFlag");

    // If the loginFlag is not present, set it to 'false' as default
    if (loginflag === null) {
      localStorage.setItem("loginFlag", false);
    }
    if (!loginflag) {
      navigate("/logout1"); // Redirect to dashboard if already logged in
    }
  }, [navigate]);

  return (
    <div className="background-div1">
      <div className="login">
        <div className="left-of-login">
          <img src={brand} className="brand-logo" alt="Brand Logo" />
        </div>
        <div className="main1-login">
          <div>
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
              <div className="input1">
                <label className="label1-input1">Username:</label>
                <input
                  type="text"
                  className="input-field-1"
                  placeholder="Enter Your User-ID"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="input2">
                <label className="label2-input2">Password:</label>
                <div className="password-input-wrapper">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="input-field-1 password-field"
                    placeholder="Password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <span
                    className="password-eye-icon"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                  </span>
                </div>
              </div>
              <div className="forget-link">
                <Link to={"/forget"}>Forget Password</Link>
              </div>
              <button className="submit-login" type="submit">
                Submit
              </button>
            </form>
            {message && (
              <div
                className={`message ${
                  message.includes("success") ? "success" : "error"
                }`}
              >
                {message}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
