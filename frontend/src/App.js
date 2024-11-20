import React, { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AllQuotes from './components/AllQuotes';
import Header from './components/Header';
import Footer from './components/Footer';
import './App.css';
import Login from './components/Login';
import Favourites from './components/Favourites';
import Signup from './components/Signup';

function App() {
    return (
        <Router>
            <div className="container">
             <Header />
                <div className="main-content">
                    <Routes>
                        <Route exact path="/favourites" element={<Favourites />} />
                        <Route path="/" element={<AllQuotes />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />
                    </Routes>
                </div>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
