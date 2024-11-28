import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const EditQuote = () => {
    const { id } = useParams()
    const [error, setError] = useState('')
    const [qid, setQid] = useState('')
    const [approvalStatus, setApprovalStatus] = useState('')
    const [dateSubmitted, setDateSubmitted] = useState('')
    const [favouritedCount, setFavouritedCount] = useState('')
    const [q, setQ] = useState('')
    const [quoteBy, setQuoteBy] = useState('')
    const [submittedBy, setSubmittedBy] = useState('')
    const [tags, setTags] = useState('')
    const apiURL = 'http://localhost:5163/api'
    const nav = useNavigate()


    useEffect(() => {
        //get quote by id
        const fetchQuote = async () => {
            try {
                const response = await axios.get(`${apiURL}/Quotes/${id}`)
                if (response) {
                    const data = response.data
                    setQid(data.qid)
                    setQ(data.quote)
                    setQuoteBy(data.quoteBy)
                    setTags(data.tags)
                }
            } catch (err) {
                setError(err.message)
            }
        }
        fetchQuote()
    }, [id])

    //handle quote input changes
    const handleChange = (e, field) => {
        const { value } = e.target
        if (field === 'quote') setQ(value);
        if (field === 'approvalStatus') setApprovalStatus(value);
        if (field === 'dateSubmitted') setDateSubmitted(value);
        if (field === 'favouritedCount') setFavouritedCount(value);
        if (field === 'quoteBy') setQuoteBy(value);
        if (field === 'submittedBy') setSubmittedBy(value);
        if (field === 'tags') setTags(value);
    }

    //handle edit submissions
    const handleEdit = async (e) => {
        e.preventDefault()

        try 
        {
            const r = await axios.put(`${apiURL}/Quotes/${id}/update`, {
                Qid: qid,
                ApprovalStatus: approvalStatus,
                DateSubmitted: dateSubmitted,
                FavouritedCount: favouritedCount,
                Quote: q,
                QuoteBy: quoteBy,
                SubmittedBy: submittedBy,
                Tags: tags
            })

            if(r.status === 200)
            {
                nav('/')
            }
            else{
                alert('Failed to update quote.')
            }
        } catch (err) {
            setError(err.message)
        }
    }

    return (
        <div className="container">
            <div className="form-container">
                <h1>Edit Quote Details</h1>
                <form onSubmit={handleEdit} className="form">
                    <div className="form-group">
                        <label htmlFor="qid">Qid:</label>
                        <input
                            type="text"
                            id="qid"
                            value={qid}
                            readOnly
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="quote">Quote:</label>
                        <input
                            type="text"
                            id="quote"
                            value={q}
                            onChange={(e) => handleChange(e, 'quote')}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="quoteBy">Quote By:</label>
                        <input
                            type="text"
                            id="quoteBy"
                            value={quoteBy}
                            onChange={(e) => handleChange(e, 'quoteBy')}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="tags">Tags:</label>
                        <input
                            type="text"
                            id="tags"
                            value={tags}
                            onChange={(e) => handleChange(e, 'tags')}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="favouritedCount">Favourited Count:</label>
                        <input
                            type="text"
                            id="favouritedCount"
                            value={favouritedCount}
                            onChange={(e) => handleChange(e, 'favouritedCount')}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="dateSubmitted">Date Submitted:</label>
                        <input
                            type="text"
                            id="dateSubmitted"
                            value={dateSubmitted}
                            onChange={(e) => handleChange(e, 'dateSubmitted')}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="submittedBy">Submitted By:</label>
                        <input
                            type="text"
                            id="submittedBy"
                            value={submittedBy}
                            onChange={(e) => handleChange(e, 'submittedBy')}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="approvalStatus">Approval Status:</label>
                        <input
                            type="text"
                            id="approvalStatus"
                            value={approvalStatus}
                            onChange={(e) => handleChange(e, 'approvalStatus')}
                        />
                    </div>
                    <button className="button" type="submit">Update Quote</button>
                </form>
            </div>
        </div>
    )
}

export default EditQuote