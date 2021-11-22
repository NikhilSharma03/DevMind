const jwt = require("jsonwebtoken")

module.exports = (req, res, next) => {
    const tokenHeader = req.headers.token
    if(tokenHeader){
        let token = tokenHeader.split(" ")[1]
        if(!token) {
            return res.status(404).json({message: "No Token Found"})
        }

        try {
            const data = jwt.verify(token, process.env.JWT_SECRET_KEY)
            const expiresIn = (parseInt(data.expiresIn) - parseInt(Date.now()))
            if(expiresIn > 0){
                req.user = data
                next()
            } else {
                return res.status(404).json({message: "Token Expired"})
            }
        } catch(err) {
            return res.status(404).json({message: err.message})
        }
    }   else {
        return res.status(404).json({message: "No Token Found"})
    }

} 