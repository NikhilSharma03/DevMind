const { isValidObjectId } = require("mongoose")
const User = require("./../models/users")
const bcrypt = require('bcryptjs');

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
    const { username, email, password, bio, profileImage } = req.body

    let hashedPassword;

    try{
        hashedPassword= await bcrypt.hash(password, 12)
    } catch (err){
        return res.status(500).json({message:"Something went wrong", error: err.message})
    }

    const newUser = new User({
        username,
        email,
        password : hashedPassword,
        bio,
        profileImage,
        posts: []
    })

    try{
        await newUser.save()
    } catch (err) {
        return res.status(500).json({message:"Something went wrong", error: err.message})
    }

    delete newUser.password


    res.status(201).json({message: "Created Successfully", user: newUser})
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

    res.status(200).json({message: "Login Successfully", user})
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
    
    try{
        await user.save()
    } catch (err) {
        return res.status(500).json({message:"Something went wrong", error: err.message})
    }

    res.status(200).json({message: "User updated successfully"})
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

    try{
        await user.remove()
    } catch (err) {
        return res.status(500).json({message: "Something went wrong", error: err.message})
    }


    res.status(200).json({message: "User deleted successfully"})
}