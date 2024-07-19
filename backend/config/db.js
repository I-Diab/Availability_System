const mongoose = require('mongoose');

const uri = process.env.MONGO_URI;

async function connectMongo() {
    try {
        // Connect to MongoDB using Mongoose
        await mongoose.connect(uri);
        console.log("Connected to MongoDB using Mongoose!");
    } catch (error) {
        console.error("Error connecting to MongoDB: ", error);
        process.exit(1); // Exit process with failure
    }
}

module.exports = connectMongo;
