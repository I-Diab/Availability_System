// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import TutorCalendar from './components/TutorCalendar';
import EnterAvailability from './components/EnterAvailability';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Tutor Availability System</h1>
          <nav>
            <Link to="/">Enter Availability</Link>
            <Link to="/view-calendar">View Calendar</Link>
          </nav>
        </header>
        <Routes>
          <Route path="/" element={<EnterAvailability />} />
          <Route path="/view-calendar" element={<TutorCalendar />} />
        </Routes>
      </div>
    </Router>
  );
}

// const TutorCalendarWrapper = () => {
//   const availability = [
//     {
//       start: '2024-07-17T12:00:00',
//       end: '2024-07-17T16:00:00'
//     },
//     {
//       start: '2024-07-18T19:00:00',
//       end: '2024-07-18T23:59:00'
//     },
//     // Add more slots as needed
//   ];
//   return <TutorCalendar availability={availability} />;
// };

export default App;
