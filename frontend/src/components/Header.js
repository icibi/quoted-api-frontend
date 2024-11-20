import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css';

const Header = () => {
    return (
        <header>
        <nav className="nav-left">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/favourites">Favourites</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/signup">Sign up</Link></li>
          </ul>
        </nav>
      </header>
    );
  };
  
export default Header;

