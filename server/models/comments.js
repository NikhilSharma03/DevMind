const {Schema, model} = require("mongoose")

const commentSchema = new Schema({
    content: { type:String, required: true },
    creator: {type: Schema.Types.ObjectId, ref: "Users", required: true},
    createdAt: {type: Date, required: true}
})

module.exports = model("Comments", commentSchema)