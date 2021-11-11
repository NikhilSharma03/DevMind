const {Schema, model} = require("mongoose")

const postSchema = new Schema({
    content: { type:String, required: true },
    imageURL: { type:String },
    comments: [{ type:Schema.Types.ObjectId, ref:"Comments" }],
    creator: {type: Schema.Types.ObjectId, ref: "Users", required: true},
    createdAt: {type: Date, required: true, default: Date.now()}
})

// Methods
postSchema.statics.findPostByPostID = async function (postID) {
    const data = await this.findById(postID)
    return data
}

postSchema.statics.findPostByUserID = async function (userID) {
    const data = await this.find({creator: userID})
    return data
}

module.exports = model("Posts", postSchema)