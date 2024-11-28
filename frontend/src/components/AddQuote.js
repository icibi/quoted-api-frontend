import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Login.css";

const AddQuote = () => {
    const [uid, setUserId] = useState('')
    const [q, setQuote] = useState('')
    const [quoteBy, setQuoteBy] = useState('')
    const [tags, setTags] = useState('')
    const [message, setMessage] = useState('')
    const [messageE, setMessageE] = useState('')
    const nav = useNavigate()
    const apiURL = 'http://localhost:5163/api'

    //get user
    useEffect(() => {
        const user = localStorage.getItem('user')
        if (!user) {
            nav('/login')
            return
        }

        const userId = JSON.parse(user).uid
        setUserId(userId)

    }, [nav]);

    //add quote
    const handleSubmit = async () => {
        try {
            const r = await axios.post(`${apiURL}/Quotes/add?Uid=${uid}`, {
                quote: q,
                quoteBy: quoteBy,
                tags: tags
            })

            if (r.status === 200) {
                setMessageE('')
                setMessage('Quote added.')
                setQuote('')
                setQuoteBy('')
                setTags('')
                nav('/')
            }
            else{
                alert('Failed to add quote.')
            }

        }
        catch (e) {
            console.error('Error adding to favourites:', e.message)
            alert('Failed to add quote.')
        }
    }

    return (
        <div className="container">
            <div className="form-container">
                <h1>Submit New Quote</h1>
                <form onSubmit={handleSubmit} className="form">
                    <div className="form-group">
                        <label htmlFor="quote">Quote:</label>
                        <input
                            type="text"
                            id="quote"
                            value={q}
                            onChange={(e) => setQuote(e.target.value)}
                            required
                            className="input"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="quoteBy">Quote By:</label>
                        <input
                            type="text"
                            id="quoteBy"
                            value={quoteBy}
                            onChange={(e) => setQuoteBy(e.target.value)}
                            required
                            className="input"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="tags">Tags:</label>
                        <input
                            type="text"
                            id="tags"
                            value={tags}
                            onChange={(e) => setTags(e.target.value)}
                            required
                            className="input"
                        />
                    </div>
                    <button className="button" type="submit">Submit Quote</button>
                </form>
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
            </div>
        </div>
    )
}

export default AddQuote