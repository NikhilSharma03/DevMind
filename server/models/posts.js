const {Schema, model} = require("mongoose")

const postSchema = new Schema({
    content: { type:String, required: true },
    imageURL: { type:String },
    comments: [{ type:Schema.Types.ObjectId, ref:"Comments" }],
    creator: {type: Schema.Types.ObjectId, ref: "Users", required: true},
    createdAt: {type: Date, required: true, default: Date.now()}
})

module.exports = model("Posts", postSchema)