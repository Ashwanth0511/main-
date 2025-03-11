
const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
name:String,
comment:String,
likes:{type:Number,default:0},
likedby: { type: [String], default: [] }, 
  createat: { type: Date, default: Date.now },
})

commentSchema.index({createat:-1});
commentSchema.index({likes:-1});

const commentmodel = mongoose.model("comments",commentSchema)
module.exports = commentmodel;