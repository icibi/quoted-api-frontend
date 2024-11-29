import React, { useState } from "react";
import axios from "axios";
import "../styles/Login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  //login with username and password
  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const response = await axios.post("http://localhost:5163/api/Auth/login", {
        username,
        password,
      });

      if (response.status === 200) {
        setSuccessMessage("Login successful!");
        localStorage.setItem("user", JSON.stringify(response.data));
        window.location.href = "/favourites";
      }

    } catch (error) {
      setErrorMessage(
        error.response?.data.message || "An error occurred. Please try again later."
      );
    }
  };

  return (
    <div className='container'>
      <div className="form-container">
        <h2>Login</h2>
        <form onSubmit={handleLogin} className="form">
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
            Login
          </button>
        </form>
        {errorMessage && <p className="error">{errorMessage}</p>}
        {successMessage && <p className="success">{successMessage}</p>}
      </div>
    </div>
  );
};

export default Login;
