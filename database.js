const mongoose = require("mongoose");


class Database {
    constructor() {
        this.connect();
    }

    connect() {
        // Database connection
        mongoose
            .connect("mongodb+srv://akv5:F5fcnjiZjlJmNUss@blondlycluster.avgd7.mongodb.net/?retryWrites=true&w=majority&appName=Blondlycluster")
            .then(() => {
                console.log("Database connection successful");
            })
            .catch((err) => {
                console.error("Database connection unsuccessful:", err);
            });
    }
}

module.exports = new Database();
