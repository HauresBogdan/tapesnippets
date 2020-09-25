const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async() => {
    try {
        mongoose.connect(process.env.MONGO_URI, {
            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        });
        console.log("MongoDb Connected...");
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};
module.exports = connectDB;