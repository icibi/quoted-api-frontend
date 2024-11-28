import React, { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AllQuotes from './components/AllQuotes';
import Header from './components/Header';
import Footer from './components/Footer';
import './App.css';
import Login from './components/Login';
import Favourites from './components/Favourites';
import Signup from './components/Signup';
import { useState } from 'react';
import AddQuote from './components/AddQuote';
import QuoteDetails from './components/QuoteDetails.js';
import FavQuoteDetails from './components/FavQuoteDetails.js';
import EditQuote from './components/AdminOps/EditQuote.js';
import Admin from './components/AdminOps/Admin.js';

function App() {
    const [userDetails, setUserDetails] = useState(null)

    return (
        <Router>
             <Header setUserDetails={setUserDetails}/>
                    <Routes>
                        <Route exact path="/favourites" element={<Favourites userDetails={userDetails}/>} />
                        <Route path="/" element={<AllQuotes userDetails={userDetails}/>} />
                        <Route path="/login" element={<Login setUserDetails={setUserDetails}/>} />
                        <Route path="/signup" element={<Signup />} />
                        <Route path='/add' element={<AddQuote userDetails={userDetails}/>}/>
                        <Route exact path='/quote/:id' element={<QuoteDetails />}/>
                        <Route exact path='/favquote/:id' element={<FavQuoteDetails />}/>
                        <Route path='/add-quote/' element={<AddQuote />}/>
                        <Route path='/edit-quote/:id' element={<EditQuote />}/>
                        <Route path='/admin' element={<Admin />}/>
                    </Routes>
                <Footer />
        </Router>
    );
}

export default App;
