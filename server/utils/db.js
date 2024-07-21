const mongoose = require("mongoose");
const URI = process.env.MONGODB_URI;
const connectDb = async () => {
    try {
        await mongoose.connect(URI);
        console.log("Database connection success");
    } catch (error) {
        console.error("Database connection failed", error);
        process.exit(0);
    }
};

module.exports = connectDb;
