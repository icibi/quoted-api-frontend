import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";
import "../styles/Login.css";

const UserAccount = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [userDetails, setUserDetails] = useState([])
    const nav = useNavigate()
    const apiURL = 'http://localhost:5163/api'

    useEffect(() => {
        const user = localStorage.getItem('user')
        if (!user) {
            nav('/login')

        }

        const storedUserDetails = JSON.parse(user)
        if (storedUserDetails) {
            setUserDetails(storedUserDetails)
        }

    }, [nav]);

    //handle updating email and password
    const handleSubmit = async () => {
        const userId = userDetails.uid
        try {
            const r = await axios.patch(`${apiURL}/Auth/user-update/${userId}`, {
                Email: email,
                password: password
            })

            if (r.status === 200) {
                localStorage.removeItem('user')
                nav('/')
                window.location.reload()
            }
            else {
                alert('Failed to update account.')
            }

        }
        catch (e) {
            console.error('Error updating account:', e.message)
            alert('Failed to update account.')
        }
    }

    return (
        <div className='container'>
            <div className="form-container">
                <h1>Update Account Details</h1>
                <form onSubmit={handleSubmit} className="form">
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            required
                            className="input"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            required
                            className="input"
                        />
                    </div>

                    <button className="button" type="submit">Update Account</button>
                </form>
            </div>

        </div>
    )
}

export default UserAccount