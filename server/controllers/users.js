const { isValidObjectId } = require("mongoose")
const User = require("./../models/users")
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken")
const {jwtVerification} = require("./../handlers/jwtVerify")

exports.getUserByID = async (req, res) => {
    const userID = req.params.userID
    let isObjectID = isValidObjectId(userID)
    if (!isObjectID) {
        return res.status(404).json({message:"the provided id is invalid"})
    }

    const user = await User.findById(userID).populate("posts")

    if (!user) {
        return res.status(404).json({message:"No user exists with provided id!"})
    }

    res.json({message: "User found successfully", user})
}

exports.signUp = async (req, res) => {
    const { username, email, password, bio } = req.body

    if(!username || !email || password.length < 8 || !bio){
        return res.status(500).json({message:"Invalid input"})
    }

    let hashedPassword;

    try{
        hashedPassword= await bcrypt.hash(password, 12)
    } catch (err){
        return res.status(500).json({message:"Something went wrong", error: err.message})
    }

    let isImageAttached = false
    if(req.file){
        isImageAttached = true
    }

    let isEmailAlreadyExist = await User.findOne({email})
    if(isEmailAlreadyExist) {
        return res.status(300).json({message:"User already exits"})
    }

    const newUser = new User({
        username,
        email,
        password : hashedPassword,
        bio,
        profileImage: isImageAttached ? req.file.path: "uploads/defaultprofile.png",
        posts: []
    })

    try{
        await newUser.save()
    } catch (err) {
        return res.status(500).json({message:"Something went wrong", error: err.message})
    }

    // jwt TOKEN
    let jwtToken = jwt.sign({userID: newUser._id, email: newUser.email, expiresIn: +Date.now() + 60*60*1000}, process.env.JWT_SECRET_KEY, { expiresIn: '1h'})

    res.status(201).json({message: "Created Successfully", user: newUser, token: jwtToken, expiresIn: Date.now() + 60*60*1000})
}

exports.login = async (req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({email}).populate("posts")

    if (!user) {
        return res.status(404).json({message:"No user exists with provided email!"})
    }

    let isPasswordCorrect;

    try{
        isPasswordCorrect = await bcrypt.compare(password, user.password)
    } catch (err){
        return res.status(500).json({message:"Something went wrong", error: err.message})
    }

    if(!isPasswordCorrect){
        return res.status(401).json({message:"Invalid Password"})
    }

    delete user.password

    // jwt TOKEN
    let jwtToken = jwt.sign({userID: user._id, email: user.email, expiresIn: +Date.now() + 60*60*1000}, process.env.JWT_SECRET_KEY, { expiresIn: '1h'})

    res.status(200).json({message: "Login Successfully", user, token: jwtToken, expiresIn: Date.now() + 60*60*1000})
}

exports.updateUserByID = async (req, res) => {
    const { username, bio, profileImage } = req.body
    const userID = req.params.userID
    let isObjectID = isValidObjectId(userID)
    if (!isObjectID) {
        return res.status(404).json({message:"the provided id is invalid"})
    }

    const user = await User.findById(userID)

    if (!user) {
        return res.status(404).json({message:"No user exists with provided id!"})
    }

    user.username = username
    user.bio = bio
    user.profileImage = profileImage
    
    // JWT Verification
    let isUserVerified = jwtVerification(req,res, user.email, userID)
    if(isUserVerified){
        try{
            await user.save()
        } catch (err) {
            return res.status(500).json({message:"Something went wrong", error: err.message})
        }
        res.status(200).json({message: "User updated successfully"})
    } else {
        res.status(403).json({message: "Unauthorized User"})    
    }
}

exports.deleteUserByID = async (req, res) => {
    const userID = req.params.userID
    let isObjectID = isValidObjectId(userID)
    if (!isObjectID) {
        return res.status(404).json({message:"the provided id is invalid"})
    }

    const user = await User.findById(userID)

    if (!user) {
        return res.status(404).json({message:"No user exists with provided id!"})
    }

    // JWT Verification
    let isUserVerified = jwtVerification(req,res, user.email, userID)
    if(isUserVerified){
        try{
            await user.remove()
        } catch (err) {
            return res.status(500).json({message: "Something went wrong", error: err.message})
        }
        res.status(200).json({message: "User deleted successfully"})    
    } else {
        res.status(403).json({message: "Unauthorized User"})    
    }

}

