const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const cors = require('cors')

// Middlewares
require('dotenv').config()
app.use(bodyParser.json())
app.use('/uploads', express.static('uploads'));
app.use(cors())

// Routers
const postRoutes = require("./routes/posts")
const commentRoutes = require("./routes/comments")
const likeRoutes = require("./routes/likes")
const userRoutes = require("./routes/users")

// Routes
app.use("/api/posts", postRoutes)
app.use("/api/posts/comments", commentRoutes)
app.use("/api/posts/likes", likeRoutes)
app.use("/api/users", userRoutes)

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