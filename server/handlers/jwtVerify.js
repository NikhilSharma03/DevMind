exports.jwtVerification =  (req, res, userEmail, userID) => {
    let userRequestData = req.user
    if(!userRequestData){
        return res.status(403).json({message: "Unauthorized User"})    
    }
    if(userID === userRequestData.userID && userEmail === userRequestData.email){
        return true
    } else {
        return false    
    }
}