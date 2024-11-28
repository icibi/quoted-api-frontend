import React, { useEffect, useState } from "react"
import axios from "axios"
import { useParams } from "react-router-dom"
import '../styles/QuoteDetails.css';

const QuoteDetails = () => {
    const { id } = useParams()
    const [quote, setQuote] = useState([])
    const [error, setError] = useState('')
    const apiURL = 'http://localhost:5163/api'


    useEffect(() => {
        //get quote by id
        const fetchQuote = async () => {
            try {
                const response = await axios.get(`${apiURL}/Quotes/${id}`)
                setQuote(response.data)
            } catch (err) {
                setError(err.message)
            }
        }

        fetchQuote()
    }, [id])

    if (error) return <div>Error: {error}</div>

    return (
        <div className="details-container">
           <div className="q">
            <h2>Quote</h2>
            <p>{quote.quote}</p>
            <p>{quote.quoteBy}</p>
        
            <h3>Tags:</h3>
            <p>{quote.tags}</p>
            </div>
        </div>
    )
}

export default QuoteDetails