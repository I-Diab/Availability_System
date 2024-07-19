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

export default App;
