// src/EnterAvailability.js
import React, { useState } from 'react';
import moment from 'moment-timezone';
import '../styles/enterAvailability.css';

const EnterAvailability = () => {
    const [availability, setAvailability] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [availabilitySlots, setAvailabilitySlots] = useState([]);
    const [showPopup, setShowPopup] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:3000/parse-availability', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ availability })
            });

            const data = await response.json();
            const timeSlots = data.timeSlots

            setAvailabilitySlots(timeSlots);

            setShowPopup(true);
        } catch (error) {
            console.error('Error submitting availability:', error);
        }
    };

    const handleConfirm = async () => {
        let tutorId = '669857922a545628d9df0bb7';
        console.log(availabilitySlots)
        try {
            const response = await fetch('http://localhost:3000/store-availability', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ tutorId, timeSlots: availabilitySlots })
            });

            if (response.ok) {
                setSubmitted(true);
                setShowPopup(false);
                alert('Availability slots have been saved!');
            } else {
                console.error('Error storing availability slots:', response.statusText);
            }
        } catch (error) {
            console.error('Error storing availability slots:', error);
        }
    };

    const handleCancel = () => {
        setShowPopup(false);
    };

    return (
        <div className="enter-availability-container">
            <h2>Enter Your Availability</h2>
            <form className="enter-availability-form" onSubmit={handleSubmit}>
                    
                    <textarea
                        value={availability}
                        onChange={(e) => setAvailability(e.target.value)}
                        rows="4"
                        cols="50"
                        placeholder='e.g. I am free next Tuesday from 9 PM to 10:30 PM'
                    />
                <br />
                <button type="submit">Submit</button>
            </form>
            {submitted && <p>Your availability has been submitted!</p>}
            {showPopup && (
                <div className="popup">
                    <div className="popup-content">
                        <h3>Confirm Availability Slots</h3>
                        <ul>
                            {availabilitySlots.map((slot, index) => (
                                <li key={index}>
                                    {moment(slot.start).toLocaleString()} - {moment(slot.end).toLocaleString()}
                                </li>
                            ))}
                        </ul>
                        <button onClick={handleConfirm}>Confirm</button>
                        <button onClick={handleCancel}>Cancel</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EnterAvailability;
