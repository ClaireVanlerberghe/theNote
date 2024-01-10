require("dotenv").config({ path: "config.env"})
const express = require('express')
const authRoutes = require ('./routes/authRoutes')
const mongodb_connect = require('./db/connect')
const cookieParser = require("cookie-parser")


const app = express()
app.use(express.json())
app.use(cookieParser())


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