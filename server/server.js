const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const mongoose = require("mongoose")

// Middlewares
require('dotenv').config()
app.use(bodyParser.json())

// Routers
const postRoutes = require("./routes/posts")

// Routes
app.use("/api/posts", postRoutes)


// Db connection
mongoose.connect(process.env.MONGO_DB_URL).then(() => {
    console.log("Connected to Database...")
    // Listen on port 5000
    app.listen(process.env.PORT || 5000, () => {
        console.log("Server is running...")
    })
}).catch(err => {
    console.log(err)
})