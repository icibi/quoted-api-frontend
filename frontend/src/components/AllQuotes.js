import React, { useEffect, useState } from "react";
import axios from "axios";
import '../styles/AllQuotes.css';

const AllQuotes = () => {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch quotes from the backend API
  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const response = await axios.get("http://localhost:5163/api/Quotes");
        setQuotes(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchQuotes();
  }, []);

  // Loading state
  if (loading) return <div>Loading...</div>;

  // Error state
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="page-container">
    <div className="quotes-container">
      <h1>All Quotes</h1>
      {quotes.length > 0 ? (
        <table border="1" style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>                          
              <th>Quote</th>
              <th>Quote By</th>
              <th>Tags</th>
              <th>Categories</th>
              <th>Favourited Count</th>
            </tr>
          </thead>
          <tbody>
            {quotes.map((quote, index) => (
              <tr key={index}>               
                <td>{quote.quote}</td>
                <td>{quote.quoteBy}</td>
                <td>{quote.tags}</td>
                <td>{quote.categories}</td>
                <td>{quote.favouritedCount}</td>
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
