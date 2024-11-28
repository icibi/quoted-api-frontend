import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import '../styles/AllQuotes.css';

const AllQuotes = () => {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(null)
  const [userDetails, setUserDetails] = useState(null)
  const [role, setRole] = useState('')
  const [message, setMessage] = useState('')
  const [messageE, setMessageE] = useState('')
  const apiURL = 'http://localhost:5163/api'      //local api
  const apiURL1 = 'http://34.207.129.10:8080/api' //aws api - for screenshots


  // Fetch all quotes from the backend API
  useEffect(() => {
    const user = localStorage.getItem('user')

    if (user) {
      const storedUserDetails = JSON.parse(localStorage.getItem('user'))
      if (storedUserDetails) {
        setUserDetails(storedUserDetails)
        setRole(storedUserDetails.userRole)
        setIsLoggedIn(true)
      }

      const userRole = storedUserDetails.userRole

      if (userRole === 'admin') {
        const fetchQuotes = async () => {
          try {
            const response = await axios.get(`${apiURL1}/Quotes/all`);
            setQuotes(response.data);
            setLoading(false);
          } catch (err) {
            setError(err.message);
            setLoading(false);
          }
        };

        fetchQuotes();
      }
      else {
        const fetchQuotes = async () => {
          try {
            const response = await axios.get(`${apiURL}/Quotes/all`);
            const approvedQuotes = response.data.filter((quote) => quote.approvalStatus === 'Approved')
            setQuotes(approvedQuotes);
            setLoading(false);
          } catch (err) {
            setError(err.message);
            setLoading(false);
          }
        };
        fetchQuotes();
      }
    }
    else {
      const fetchQuotes = async () => {
        try {
          const response = await axios.get(`${apiURL}/Quotes/all`);
          const approvedQuotes = response.data.filter((quote) => quote.approvalStatus === 'Approved')
          setQuotes(approvedQuotes);
          setLoading(false);
        } catch (err) {
          setError(err.message);
          setLoading(false);
        }
      };
      fetchQuotes();
    }

  }, []);

  //handle add quote to user favourites
  const handleUserAddToFav = async (quote) => {
    if (!isLoggedIn) {
      setMessageE('Please log in to add to favourites.')
      return
    }

    try {
      await axios.post(`${apiURL}/Favourites/add-new?Uid=${userDetails.uid}`, {
        qid: quote.qid
      })
      setMessageE('')
      setMessage('Quote added to favourites.')
    }
    catch (e) {
      console.error('Error adding to favourites:', e.message)
      alert('Failed to add quote to favourites.')
    }
  }

  //handle delete quote
  const handleDeleteQuote = async (qid) => {
    try {
      await axios.delete(`${apiURL}/Quotes/delete/${qid}`)
      const response = await axios.get(`${apiURL}/Quotes/all`)
      setQuotes(response.data)
      setLoading(false)
    } catch (err) {
      setError(err.message)
      setLoading(false)
    }
  }

  //handle approval - patch update approval attribute
  const handleApproval = async (qid) => {
    try {
      await axios.patch(`${apiURL}/Quotes/${qid}/patch`, {
        ApprovalStatus: 'Approved'
      })
      const response = await axios.get(`${apiURL}/Quotes/all`)
      setQuotes(response.data)
      setLoading(false)
    } catch (err) {
      setError(err.message)
      setLoading(false)
    }
  }

  //handle unapproval - patch update approval attribute
  const handleUnApproval = async (qid) => {
    try {
      await axios.patch(`${apiURL}/Quotes/${qid}/patch`, {
        ApprovalStatus: 'false'
      })
      const response = await axios.get(`${apiURL}/Quotes/all`)
      setQuotes(response.data)
      setLoading(false)
    } catch (err) {
      setError(err.message)
      setLoading(false)
    }
  }

  //put is the add quote function

  // Loading state
  if (loading) return <div>Loading...</div>;

  // Error state
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="page-container">
      <div className="quotes-container">
      <div className="addh">
        <Link className="addQ" to='/add-quote'><button className="addQBtn">Add Quote</button></Link>
        <h1>All Quotes</h1>
        </div>
        {messageE && (
          <div className="messageE">
            {messageE}
          </div>
        )}
        {message && (
          <div className="message">
            {message}
          </div>
        )}
        {quotes.length > 0 ? (
          <table className="quote-table">
            <thead>
              <tr>
                <th>Quote</th>
                <th>By</th>
                {role === 'admin' && <th>Approval Status</th>}
                <th>
                  {role === 'admin' ? (
                    <span>Actions</span>
                  ) : (
                    <span>Add To Favourites</span>
                  )}
                </th>
              </tr>
            </thead>
            <tbody>
              {quotes.map((quote, index) => (
                <tr key={index}>
                  <td>
                    <Link to={`/quote/${quote.qid}`}>{quote.quote}</Link></td>
                  <td>{quote.quoteBy}</td>
                  {role === 'admin' && <td>{quote.approvalStatus}</td>}
                  <td>
                    {role === 'admin' ? (
                      <div className="btn">
                        <button className="deleteBtn" onClick={() => handleDeleteQuote(quote.qid)}>Delete</button>
                        <div className="editW">
                          <Link to={`/edit-quote/${quote.qid}`}><button className="editBtn">Edit Quote</button></Link>
                        </div>
                        
                        {quote.approvalStatus === 'false' ? (
                          <div className="approve">
                            <button className="approveBtn" onClick={() => handleApproval(quote.qid)}>Approve</button>
                          </div>
                        ) : (
                          <div className="approve">
                            <button className="unapproveBtn" onClick={() => handleUnApproval(quote.qid)}>Unapprove</button>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="add">
                        <button className="addToFavBtn" onClick={() => handleUserAddToFav(quote)}>Add to Favourites</button>
                      </div>
                    )}

                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div>No quotes available.</div>
        )}
      </div>
    </div>
  );
};

export default AllQuotes;
