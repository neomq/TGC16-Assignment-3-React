import React from 'react'
import { useLocation } from 'react-router-dom';
import { Button } from 'react-bootstrap';
// in the HTML specs, location refers to one URL

export default function Welcome() {

    const location = useLocation();
    let username = location.state.formData.username;
    let email = location.state.formData.email;

    return (
        <React.Fragment>
            <h1>Welcome {username}!</h1>
            <p>{email}</p>

            <Button variant="primary">Start Shopping</Button>
        </React.Fragment>
    )
}