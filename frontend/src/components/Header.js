import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Header.css';

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userDetails, setUserDetails] = useState(null)
  const [role, setRole] = useState('')
  const nav = useNavigate()

  //get user and set
  useEffect(() => {
    const user = localStorage.getItem('user')
    if (user) {
      const storedUserDetails = JSON.parse(localStorage.getItem('user'))
      if (storedUserDetails) {
        setUserDetails(storedUserDetails)
        setIsLoggedIn(true)
        setRole(storedUserDetails.userRole)
      }
    }
  }, [])

  //handle log out
  const handleLogOut = () => {
    localStorage.removeItem('user')
    setUserDetails(null)
    setIsLoggedIn(false)
    nav('/')
    window.location.reload()
  }

  return (
    <header>
      <nav className="navbar">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/favourites">Favourites</Link></li>

          {role === 'admin' ? (
            <li><Link to="/admin">Admin Functions</Link></li>
          ) : (
            <div></div>
          )}
        </ul>
        {isLoggedIn ? (
          <div className='welcome-container'>
            <Link to={"/update-acc"} className='welcome'>Welcome, {userDetails.username}</Link>
            <button className='logout-button' onClick={handleLogOut}>Log Out</button>
          </div>
        ) : (
          <ul>
            <li><Link to="/signup">Sign up</Link></li>
            <li><Link to="/login">Login</Link></li>
          </ul>
        )}

      </nav>
    </header>
  );
};

export default Header;

