const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the availability schema
const availabilitySchema = new Schema({
    start: String,
    end: String
}, { _id: false });

// Define the tutor schema
const tutorSchema = new Schema({
    name: { type: String, required: true },
    subjects: { type: [String], required: true },
    availability: [availabilitySchema]
});

// Create the Tutor model
const Tutor = mongoose.model('Tutor', tutorSchema);

module.exports = Tutor;
