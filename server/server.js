const express = require("express")
const app = express()
const bodyParser = require("body-parser")

// Middlewares
app.use(bodyParser.json())

// Routes
app.get("/", (req,res,next) => {
    res.json({message:"Hello World"})
})

// Listen on port 5000
app.listen(process.env.PORT || 5000, () => {
    console.log("Server is running...")
})