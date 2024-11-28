import React, { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate, useParams } from "react-router-dom"
import '../styles/QuoteDetails.css';

const FavQuoteDetails = () => {
    const { id } = useParams()
    const [quote, setQuote] = useState([])
    const [error, setError] = useState('')
    const nav = useNavigate()
    const apiURL = 'http://localhost:5163/api'

    useEffect(() => {
        const user = localStorage.getItem('user')
        if(!user)
        {
            nav('/login')
            return
        }

        const userId = JSON.parse(user).uid

        //get fav quote by id
        const fetchQuote = async () => {
            try {
                const response = await axios.get(`${apiURL}/Favourites/quote/${id}?Uid=${userId}`)
                setQuote(response.data.quote)
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
            <p>{quote.quoteContents}</p>
            <p>{quote.quoteBy}</p>
        
            <h3>Tags:</h3>
            <p>{quote.tags}</p>
            </div>
        </div>
    )
}

export default FavQuoteDetails