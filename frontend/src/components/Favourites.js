import React, { useEffect, useState } from "react";
import axios from "axios";
import '../styles/AllQuotes.css';
import { useNavigate, Link } from "react-router-dom";

const Favourites = () => {
  const [quotes, setQuotes] = useState([])
  const [quotesCopy, setQuotesCopy]= useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null);
  const [query, setQuery] = useState('')
  const [newTags, setNewTags] = useState('')
  const [favId, setFavId] = useState([])
  const apiURL = 'http://localhost:5163/api'
  const nav = useNavigate()
  

  // Fetch user's fav quotes from the backend API
  useEffect(() => {
    const user = localStorage.getItem('user')
    if(!user)
    {
      nav('/login')
      return
    }

    const userId = JSON.parse(user).uid
    
    const fetchQuotes = async () => {
      try {
        const response = await axios.get(`${apiURL}/Favourites?Uid=${userId}`);
        setQuotes(response.data);
        setQuotesCopy(response.data)
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchQuotes();
  }, [nav]);

  const handleSearchChange = (e) => {
    setQuery(e.target.value)
  }

  const handleSearch = async () => 
  {
    if(!query.trim()) return

    setLoading(false)
    const userId = JSON.parse(localStorage.getItem('user')).uid
    try{
      const response = await axios.get(`${apiURL}/Favourites?Uid=${userId}&tag=${query}`);
        setQuotes(response.data);
        setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  }

  const handleClearFilter = () => 
  {
    setQuery('')
    setQuotes(quotesCopy)
  }

  const handleQuoteTagsChange = (e) => {
    setNewTags(e.target.value)
  }

  const handleEditTags = async (quote) =>
  {
    setFavId(quote.fid)
    setNewTags(quote.tags)
  }

  const handleSaveTagUpdates = async () => {
    const userId = JSON.parse(localStorage.getItem('user')).uid
    try{
      await axios.patch(`${apiURL}/Favourites/patch-tags/${favId}?Uid=${userId}&tags=${newTags}` 
      )
      setFavId([])
      const response = await axios.get(`${apiURL}/Favourites?Uid=${userId}`);
        setQuotes(response.data);
        setQuotesCopy(response.data)
        setLoading(false);
    
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  }

  const handleDeleteFavQuote = async (fid) =>
  {
    const userId = JSON.parse(localStorage.getItem('user')).uid
    try{
      await axios.delete(`${apiURL}/Favourites/delete/${fid}?Uid=${userId}`)
      const response = await axios.get(`${apiURL}/Favourites?Uid=${userId}`)
        setQuotes(response.data)
        setQuotesCopy(response.data)
        setLoading(false)
    } catch (err) {
      setError(err.message)
      setLoading(false)
    }
  }

  // Loading state
  if (loading) return <div>Loading...</div>;

  // Error state
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="page-container">
    <div className="quotes-container">
      <h1>Favourite Quotes</h1>
      <div className="filter-container">
        <input type="text" placeholder="Filter by Tag..." value={query} onChange={handleSearchChange}></input>
        <button onClick={handleSearch}>Filter</button>
        <button onClick={handleClearFilter}>Clear Filter</button>
      </div>
      {quotes.length > 0 ? (
        <table border="1" style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>                         
              <th>Quote</th>
              <th>By</th>
              <th>Tags</th>
              <th>Edit Tags</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {quotes.map((quote, index) => (
              <tr key={index}>    
                <td><Link to={`/favquote/${quote.fid}`}>{quote.quoteContents}</Link></td>         
                
                <td>{quote.quoteBy}</td>
                
                <td className="edit">
                  {favId === quote.fid ? (
                    <div className="edit-tag">
                    <input type="text" value={newTags} onChange={handleQuoteTagsChange}></input>
                    <button onClick={handleSaveTagUpdates}>Save</button>
                    </div>
                  ) : (
                    quote.tags
                  )}
                </td>
                <td className="edit">
                  {favId !== quote.fid && (
                    <button onClick={() => handleEditTags(quote)} className="editBtn">Edit</button>
                  )}
                </td>
                <td className="delete">
                  <button onClick={() => handleDeleteFavQuote(quote.fid)} className="deleteBtn">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div>No favourite quotes added.</div>
      )}
    </div>
    </div>
  );
};

export default Favourites;
