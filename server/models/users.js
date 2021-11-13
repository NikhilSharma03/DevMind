const { Schema, model } = require("mongoose")

const userSchema = new Schema({
    username: {type:String, required: true, unique: true},
    password: {type: String, required: true, minlength: 8},
    email: {type: String, required: true, unique: true},
    createdAt: {type: Date, default: Date.now()},
    bio: {type:String, required: true, maxlength: 100},
    profileImage: {type: String},
    posts: [{type:Schema.Types.ObjectId, ref:"Posts"}]
})

module.exports = model("Users",userSchema)