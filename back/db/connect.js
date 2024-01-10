require('dotenv').config({path: 'config.env'})
const mongoose = require('mongoose')


const connectDB = async () =>{
    try{
        console.log("URI MONGODB", process.env.MONGODB_URI);
        const connectionDB = await mongoose.connect(process.env.MONGODB_URI)
        console.log(`Connected to MongoDB: ${connectionDB.connection.host}, DB is: ${connectionDB.connection.db.databaseName}`);
    } catch (error) {
        console.log(error);
        process.exit(1)
    }
}

module.exports = connectDB;