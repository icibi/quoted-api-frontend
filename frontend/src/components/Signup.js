import React, { useState } from "react";
import axios from "axios";
import "../styles/Login.css"; 

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const response = await axios.post("http://localhost:5163/api/Auth/signup", {
        username,
        password,
        email,
      });

      if (response.status === 200) {
        setSuccessMessage("Signup successful. You can now login.");
        window.location.href = "/login";
      }

    } catch (error) {
      setErrorMessage(
        error.response?.data || "An error occurred. Please try again later."
      );
    }
  };

  return (
    <div className='container'>
    <div className="form-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSignup} className="form">
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="input"
          />
        </div>
        <button type="submit" className="button">
          Signup
        </button>
      </form>
      {errorMessage && <p className="error">{errorMessage}</p>}
      {successMessage && <p className="success">{successMessage}</p>}
    </div>
    </div>
  );
};

export default Signup;
