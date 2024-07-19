// src/TutorCalendar.js
import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const TutorCalendar = ({}) => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        let tutorId = '669857922a545628d9df0bb7';

        fetch(`http://localhost:3000/timeslots/${tutorId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('Tutor Availability:', data);
                
                const calendarEvents = data.availability.map(slot => {
                    const start = moment(slot.start, 'YYYY-MM-DDTHH:mm:ss').toDate();
                    const end = moment(slot.end, 'YYYY-MM-DDTHH:mm:ss').toDate();
                    return {
                        start,
                        end,
                        title: 'Available'
                    };
                });
                setEvents(calendarEvents);
            })
            .catch(error => {
                console.error('Error fetching tutor availability:', error);
                // Handle errors appropriately in your frontend
            });
    }, []);

    return (
        <div className="calendar-container">
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 500 }}
            />
        </div>
    );
};

export default TutorCalendar;
