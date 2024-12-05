const mongoose = require("mongoose");
require('dotenv').config(); // Import dotenv

class Database {
    constructor() {
        this.connect();
    }

    connect() {
        const uri = process.env.MONGODB_URI; // Load from environment variable
        mongoose
            .connect(uri)
            .then(() => {
                console.log("Database connection successful");
            })
            .catch((err) => {
                console.error("Database connection unsuccessful:", err);
            });
    }
}

module.exports = new Database();
