require("dotenv").config({ path: "../config.env"})
const express = require('express')
const authRoutes = require ('./routes/authRoutes')
const mongodb_connect = require('./db/connect')
const cookieParser = require("cookie-parser")
const cors = require("cors")


const app = express()
app.use(express.json())
app.use(cookieParser())

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });

const PORT = process.env.PORT
console.log("PORT", process.env.PORT);

mongodb_connect()
.then(
    app.listen(PORT, () => {
        console.log(`server running on http://localhost:${PORT}`);
    })
).catch((error) => {
    console.log(error)
})

app.use(authRoutes)