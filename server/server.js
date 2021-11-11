const express = require("express")
const app = express()
const bodyParser = require("body-parser")

// Routers
const postRoutes = require("./routes/posts")

// Middlewares
app.use(bodyParser.json())

// Routes
app.use("/api/posts", postRoutes)

// Listen on port 5000
app.listen(process.env.PORT || 5000, () => {
    console.log("Server is running...")
})