const express = require('express');
const connectMongo = require('./config/db');
const cors = require('cors');
const Tutor = require('./models/tutor');
const LLM = require("./LLM/groq");
const { ObjectId } = require('mongodb');

// Initialize express app
const app = express();

// Middleware to parse JSON and enable CORS
app.use(express.json());
app.use(cors());

// Initialize LLM instance
let llm = new LLM();

/**
 * GET /timeslots/:tutorId
 * Fetches timeslots for a specific tutor.
 */
app.get('/timeslots/:tutorId', async (req, res) => {
    const { tutorId } = req.params;
    try {
        // Ensure tutorId is treated as a string and create a new ObjectId instance
        const tutor = await Tutor.findById(new ObjectId(String(tutorId)));

        // Handle case where tutor is not found
        if (!tutor) {
            return res.status(404).json({ error: 'Tutor not found' });
        }

        // Respond with tutor details and availability
        res.json({ tutorId: tutor._id, name: tutor.name, availability: tutor.availability });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

/**
 * POST /parse-availability
 * Parses availability information from the request body.
 */
app.post('/parse-availability', async (req, res) => {
    const { availability } = req.body;

    try {
        // Use LLM to extract time slots from availability
        let result = await llm.extract(availability);
        let timeSlots = result;

        // Respond with extracted time slots
        res.json({ timeSlots });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

/**
 * POST /store-availability
 * Stores availability information for a specific tutor.
 */
app.post('/store-availability', async (req, res) => {
    const { tutorId, timeSlots } = req.body;

    try {
        // Ensure tutorId is treated as a string and create a new ObjectId instance
        const tutor = await Tutor.findById(new ObjectId(String(tutorId)));

        // Handle case where tutor is not found
        if (!tutor) {
            return res.status(404).json({ error: 'Tutor not found' });
        }

        // Concatenate new time slots to the tutor's existing availability and save
        tutor.availability = tutor.availability.concat(timeSlots);
        await tutor.save();

        // Respond with success message
        res.json({ success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



// Connect to MongoDB and start the server
const port = process.env.PORT || 3000;
connectMongo()
    .then(() => {
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    });